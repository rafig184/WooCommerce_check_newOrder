import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionCheckComponent } from './connection-check.component';

describe('ConnectionCheckComponent', () => {
  let component: ConnectionCheckComponent;
  let fixture: ComponentFixture<ConnectionCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionCheckComponent]
    });
    fixture = TestBed.createComponent(ConnectionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
