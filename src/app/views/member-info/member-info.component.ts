import { Component, OnInit } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { moment, isExpired } from '@utils/moment';
import { ProgramUpdateDialogComponent } from './program-update-dialog/program-update-dialog.component';
import { ProgramCancelDialogComponent } from './program-cancel-dialog/program-cancel-dialog.component';
import { StorageUpdateDialogComponent } from './storage-update-dialog/storage-update-dialog.component';
import { ProgramMap, LocationList } from '@utils/maps';
import { StorageStatusEnum } from '@utils/enum';

interface ProgramTableRowData extends ProgramRecordType {
  name: string;
}

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
})
export class MemberInfoComponent implements OnInit {
  defaultSection: 'program' | 'storage' = null;
  memberID = '';
  profile = this.fb.group({
    name: [''],
    nickname: [''],
    birthday: [''],
    city: [''],
    lineId: [''],
    phone: [''],
    email: [''],
    expiryDate: [''],
    joinDate: [''],
    hasCard: [false],
  });

  currentProgram: ProgramRecordType = { id: '', end: '', start: '' };
  historyProgram: ProgramTableRowData[] = [];

  locationList = LocationList;
  programList = Object.values(ProgramMap);
  ready = false;
  memberMapRef: AngularFireObject<MemberInfoType>;
  storageListRef: AngularFireList<StorageInfoType>;
  visualizeStorage: StorageInfoType[][] = [[], [], [], []];
  storageStatusMap = StorageStatusEnum;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.memberID = param.id;
      this.memberMapRef = this.db.object(`member/${this.memberID}`);
      this.storageListRef = this.db.list('storage');
      this.fetchMemberInfo();
      this.fetchStorageInfo();
    });
    this.route.queryParams.subscribe(({ section }) => {
      if (section) {
        this.defaultSection = section;
      }
    });
  }

  fetchStorageInfo(): void {
    this.storageListRef.valueChanges().subscribe((res) => {
      const payload = [[], [], [], []];

      let pointer = 0;
      res.forEach((item) => {
        if (pointer === 4) {
          pointer = 0;
        }

        const target = payload[pointer];
        if (target.length === 3) {
          target.push({ ID: 'disabled' });
        }

        let status = item.memberID
          ? this.storageStatusMap.RENTED
          : this.storageStatusMap.EMPTY;
        if (
          status === this.storageStatusMap.RENTED &&
          isExpired(item.endDate)
        ) {
          status = this.storageStatusMap.EXPIRED;
        }
        target.push({ ...item, status });
        pointer = pointer + 1;
      });

      this.visualizeStorage = payload;
    });
  }

  fetchMemberInfo(): void {
    this.memberMapRef.valueChanges().subscribe(({ program, ...other }) => {
      this.profile.patchValue(other);
      this.currentProgram = program.current;
      if (program.history) {
        this.historyProgram = program.history.map(({ id, ...left }) => {
          return {
            ...left,
            name: ProgramMap[id].viewValue,
            id: ProgramMap[id].value,
          };
        });
      } else {
        this.historyProgram = [];
      }

      this.ready = true;
    });
  }

  updateMemberBasicInfo(): void {
    const payload = this.profile.getRawValue();
    this.memberMapRef.update(payload).then(() => {
      this.openSnackBar('成功修改基本資料', '關閉');
    });
  }

  openStorageDialog(storageInfo: StorageInfoType): void {
    const lesseeInfo = {
      memberID: storageInfo.memberID,
      memberName: storageInfo.memberName,
      memberNickname: storageInfo.memberNickname,
    };

    if (storageInfo.status === this.storageStatusMap.EMPTY) {
      lesseeInfo.memberID = this.memberID;
      lesseeInfo.memberName = this.profile.get('name').value;
      lesseeInfo.memberNickname = this.profile.get('nickname').value;
    }

    const dialogRef = this.dialog.open(StorageUpdateDialogComponent, {
      width: '450px',
      data: {
        storageInfo,
        lesseeInfo,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (newStorageInfo: StorageInfoType) => {
        if (newStorageInfo === undefined) {
          return;
        }

        this.storageListRef
          .update(newStorageInfo.ID, newStorageInfo)
          .then(() => this.openSnackBar('成功更新櫃位資訊', '關閉'));
      },
    });
  }

  handleDateChange({ value }, fieldName: string): void {
    const formatDate = moment(value).format('YYYY-MM-DD');
    this.profile.patchValue({ [fieldName]: formatDate });
  }

  updateMemberProgram(newProgram: ProgramRecordType): void {
    const newPosition = String(this.historyProgram.length);
    const payload = {
      current: newProgram,
      history: [
        ...this.historyProgram.map(({ name, ...rest }, idx) => {
          // 假如最後一筆資料為游擊隊，那就順便寫入結束日期
          if (idx === +newPosition - 1 && rest.id === 'GO') {
            return {
              ...rest,
              end: moment(newProgram.start)
                .subtract('1', 'day')
                .format('YYYY-MM-DD'),
            };
          }
          return { ...rest };
        }),
        { sort: newPosition, ...newProgram },
      ],
    };

    this.memberMapRef.update({ program: payload }).then(() => {
      this.openSnackBar('成功更新會籍', '關閉');
    });
  }

  openCancelProgramDialog(): void {
    const memberName = this.profile.get('name').value;
    const memberNickname = this.profile.get('nickname').value;
    const dialogRef = this.dialog.open(ProgramCancelDialogComponent, {
      width: '450px',
      data: {
        displayName: memberNickname || memberName,
        memberID: this.memberID,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (confirm) => {
        if (confirm) {
          const prevProgram = this.historyProgram[
            this.historyProgram.length - 1
          ];
          const prevEndDate = prevProgram.end;
          this.updateMemberProgram({
            id: 'GO',
            start: moment(prevEndDate).add('1', 'day').format('YYYY-MM-DD'),
            end: '-',
          });
        }
      },
    });
  }

  openUpdateProgramDialog(): void {
    const dialogRef = this.dialog.open(ProgramUpdateDialogComponent, {
      width: '450px',
      data: {
        programList: this.programList.filter(({ value }) => {
          const { HL, MA, GO, NEW } = ProgramMap;
          return (
            [HL.value, MA.value, GO.value, NEW.value].includes(value) === false
          );
        }),
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (newProgram: ProgramRecordType) => {
        if (newProgram) {
          this.updateMemberProgram(newProgram);
        }
      },
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
