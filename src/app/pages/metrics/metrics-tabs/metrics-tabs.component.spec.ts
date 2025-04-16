import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsTabsComponent } from './metrics-tabs.component';

describe('MetricsTabsComponent', () => {
  let component: MetricsTabsComponent;
  let fixture: ComponentFixture<MetricsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
