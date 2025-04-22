import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUsersComponent } from './files-users.component';

describe('FilesUsersComponent', () => {
  let component: FilesUsersComponent;
  let fixture: ComponentFixture<FilesUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
