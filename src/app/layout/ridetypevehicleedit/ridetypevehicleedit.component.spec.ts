import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidetypevehicleeditComponent } from './ridetypevehicleedit.component';

describe('RidetypevehicleeditComponent', () => {
  let component: RidetypevehicleeditComponent;
  let fixture: ComponentFixture<RidetypevehicleeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidetypevehicleeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidetypevehicleeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
