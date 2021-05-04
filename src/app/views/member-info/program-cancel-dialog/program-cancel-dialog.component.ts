import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface InjectData {
  displayName: string;
  memberID: string;
}

@Component({
  selector: 'app-program-cancel-dialog',
  templateUrl: './program-cancel-dialog.component.html',
  styles: ['.mat-dialog-actions { justify-content: flex-end}'],
})
export class ProgramCancelDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProgramCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InjectData
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  cancelPaidProgram(): boolean {
    return true;
  }
}
