import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsTabGeneralComponent } from './metrics-tab-general.component';

describe('MetricsTabGeneralComponent', () => {
  let component: MetricsTabGeneralComponent;
  let fixture: ComponentFixture<MetricsTabGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsTabGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsTabGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
