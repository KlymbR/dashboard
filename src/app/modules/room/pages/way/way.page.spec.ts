import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayComponent } from './way.page';

describe('WayComponent', () => {
  let component: WayComponent;
  let fixture: ComponentFixture<WayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
