import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclemodeladdComponent } from './vehiclemodeladd.component';

describe('VehiclemodeladdComponent', () => {
  let component: VehiclemodeladdComponent;
  let fixture: ComponentFixture<VehiclemodeladdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclemodeladdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclemodeladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
