import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticpagesviewComponent } from './staticpagesview.component';

describe('StaticpagesviewComponent', () => {
  let component: StaticpagesviewComponent;
  let fixture: ComponentFixture<StaticpagesviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticpagesviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticpagesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
