import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isExpired } from '@utils/moment';
@Component({
  selector: 'app-panel-content-program',
  templateUrl: './panel-content-program.component.html',
  styleUrls: ['./panel-content-program.component.scss'],
})
export class PanelContentProgramComponent {
  @Input() currentProgram: ProgramRecordType;
  @Input() historyProgram: ProgramRecordType[];
  @Input() programList: { value: string; viewValue: string }[];
  @Output() cancelProgramDialogRequest = new EventEmitter<void>();
  @Output() updateProgramDialogRequest = new EventEmitter<void>();

  programHeader = ['sort', 'name', 'start', 'end', 'note'];

  get isCurrentProgramExpired(): boolean {
    const currentProgramEndDate = this.currentProgram.end;
    if (currentProgramEndDate === '-') {
      return false;
    }
    return isExpired(currentProgramEndDate);
  }

  showCancelProgramDialog(): void {
    this.cancelProgramDialogRequest.emit();
  }

  showUpdateProgramDialog(): void {
    this.updateProgramDialogRequest.emit();
  }
}
