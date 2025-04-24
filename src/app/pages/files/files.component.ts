import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserFile } from '@app/interfaces/files.model';
import { FilesUsersComponent } from './files-users/files-users.component';
import { MoleculeTabsComponent } from '@app/shared/molecules/tabs/tabs.component';
import { Tab } from '@app/interfaces/tabs.model';
import { FilesTabSummaryComponent } from "./files-tab-summary/files-tab-summary.component";
import { FilesTabEmotionsComponent } from "./files-tab-emotions/files-tab-emotions.component";
import { FilesTabEventsComponent } from "./files-tab-events/files-tab-events.component";
import { FilesTabInsightsComponent } from "./files-tab-insights/files-tab-insights.component";
import { FilesTabNotesComponent } from './files-tab-notes/files-tab-notes.component';
import { FilesTabConversationsComponent } from "./files-tab-conversations/files-tab-conversations.component";

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    // TabViewModule,
    InputGroupModule,
    InputGroupAddonModule,
    FilesUsersComponent,
    MoleculeTabsComponent,
    FilesTabSummaryComponent,
    FilesTabEmotionsComponent,
    FilesTabEventsComponent,
    FilesTabInsightsComponent,
    FilesTabNotesComponent,
    FilesTabConversationsComponent
],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit {
  selectedFile: UserFile | null = null;
  activeTab: string = 'summary';

  tabs: Tab[] = [
    { id: 'summary', label: 'Resumen' },
    { id: 'emotions', label: 'Emociones' },
    { id: 'events', label: 'Eventos' },
    { id: 'insights', label: 'Perspectivas' },
    { id: 'notes', label: 'Notas' },
    { id: 'conversations', label: 'Conversación' },
  ];

  ngOnInit() {
  }

  selectFile(file: UserFile) {
    this.selectedFile = {...file};
  }
}
