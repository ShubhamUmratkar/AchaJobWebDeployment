import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResetPassComponent } from './admin-reset-pass.component';

describe('AdminResetPassComponent', () => {
  let component: AdminResetPassComponent;
  let fixture: ComponentFixture<AdminResetPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminResetPassComponent]
    });
    fixture = TestBed.createComponent(AdminResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
