import { Component } from '@angular/core';

@Component({
  selector: 'app-row',
  template: `
    <div class="app-row">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    '.app-row {  display: flex; }',
    '.app-row ::ng-deep mat-form-field { flex: 1; }',
    '.app-row ::ng-deep mat-form-field:nth-child(even) { margin-left: 40px; }',
  ],
})
export class RowComponent {}
