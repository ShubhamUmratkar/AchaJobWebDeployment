import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobspostsComponent } from './jobsposts.component';

describe('JobspostsComponent', () => {
  let component: JobspostsComponent;
  let fixture: ComponentFixture<JobspostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobspostsComponent]
    });
    fixture = TestBed.createComponent(JobspostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
