import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticpagesaddComponent } from './staticpagesadd.component';

describe('StaticpagesaddComponent', () => {
  let component: StaticpagesaddComponent;
  let fixture: ComponentFixture<StaticpagesaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticpagesaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticpagesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
