import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTabSummaryComponent } from './files-tab-summary.component';

describe('FilesTabSummaryComponent', () => {
  let component: FilesTabSummaryComponent;
  let fixture: ComponentFixture<FilesTabSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTabSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTabSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
