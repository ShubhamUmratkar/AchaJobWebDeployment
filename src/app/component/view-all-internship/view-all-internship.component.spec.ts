import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllInternshipComponent } from './view-all-internship.component';

describe('ViewAllInternshipComponent', () => {
  let component: ViewAllInternshipComponent;
  let fixture: ComponentFixture<ViewAllInternshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllInternshipComponent]
    });
    fixture = TestBed.createComponent(ViewAllInternshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
