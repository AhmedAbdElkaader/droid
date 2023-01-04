import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideosListComponent } from './videos-list.component';

describe('VideosListComponent', () => {
  let component: VideosListComponent;
  let fixture: ComponentFixture<VideosListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
