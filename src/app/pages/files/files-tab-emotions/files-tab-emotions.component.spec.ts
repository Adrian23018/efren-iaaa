import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTabEmotionsComponent } from './files-tab-emotions.component';

describe('FilesTabEmotionsComponent', () => {
  let component: FilesTabEmotionsComponent;
  let fixture: ComponentFixture<FilesTabEmotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTabEmotionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTabEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
