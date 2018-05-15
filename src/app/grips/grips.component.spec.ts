import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GripsComponent } from './grips.component';

describe('GripsComponent', () => {
  let component: GripsComponent;
  let fixture: ComponentFixture<GripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GripsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
