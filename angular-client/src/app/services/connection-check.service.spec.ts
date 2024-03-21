import { TestBed } from '@angular/core/testing';

import { ConnectionCheckService } from './connection-check.service';

describe('ConnectionCheckService', () => {
  let service: ConnectionCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
