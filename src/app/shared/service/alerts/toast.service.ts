import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(summary: string, detail: string, sticky: boolean) {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      sticky,
    });
  }

  showInfo(summary: string, detail: string, sticky: boolean) {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      sticky,
    });
  }

  showWarn(summary: string, detail: string, sticky: boolean) {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      sticky,
    });
  }

  showError(summary: string, detail: string, sticky: boolean) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      sticky,
    });
  }

  showContrast(summary: string, detail: string, sticky: boolean) {
    this.messageService.add({
      severity: 'contrast',
      summary,
      detail,
      sticky,
    });
  }

  showSecondary(summary: string, detail: string, sticky: boolean) {
    this.messageService.add({
      severity: 'secondary',
      summary,
      detail,
      sticky,
    });
  }

  showInfoImages(summary:string, detail:string, sticky:boolean,duration: number) {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      sticky,
      life: duration
    });
  }
}
