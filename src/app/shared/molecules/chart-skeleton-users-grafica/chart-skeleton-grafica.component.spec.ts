import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoleculeChartSkeletonUsersGraficaComponent } from './chart-skeleton-grafica.component';


describe('MoleculeChartSkeletonUsersGraficaComponent', () => {
  let component: MoleculeChartSkeletonUsersGraficaComponent;
  let fixture: ComponentFixture<MoleculeChartSkeletonUsersGraficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculeChartSkeletonUsersGraficaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeChartSkeletonUsersGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
