import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPlacementComponent } from './user-placement.component';

describe('UserPlacementComponent', () => {
  let component: UserPlacementComponent;
  let fixture: ComponentFixture<UserPlacementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserPlacementComponent]
    });
    fixture = TestBed.createComponent(UserPlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
