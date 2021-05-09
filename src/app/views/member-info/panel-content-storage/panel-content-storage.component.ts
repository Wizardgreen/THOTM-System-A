import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { moment, willExpireIn7Days } from '@utils/moment';
import { StorageStatusEnum } from '@utils/enum';

@Component({
  selector: 'app-panel-content-storage',
  templateUrl: './panel-content-storage.component.html',
  styleUrls: ['./panel-content-storage.component.scss'],
})
export class PanelContentStorageComponent implements OnInit {
  @Input() visualizeStorage: StorageInfoType[][];
  @Input() memberID: string;
  @Output() showDialogEvent = new EventEmitter<StorageInfoType>();

  ngOnInit(): void {}

  showDialog(storageInfo): void {
    this.showDialogEvent.emit(storageInfo);
  }

  judgeStorageDisable(storageInfo: StorageInfoType): boolean {
    if (storageInfo.ID === 'disabled') {
      return true;
    }
    return false;
  }

  judgeStorageCellColor(storageInfo: StorageInfoType): string {
    if (storageInfo.status === StorageStatusEnum.EXPIRED) {
      return 'danger';
    }
    if (willExpireIn7Days(storageInfo.endDate)) {
      return 'warn';
    }
    if (storageInfo.memberID === this.memberID) {
      return 'primary';
    }
    if (storageInfo.memberID && storageInfo.memberID !== this.memberID) {
      return 'accent';
    }
    return '';
  }

  displayMemberLabel(storageInfo: StorageInfoType): string {
    const { ID, memberNickname, memberName } = storageInfo;
    if (ID === 'disabled') {
      return '';
    }
    return memberNickname || memberName;
  }
}
