import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationpolicyviewComponent } from './cancellationpolicyview.component';

describe('CancellationpolicyviewComponent', () => {
  let component: CancellationpolicyviewComponent;
  let fixture: ComponentFixture<CancellationpolicyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationpolicyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationpolicyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
