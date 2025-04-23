import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTabInsightsComponent } from './files-tab-insights.component';

describe('FilesTabInsightsComponent', () => {
  let component: FilesTabInsightsComponent;
  let fixture: ComponentFixture<FilesTabInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTabInsightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTabInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
