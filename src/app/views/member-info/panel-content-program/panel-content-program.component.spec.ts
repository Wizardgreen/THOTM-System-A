import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContentProgramComponent } from './panel-content-program.component';

describe('PanelContentProgramComponent', () => {
  let component: PanelContentProgramComponent;
  let fixture: ComponentFixture<PanelContentProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelContentProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelContentProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
