import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplateeditComponent } from './emailtemplateedit.component';

describe('EmailtemplateeditComponent', () => {
  let component: EmailtemplateeditComponent;
  let fixture: ComponentFixture<EmailtemplateeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplateeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplateeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
