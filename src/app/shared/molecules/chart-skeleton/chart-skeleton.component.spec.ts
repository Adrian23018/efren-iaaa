import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeChartSkeletonComponent } from './chart-skeleton.component';

describe('MoleculeChartSkeletonComponent', () => {
  let component: MoleculeChartSkeletonComponent;
  let fixture: ComponentFixture<MoleculeChartSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculeChartSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeChartSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
