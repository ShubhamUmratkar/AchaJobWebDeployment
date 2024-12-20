import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerAdviceComponent } from './career-advice.component';

describe('CareerAdviceComponent', () => {
  let component: CareerAdviceComponent;
  let fixture: ComponentFixture<CareerAdviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerAdviceComponent]
    });
    fixture = TestBed.createComponent(CareerAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
