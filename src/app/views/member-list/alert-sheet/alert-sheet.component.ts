import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-alert-sheet',
  templateUrl: './alert-sheet.component.html',
})
export class AlertSheetComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<AlertSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
