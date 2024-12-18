import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshippostsComponent } from './internshipposts.component';

describe('InternshippostsComponent', () => {
  let component: InternshippostsComponent;
  let fixture: ComponentFixture<InternshippostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternshippostsComponent]
    });
    fixture = TestBed.createComponent(InternshippostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
