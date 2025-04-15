import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Alert } from '@app/interfaces/alert.model';

@Component({
  selector: 'molecule-alert-detail-dialog',
  imports: [CommonModule, DialogModule, ButtonModule, DatePipe],
  templateUrl: './alert-detail-dialog.component.html',
  styleUrl: './alert-detail-dialog.component.scss'
})
export class MoleculeAlertDetailDialogComponent {
  @Input() visible: boolean = false;
  @Input() alert: Alert | null = null;
  @Output() visibleChange = new EventEmitter<boolean>();

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
