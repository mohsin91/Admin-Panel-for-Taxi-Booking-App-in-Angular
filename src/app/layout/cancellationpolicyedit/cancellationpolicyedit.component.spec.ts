import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationpolicyeditComponent } from './cancellationpolicyedit.component';

describe('CancellationpolicyeditComponent', () => {
  let component: CancellationpolicyeditComponent;
  let fixture: ComponentFixture<CancellationpolicyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancellationpolicyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancellationpolicyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
