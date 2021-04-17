import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidetypeviewComponent } from './ridetypeview.component';

describe('RidetypeviewComponent', () => {
  let component: RidetypeviewComponent;
  let fixture: ComponentFixture<RidetypeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidetypeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidetypeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
