import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsTabUsersComponent } from './metrics-tab-users.component';

describe('MetricsTabUsersComponent', () => {
  let component: MetricsTabUsersComponent;
  let fixture: ComponentFixture<MetricsTabUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsTabUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricsTabUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
