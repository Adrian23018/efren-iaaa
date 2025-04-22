import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFileCardComponent } from './user-file-card.component';

describe('UserFileCardComponent', () => {
  let component: UserFileCardComponent;
  let fixture: ComponentFixture<UserFileCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFileCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFileCardComponent);
    component = fixture.componentInstance;
    component.file = {
      id: 1,
      name: 'Test User',
      userId: '101',
      period: '2023-09-01 - 2023-09-07',
      status: 'Revisado',
      summary: 'Test summary',
      tags: ['test']
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit fileSelected event when selectFile is called', () => {
    spyOn(component.fileSelected, 'emit');
    component.selectFile();
    expect(component.fileSelected.emit).toHaveBeenCalledWith(component.file);
  });
});