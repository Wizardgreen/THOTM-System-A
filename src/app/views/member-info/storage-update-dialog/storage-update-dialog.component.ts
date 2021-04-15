import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

interface InjectData {
  storageInfo: StorageInfoType;
}

@Component({
  selector: 'app-storage-update-dialog',
  templateUrl: './storage-update-dialog.component.html',
  styles: [
    '.mat-dialog-actions { justify-content: flex-end}',
    `
      .wrapper > input {
        width: 25px;
        padding-left: 15px;
      }
    `,
  ],
})
export class StorageUpdateDialogComponent {
  range = new FormControl('-');
  start: string;
  end: string;

  constructor(
    public dialogRef: MatDialogRef<StorageUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InjectData
  ) {}

  updatePeriod(month: number): void {
    const today = moment();
    this.start = today.format('YYYY-MM-DD');
    this.end = today.add(month, 'M').format('YYYY-MM-DD');
  }

  onChange(event: HTMLInputElement): void {}

  get getUpdateProgram(): any {
    return {
      end: this.end,
      start: this.start,
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
