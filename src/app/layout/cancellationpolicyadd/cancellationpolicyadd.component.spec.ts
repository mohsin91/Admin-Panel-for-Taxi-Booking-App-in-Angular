import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationpolicyaddComponent } from './cancellationpolicyadd.component';

describe('CancellationpolicyaddComponent', () => {
  let component: CancellationpolicyaddComponent;
  let fixture: ComponentFixture<CancellationpolicyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationpolicyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationpolicyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
