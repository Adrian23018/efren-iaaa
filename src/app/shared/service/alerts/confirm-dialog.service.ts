import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private confirmationService = inject(ConfirmationService);

  messageConfirmation(
    event: Event,
    title: string,
    message: string,
    icon: string,
    acceptLabel: string,
    rejectLabel: string,
    accept: Function,
    reject: Function,
  ) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message,
      header: title,
      icon,
      acceptLabel,
      rejectLabel,
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-contrast p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept,
      reject,
    });
  }
}
