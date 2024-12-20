import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidanceAdviceComponent } from './guidance-advice.component';

describe('GuidanceAdviceComponent', () => {
  let component: GuidanceAdviceComponent;
  let fixture: ComponentFixture<GuidanceAdviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuidanceAdviceComponent]
    });
    fixture = TestBed.createComponent(GuidanceAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
