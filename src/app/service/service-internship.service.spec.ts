import { TestBed } from '@angular/core/testing';

import { ServiceInternshipService } from './service-internship.service';

describe('ServiceInternshipService', () => {
  let service: ServiceInternshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceInternshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
