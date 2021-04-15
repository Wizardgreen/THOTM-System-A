import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramEnum } from '@utils/enum';
import * as moment from 'moment';

interface InjectData {
  programList: { value: string; viewValue: string }[];
}

@Component({
  selector: 'app-program-update-dialog',
  templateUrl: './program-update-dialog.component.html',
  styles: [
    '.wrapper > .mat-form-field + mat-form-field { margin-left: 40px; }',
    '.mat-dialog-actions { justify-content: flex-end}',
  ],
})
export class ProgramUpdateDialogComponent {
  id: string;
  start: string;
  end: string;

  constructor(
    public dialogRef: MatDialogRef<ProgramUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InjectData
  ) {}

  updatePeriod(month: number): void {
    const today = moment();
    this.start = today.format('YYYY-MM-DD');
    this.end = today.add(month, 'M').format('YYYY-MM-DD');
  }

  onChange(value: string): void {
    this.id = value;

    switch (value) {
      case ProgramEnum.戰地元帥:
        this.updatePeriod(6);
        break;
      case ProgramEnum.禁軍統領:
        this.updatePeriod(3);
        break;
      case ProgramEnum.菁英指揮官:
      case ProgramEnum.見習指揮官:
        this.updatePeriod(1);
        break;
      default:
        return;
    }
  }

  get getUpdateProgram(): ProgramRecordType {
    return {
      id: this.id,
      end: this.end,
      start: this.start,
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
