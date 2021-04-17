import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GodsviewComponent } from './godsview.component';

describe('GodsviewComponent', () => {
  let component: GodsviewComponent;
  let fixture: ComponentFixture<GodsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GodsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GodsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
