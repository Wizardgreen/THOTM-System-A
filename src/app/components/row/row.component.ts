import { Component } from '@angular/core';

@Component({
  selector: 'app-row',
  template: `
    <div class="app-row">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    '.app-row { display: flex; }',
    '.app-row ::ng-deep mat-form-field { flex: 1; }',
    '.app-row ::ng-deep div.spacing { flex: 1; }',
    '.app-row ::ng-deep mat-form-field + mat-form-field { margin-left: 40px; }',
    '.app-row ::ng-deep mat-form-field + div.spacing { margin-left: 40px; }',
  ],
})
export class RowComponent {}
