import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFormsAdminComponent } from './view-all-forms-admin.component';

describe('ViewAllFormsAdminComponent', () => {
  let component: ViewAllFormsAdminComponent;
  let fixture: ComponentFixture<ViewAllFormsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllFormsAdminComponent]
    });
    fixture = TestBed.createComponent(ViewAllFormsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
