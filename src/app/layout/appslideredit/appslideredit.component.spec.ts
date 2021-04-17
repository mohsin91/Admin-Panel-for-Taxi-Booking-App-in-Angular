import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppslidereditComponent } from './appslideredit.component';

describe('AppslidereditComponent', () => {
  let component: AppslidereditComponent;
  let fixture: ComponentFixture<AppslidereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppslidereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppslidereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
