import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclebrandviewComponent } from './vehiclebrandview.component';

describe('VehiclebrandviewComponent', () => {
  let component: VehiclebrandviewComponent;
  let fixture: ComponentFixture<VehiclebrandviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclebrandviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclebrandviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
