import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplateviewComponent } from './emailtemplateview.component';

describe('EmailtemplateviewComponent', () => {
  let component: EmailtemplateviewComponent;
  let fixture: ComponentFixture<EmailtemplateviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplateviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplateviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
