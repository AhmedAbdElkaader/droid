import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VideosDetComponent } from './videos-det.component';

describe('VideosDetComponent', () => {
  let component: VideosDetComponent;
  let fixture: ComponentFixture<VideosDetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
