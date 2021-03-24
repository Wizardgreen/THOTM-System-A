import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ProgramUpdateDialogComponent } from './program-update-dialog/program-update-dialog.component';
import { ProgramMap, LocationList } from '@utils/maps';

interface ProgramTableRowData extends ProgramRecordType {
  name: string;
}

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss'],
})
export class MemberInfoComponent implements OnInit {
  profile = this.fb.group({
    name: [''],
    nickname: [''],
    birthday: [''],
    city: [''],
    lineId: [''],
    phone: [''],
    email: [''],
    storage: [''],
    expiryDate: [''],
    joinDate: [''],
    hasCard: [false],
  });

  programHeader = ['sort', 'name', 'start', 'end'];
  currentProgram: ProgramRecordType = { id: '', end: '', start: '' };
  historyProgram: ProgramTableRowData[] = [];

  locationList = LocationList;
  programList = Object.values(ProgramMap);
  ready = false;
  memberRef: AngularFireObject<MemberInfoType>;

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.memberRef = this.db.object(`member/${param.id}`);
      this.fetchMemberInfo();
    });
  }

  fetchMemberInfo(): void {
    this.memberRef
      .valueChanges()
      .subscribe(({ program, ...other }: MemberInfoType) => {
        this.profile.patchValue(other);
        this.currentProgram = program.current;
        this.historyProgram = program.history.map(({ id, ...left }) => {
          return {
            ...left,
            name: ProgramMap[id].viewValue,
            id: ProgramMap[id].value,
          };
        });
        this.ready = true;
      });
  }

  updateMemberBasicInfo(): void {
    const payload = this.profile.getRawValue();
    this.memberRef.update(payload).then(() => {
      this.openSnackBar('成功修改基本資料', '關閉');
    });
  }

  onDateChange({ value }, fieldName: string): void {
    const formatDate = moment(value).format('YYYY-MM-DD');
    this.profile.patchValue({ [fieldName]: formatDate });
    // if (this.basicInfoModified === false) {
    //   this.basicInfoModified = true;
    // }
  }

  updateMemberProgram(newProgram: ProgramRecordType): void {
    const newPosition = String(this.historyProgram.length);
    const payload = {
      current: newProgram,
      history: [
        ...this.historyProgram.map(({ name, ...rest }) => ({ ...rest })),
        { sort: newPosition, ...newProgram },
      ],
    };

    this.memberRef.update({ program: payload }).then(() => {
      this.openSnackBar('成功更新會籍', '關閉');
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProgramUpdateDialogComponent, {
      width: '450px',
      data: {
        programList: this.programList.filter(({ value }) => {
          const { HL, MA, GO } = ProgramMap;
          return value !== HL.value && value !== MA.value && value !== GO.value;
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
