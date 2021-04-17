import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsliderComponent } from './appslider.component';

describe('AppsliderComponent', () => {
  let component: AppsliderComponent;
  let fixture: ComponentFixture<AppsliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
