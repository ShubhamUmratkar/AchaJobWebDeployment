import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForgetComponent } from './admin-forget.component';

describe('AdminForgetComponent', () => {
  let component: AdminForgetComponent;
  let fixture: ComponentFixture<AdminForgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminForgetComponent]
    });
    fixture = TestBed.createComponent(AdminForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
