import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticpageseditComponent } from './staticpagesedit.component';

describe('StaticpageseditComponent', () => {
  let component: StaticpageseditComponent;
  let fixture: ComponentFixture<StaticpageseditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticpageseditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticpageseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
