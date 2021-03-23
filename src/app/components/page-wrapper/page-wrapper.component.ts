import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  template: `
    <div class="page-wrapper" [style.maxWidth.px]="maxWidth">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .page-wrapper {
        width: 90%;
        margin: 60px auto;
      }
    `,
  ],
})
export class PageWrapperComponent implements OnInit {
  @Input() maxWidth: number | string = null;
  ngOnInit(): void {
    if (this.maxWidth === null) {
      this.maxWidth = 800;
    }
  }
}
