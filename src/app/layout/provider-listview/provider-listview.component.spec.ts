import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderListviewComponent } from './provider-listview.component';

describe('ProviderListviewComponent', () => {
  let component: ProviderListviewComponent;
  let fixture: ComponentFixture<ProviderListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
