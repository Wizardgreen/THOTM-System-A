import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AlertSheetComponent } from './alert-sheet/alert-sheet.component';
import { ProgramMap } from '../../utils/maps';
import {
  isValidDate,
  willExpireIn7Days,
  moment,
  isExpired,
} from '@utils/moment';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  memberReady = false;
  storageReady = false;
  storageListRef: AngularFireList<StorageInfoType[]>;
  dataSource = new MatTableDataSource<MemberInfoType>();
  dataLength: number;
  alertList: any[] = [];
  columnsToDisplay: string[] = [
    'id',
    'name',
    'nickname',
    'lineId',
    'program',
    'expiryDate',
    'storage',
    'view',
  ];

  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.db
      .list('member')
      .valueChanges()
      .subscribe({
        next: (res: MemberInfoType[]) => {
          if (this.memberReady === true) {
            return;
          }
          this.setTableData(res);
          this.setProgramToAlertList(res);
          this.memberReady = true;
          if (this.memberReady && this.storageReady) {
            this.sortAlertList();
          }
        },
      });
    this.db
      .list('storage')
      .valueChanges()
      .subscribe({
        next: (res: StorageInfoType[]) => {
          if (this.storageReady === true) {
            return;
          }
          this.setStorageToAlertList(res);
          this.storageReady = true;
          if (this.memberReady && this.storageReady) {
            this.sortAlertList();
          }
        },
      });
  }

  setTableData(data: MemberInfoType[]): void {
    this.dataSource.data = data.map(({ program, ...other }) => {
      // mapping 會員方案的名稱
      const currentProgram = program.current;
      return {
        ...other,
        program: ProgramMap[currentProgram.id].viewValue,
        expiryDate: currentProgram.end,
      };
    });
    this.dataSource.paginator = this.paginator;
    this.dataLength = data.length;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (
      member: MemberInfoType,
      filter: string
    ): boolean => {
      const matchedName =
        member.name.toLocaleLowerCase().indexOf(filter) !== -1;
      const matchedNickName =
        member.nickname.toLocaleLowerCase().indexOf(filter) !== -1;
      return matchedNickName || matchedName;
    };
  }

  sortAlertList(): void {
    this.alertList = this.alertList.sort((current, next) => {
      const currentDate = moment(current.endDate);
      const nextDate = next.endDate;
      if (currentDate.isBefore(nextDate)) {
        return -1;
      }
      if (currentDate.isAfter(nextDate)) {
        return 1;
      }
      return 0;
    });
  }

  setStorageToAlertList(data: StorageInfoType[]): void {
    const cache = data
      .filter(({ endDate: endDateString }) => {
        if (isValidDate(endDateString) && willExpireIn7Days(endDateString)) {
          return true;
        }
        return false;
      })
      .map(({ memberID, memberName, memberNickname, endDate }) => {
        return {
          memberID,
          memberName,
          memberNickname,
          endDate: moment(endDate).format('YYYY-MM-DD'),
          isExpired: isExpired(endDate),
          type: 'storage',
        };
      });
    this.alertList = this.alertList.concat(cache);
    console.log(this.alertList);
  }

  setProgramToAlertList(data: MemberInfoType[]): void {
    const cache = data
      .filter(({ program }) => {
        const endDateString = program?.current?.end;
        if (isValidDate(endDateString) && willExpireIn7Days(endDateString)) {
          return true;
        }
        return false;
      })
      .map((member) => {
        const endDate = member.program.current.end;
        return {
          memberID: member.id,
          memberName: member.name,
          memberNickname: member.nickname,
          endDate: moment(endDate).format('YYYY-MM-DD'),
          isExpired: isExpired(endDate),
          type: 'program',
        };
      });
    this.alertList = this.alertList.concat(cache);
    console.log(this.alertList);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  toMemberCreate(): void {
    const newID = `IC${this.dataLength + 27}`;
    this.router.navigate(['member-create', { newID }]);
  }

  toMemberInfo(memberID: string): void {
    this.router.navigate(['member-list', memberID]);
  }

  showAlertSheet(): void {
    this.bottomSheet.open(AlertSheetComponent, {
      data: {
        alertList: this.alertList,
      },
    });
  }
}
