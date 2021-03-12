import { Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  template: `
    <div class="page-wrapper">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .page-wrapper {
        width: 90%;
        max-width: 800px;
        margin: 60px auto;
      }
    `,
  ],
})
export class PageWrapperComponent {}
