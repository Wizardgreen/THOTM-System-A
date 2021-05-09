import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { StorageStatusEnum } from '@utils/enum';

interface InjectDataType {
  storageInfo: StorageInfoType;
  lesseeInfo: {
    memberID: string;
    memberName: string;
    memberNickname: string;
  };
}

@Component({
  selector: 'app-storage-update-dialog',
  templateUrl: './storage-update-dialog.component.html',
  styleUrls: ['./storage-update-dialog.component.scss'],
})
export class StorageUpdateDialogComponent {
  startDate: string = null;
  endDate: string = null;
  extendDate: string = null;
  des: string[] = ['', ''];
  storageStatus = StorageStatusEnum;

  constructor(
    public dialogRef: MatDialogRef<StorageUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InjectDataType
  ) {}

  handleDurationChange(duration: number): void {
    const { storageInfo } = this.data;
    const { RENTED, EMPTY, EXPIRED } = this.storageStatus;

    switch (storageInfo.status) {
      case RENTED:
        const endDate = moment(storageInfo.endDate);
        this.extendDate = endDate
          .add(1, 'day')
          .add(duration, 'M')
          .format('YYYY-MM-DD');
        break;
      case EMPTY:
      case EXPIRED:
        const today = moment();
        this.startDate = today.format('YYYY-MM-DD');
        this.endDate = today.add(duration, 'M').format('YYYY-MM-DD');
        break;
    }
  }

  handleDisplayName(): string {
    const { memberNickname, memberName } = this.data.lesseeInfo;
    return memberNickname || memberName;
  }

  createNewStorageInfo(action: 'add' | 'remove' | 'extend'): StorageInfoType {
    const newStorageInfo = {
      ID: this.data.storageInfo.ID,
      startDate: this.startDate,
      endDate: this.endDate,
      memberID: this.data.lesseeInfo.memberID,
      memberName: this.data.lesseeInfo.memberName,
      memberNickname: this.data.lesseeInfo.memberNickname,
    };
    switch (action) {
      case 'add':
        break;
      case 'extend':
        newStorageInfo.startDate = this.data.storageInfo.startDate;
        newStorageInfo.endDate = this.extendDate;
        break;
      case 'remove':
        newStorageInfo.endDate = '';
        newStorageInfo.startDate = '';
        newStorageInfo.memberID = '';
        newStorageInfo.memberName = '';
        newStorageInfo.memberNickname = '';
        break;
      default:
        throw new Error('createNewStorageInfo 的 action 出錯了');
    }
    return newStorageInfo;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
