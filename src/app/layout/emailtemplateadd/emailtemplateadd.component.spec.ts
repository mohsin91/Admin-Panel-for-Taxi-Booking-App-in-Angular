import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailtemplateaddComponent } from './emailtemplateadd.component';

describe('EmailtemplateaddComponent', () => {
  let component: EmailtemplateaddComponent;
  let fixture: ComponentFixture<EmailtemplateaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailtemplateaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailtemplateaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
