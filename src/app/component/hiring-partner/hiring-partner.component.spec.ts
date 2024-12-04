import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringPartnerComponent } from './hiring-partner.component';

describe('HiringPartnerComponent', () => {
  let component: HiringPartnerComponent;
  let fixture: ComponentFixture<HiringPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
