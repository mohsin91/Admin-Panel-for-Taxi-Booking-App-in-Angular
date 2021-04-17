import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidetypevehicleviewComponent } from './ridetypevehicleview.component';

describe('RidetypevehicleviewComponent', () => {
  let component: RidetypevehicleviewComponent;
  let fixture: ComponentFixture<RidetypevehicleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidetypevehicleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidetypevehicleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
