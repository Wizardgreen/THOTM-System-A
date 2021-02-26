import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="enable" class="spinner-container">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
  styles: [
    `
      .spinner-container {
        margin-top: -84px;
        height: 100vh;
        display: flex;
        align-items: center;
      }
    `,
    '.mat-progress-spinner { margin: 0 auto; }',
  ],
})
export class SpinnerComponent {
  @Input() enable: boolean;
}
