import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUpdateDialogComponent } from './program-update-dialog.component';

describe('ProgramUpdateDialogComponent', () => {
  let component: ProgramUpdateDialogComponent;
  let fixture: ComponentFixture<ProgramUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
