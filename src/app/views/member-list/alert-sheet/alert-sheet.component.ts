import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

interface AlertListType {
  endDate: string;
  isExpired: boolean;
  memberID: string;
  memberName: string;
  memberNickname: string;
  type: 'program' | 'storage';
}

@Component({
  selector: 'app-alert-sheet',
  templateUrl: './alert-sheet.component.html',
  styleUrls: ['./alert-sheet.component.scss'],
})
export class AlertSheetComponent {
  constructor(
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<AlertSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { alertList: AlertListType[] }
  ) {
    console.log(data);
  }

  toMemberInfo(memberID: string, type: AlertListType['type']): void {
    const queryParams = {
      section: type,
    };
    this.router.navigate(['member-list', memberID], { queryParams });
  }
  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
