import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidetypevehicleaddComponent } from './ridetypevehicleadd.component';

describe('RidetypevehicleaddComponent', () => {
  let component: RidetypevehicleaddComponent;
  let fixture: ComponentFixture<RidetypevehicleaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidetypevehicleaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidetypevehicleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
