import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSliderComponent } from './job-slider.component';

describe('JobSliderComponent', () => {
  let component: JobSliderComponent;
  let fixture: ComponentFixture<JobSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobSliderComponent]
    });
    fixture = TestBed.createComponent(JobSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
