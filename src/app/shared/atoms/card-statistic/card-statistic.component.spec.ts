import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomCardStatisticComponent } from './card-statistic.component';

describe('AtomCardStatisticComponent', () => {
  let component: AtomCardStatisticComponent;
  let fixture: ComponentFixture<AtomCardStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomCardStatisticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtomCardStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
