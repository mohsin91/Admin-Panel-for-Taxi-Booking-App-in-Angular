import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclebrandeditComponent } from './vehiclebrandedit.component';

describe('VehiclebrandeditComponent', () => {
  let component: VehiclebrandeditComponent;
  let fixture: ComponentFixture<VehiclebrandeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclebrandeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclebrandeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
