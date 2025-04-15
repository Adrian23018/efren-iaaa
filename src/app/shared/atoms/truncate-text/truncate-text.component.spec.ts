import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomTruncateTextComponent } from './truncate-text.component';

describe('AtomTruncateTextComponent', () => {
  let component: AtomTruncateTextComponent;
  let fixture: ComponentFixture<AtomTruncateTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomTruncateTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtomTruncateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
