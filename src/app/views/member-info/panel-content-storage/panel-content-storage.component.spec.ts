import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContentStorageComponent } from './panel-content-storage.component';

describe('PanelContentStorageComponent', () => {
  let component: PanelContentStorageComponent;
  let fixture: ComponentFixture<PanelContentStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelContentStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelContentStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
