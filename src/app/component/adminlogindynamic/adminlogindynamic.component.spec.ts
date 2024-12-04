import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminlogindynamicComponent } from './adminlogindynamic.component';

describe('AdminlogindynamicComponent', () => {
  let component: AdminlogindynamicComponent;
  let fixture: ComponentFixture<AdminlogindynamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminlogindynamicComponent]
    });
    fixture = TestBed.createComponent(AdminlogindynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
