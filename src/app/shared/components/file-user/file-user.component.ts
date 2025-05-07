import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserFile } from '@app/interfaces/files.model';
import { Severity, TagUtil } from '@app/shared/utils/tagUtil';
import { DialogModule } from 'primeng/dialog';
import { FilesTabConversationsComponent } from '@app/pages/files/files-tab-conversations/files-tab-conversations.component';
import { FilesTabNotesComponent } from '@app/pages/files/files-tab-notes/files-tab-notes.component';
import { FilesTabInsightsComponent } from '@app/pages/files/files-tab-insights/files-tab-insights.component';
import { FilesTabEmotionsComponent } from '@app/pages/files/files-tab-emotions/files-tab-emotions.component';
import { FilesTabEventsComponent } from '@app/pages/files/files-tab-events/files-tab-events.component';
import { FilesTabSummaryComponent } from '@app/pages/files/files-tab-summary/files-tab-summary.component';
import { MoleculeTabsComponent } from '@app/shared/molecules/tabs/tabs.component';
import { Tab } from '@app/interfaces/tabs.model';

@Component({
  selector: 'app-file-user',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    TagModule,
    ChipModule,
    InputGroupModule,
    InputGroupAddonModule,
    DialogModule,
    FilesTabSummaryComponent,
    FilesTabEmotionsComponent,
    FilesTabEventsComponent,
    FilesTabInsightsComponent,
    FilesTabNotesComponent,
    FilesTabConversationsComponent,
    MoleculeTabsComponent,
  ],
  templateUrl: './file-user.component.html',
  styleUrl: './file-user.component.scss'
})
export class FileUserComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() sessionData: any;
  @Output() closeModal = new EventEmitter<void>();

  selectedFile: any | null = null;
  showFileDialog = false;

  activeTab: string = 'summary';

  tabs: Tab[] = [
    { id: 'summary', label: 'Resumen' },
    { id: 'emotions', label: 'Emociones' },
    { id: 'events', label: 'Eventos' },
    { id: 'insights', label: 'Insights' },
    { id: 'notes', label: 'Notas' },
    // { id: 'conversations', label: 'Conversación' },
  ];

  ngOnInit() {
    this.selectedFile = this.sessionData;
    this.showFileDialog = this.display;

  }

  selectFile(file: UserFile) {
    this.selectedFile = { ...file };
  }

  getTagSeverity(tag: string): Severity {
    return TagUtil.getTagSeverity(tag);
  }

  closeFileDialog() {
    this.closeModal.emit(); // Emite el evento
  }

  openFileDialog(file: any) {
    this.selectedFile = file;
    this.showFileDialog = true;
  }

}
