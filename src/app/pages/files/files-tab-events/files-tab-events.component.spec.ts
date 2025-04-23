import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTabEventsComponent } from './files-tab-events.component';

describe('FilesTabEventsComponent', () => {
  let component: FilesTabEventsComponent;
  let fixture: ComponentFixture<FilesTabEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTabEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTabEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
