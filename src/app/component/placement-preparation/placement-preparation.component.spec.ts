import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementPreparationComponent } from './placement-preparation.component';

describe('PlacementPreparationComponent', () => {
  let component: PlacementPreparationComponent;
  let fixture: ComponentFixture<PlacementPreparationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementPreparationComponent]
    });
    fixture = TestBed.createComponent(PlacementPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
