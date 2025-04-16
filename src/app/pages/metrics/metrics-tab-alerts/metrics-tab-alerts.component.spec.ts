import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsTabAlertsComponent } from './metrics-tab-alerts.component';

describe('MetricsTabAlertsComponent', () => {
  let component: MetricsTabAlertsComponent;
  let fixture: ComponentFixture<MetricsTabAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsTabAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsTabAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
