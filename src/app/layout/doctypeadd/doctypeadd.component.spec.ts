import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctypeaddComponent } from './doctypeadd.component';

describe('DoctypeaddComponent', () => {
  let component: DoctypeaddComponent;
  let fixture: ComponentFixture<DoctypeaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctypeaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctypeaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
