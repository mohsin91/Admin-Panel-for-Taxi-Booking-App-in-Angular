import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemodelviewComponent } from './vehiclemodelview.component';

describe('VehiclemodelviewComponent', () => {
  let component: VehiclemodelviewComponent;
  let fixture: ComponentFixture<VehiclemodelviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclemodelviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemodelviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
