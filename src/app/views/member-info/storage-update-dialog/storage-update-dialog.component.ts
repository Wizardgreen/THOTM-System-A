import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

interface InjectDataType {
  rented: boolean;
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
  styles: [
    '.mat-dialog-actions { justify-content: flex-end}',
    '.wrapper { margin-bottom: 12px }',
    `
      .wrapper > input {
        width: 25px;
        padding-left: 15px;
      }
    `,
  ],
})
export class StorageUpdateDialogComponent {
  duration = new FormControl('-');
  startDate: string;
  endDate: string;

  constructor(
    public dialogRef: MatDialogRef<StorageUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InjectDataType
  ) {}

  handleDurationChange(): void {
    // TODO:增加延期的判斷
    const duration = this.duration.value;
    const today = moment();
    this.startDate = today.format('YYYY-MM-DD');
    this.endDate = today.add(duration, 'M').format('YYYY-MM-DD');
  }

  createNewStorageInfo(action: 'add' | 'remove' | 'extend'): StorageInfoType {
    const newStorageInfo = {
      ID: this.data.storageInfo.ID,
      endDate: this.endDate,
      startDate: this.startDate,
      memberID: this.data.lesseeInfo.memberID,
      memberName: this.data.lesseeInfo.memberName,
      memberNickname: this.data.lesseeInfo.memberNickname,
    };
    switch (action) {
      case 'add':
      case 'extend':
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
