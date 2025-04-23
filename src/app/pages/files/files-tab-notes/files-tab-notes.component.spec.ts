import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTabNotesComponent } from './files-tab-notes.component';

describe('FilesTabNotesComponent', () => {
  let component: FilesTabNotesComponent;
  let fixture: ComponentFixture<FilesTabNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTabNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTabNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
