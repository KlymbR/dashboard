import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSigninComponent } from './dialog-signin.component';

describe('DialogSigninComponent', () => {
  let component: DialogSigninComponent;
  let fixture: ComponentFixture<DialogSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
