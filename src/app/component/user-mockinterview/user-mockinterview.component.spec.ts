import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMockinterviewComponent } from './user-mockinterview.component';

describe('UserMockinterviewComponent', () => {
  let component: UserMockinterviewComponent;
  let fixture: ComponentFixture<UserMockinterviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMockinterviewComponent]
    });
    fixture = TestBed.createComponent(UserMockinterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
