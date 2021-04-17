import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclebrandaddComponent } from './vehiclebrandadd.component';

describe('VehiclebrandaddComponent', () => {
  let component: VehiclebrandaddComponent;
  let fixture: ComponentFixture<VehiclebrandaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclebrandaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclebrandaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
