import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesTabConversationsComponent } from './files-tab-conversations.component';

describe('FilesTabConversationsComponent', () => {
  let component: FilesTabConversationsComponent;
  let fixture: ComponentFixture<FilesTabConversationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTabConversationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTabConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
