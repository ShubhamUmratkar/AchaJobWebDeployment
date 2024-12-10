import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyQuestionComponent } from './frequently-question.component';

describe('FrequentlyQuestionComponent', () => {
  let component: FrequentlyQuestionComponent;
  let fixture: ComponentFixture<FrequentlyQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrequentlyQuestionComponent]
    });
    fixture = TestBed.createComponent(FrequentlyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
