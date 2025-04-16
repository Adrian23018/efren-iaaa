import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeAlertDetailDialogComponent } from './alert-detail-dialog.component';

describe('MoleculeAlertDetailDialogComponent', () => {
  let component: MoleculeAlertDetailDialogComponent;
  let fixture: ComponentFixture<MoleculeAlertDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoleculeAlertDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoleculeAlertDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
