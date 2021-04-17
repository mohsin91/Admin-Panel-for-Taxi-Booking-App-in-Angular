import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemodeleditComponent } from './vehiclemodeledit.component';

describe('VehiclemodeleditComponent', () => {
  let component: VehiclemodeleditComponent;
  let fixture: ComponentFixture<VehiclemodeleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclemodeleditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemodeleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
