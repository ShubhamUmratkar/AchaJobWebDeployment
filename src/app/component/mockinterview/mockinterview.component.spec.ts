import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockinterviewComponent } from './mockinterview.component';

describe('MockinterviewComponent', () => {
  let component: MockinterviewComponent;
  let fixture: ComponentFixture<MockinterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockinterviewComponent]
    });
    fixture = TestBed.createComponent(MockinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
