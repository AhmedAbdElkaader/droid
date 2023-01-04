import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesCheckComponent } from './fees-check.component';

describe('FeesCheckComponent', () => {
  let component: FeesCheckComponent;
  let fixture: ComponentFixture<FeesCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
