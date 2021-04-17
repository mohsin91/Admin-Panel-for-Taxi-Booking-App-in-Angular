import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctypeviewComponent } from './doctypeview.component';

describe('DoctypeviewComponent', () => {
  let component: DoctypeviewComponent;
  let fixture: ComponentFixture<DoctypeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctypeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctypeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
