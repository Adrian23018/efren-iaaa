import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilesTabTopicsComponent } from './files-tab-topics.component';


describe('FilesTabTopicsComponent', () => {
  let component: FilesTabTopicsComponent;
  let fixture: ComponentFixture<FilesTabTopicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesTabTopicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesTabTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
