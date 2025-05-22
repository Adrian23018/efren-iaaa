import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricsTabUsersGraficasComponent } from './metrics-tab-users-graficas.component';


describe('MetricsTabUsersGraficasComponent', () => {
  let component: MetricsTabUsersGraficasComponent;
  let fixture: ComponentFixture<MetricsTabUsersGraficasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsTabUsersGraficasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsTabUsersGraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
