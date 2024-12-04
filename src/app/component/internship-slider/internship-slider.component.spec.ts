import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipSliderComponent } from './internship-slider.component';

describe('InternshipSliderComponent', () => {
  let component: InternshipSliderComponent;
  let fixture: ComponentFixture<InternshipSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshipSliderComponent]
    });
    fixture = TestBed.createComponent(InternshipSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
