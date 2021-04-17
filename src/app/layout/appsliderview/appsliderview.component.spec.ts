import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsliderviewComponent } from './appsliderview.component';

describe('AppsliderviewComponent', () => {
  let component: AppsliderviewComponent;
  let fixture: ComponentFixture<AppsliderviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsliderviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsliderviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
