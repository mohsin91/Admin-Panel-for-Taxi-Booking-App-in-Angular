import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidetypeeditComponent } from './ridetypeedit.component';

describe('RidetypeeditComponent', () => {
  let component: RidetypeeditComponent;
  let fixture: ComponentFixture<RidetypeeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidetypeeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidetypeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
