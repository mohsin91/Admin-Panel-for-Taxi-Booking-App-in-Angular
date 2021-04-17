import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctypeeditComponent } from './doctypeedit.component';

describe('DoctypeeditComponent', () => {
  let component: DoctypeeditComponent;
  let fixture: ComponentFixture<DoctypeeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctypeeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctypeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
