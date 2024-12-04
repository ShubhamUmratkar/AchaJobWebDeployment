import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViellAllJobsComponent } from './viell-all-jobs.component';

describe('ViellAllJobsComponent', () => {
  let component: ViellAllJobsComponent;
  let fixture: ComponentFixture<ViellAllJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViellAllJobsComponent]
    });
    fixture = TestBed.createComponent(ViellAllJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
