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
import { MoleculeUserFilterPanelComponent } from '@app/shared/molecules/user-filter-panel/user-filter-panel.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFilterPanel } from '@app/shared/molecules/user-filter-panel/user-filter-panel.model';
import { Filters } from '@app/interfaces/paginator.model';

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
    FormsModule,
    ReactiveFormsModule,
    FilesUsersComponent,
    MoleculeTabsComponent,
    FilesTabSummaryComponent,
    FilesTabEmotionsComponent,
    FilesTabEventsComponent,
    FilesTabInsightsComponent,
    FilesTabNotesComponent,
    FilesTabConversationsComponent,
    MoleculeUserFilterPanelComponent,
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

  formUsers!: FormGroup;
  filterParams: UserFilterPanel = {
    showSearch: true,
    searchConfig: {
      label: 'Buscar',
      placeholder: 'Buscar por nombre',
      formControlName: 'name'
    },
    showPlan: true,
    planConfig: {
      label: 'Plan',
      plans: [
        { label: 'Elite', value: 1 },
        { label: 'Pro', value: 2 },
        { label: 'Demo', value: 3 },
      ],
      formControlName: 'plan'
    },
    showStatus: true,
    statusConfig: {
      label: 'Estado',
      states: [
        { label: 'Activo', value: 'Activo' },
        { label: 'Inactivo', value: 'Inactivo' },
      ],
      formControlName: 'status'
    },
    showPeriod: true,
    periodConfig: {
      label: 'Periodo',
      periods: [
        { label: 'Últimos 7 días', value: '7d' },
        { label: 'Últimos 30 días', value: '30d' },
        { label: 'Últimos 3 meses', value: '3m' },
        { label: 'Último año', value: '1y' }  
      ],
      formControlName: 'period'
    }
  }

  filters: Filters = {
    name: '',
    plan: null,
    status: null,
    period: null
  };

  constructor(private readonly formBuilder: FormBuilder) {
    this.formUsers = this.formBuilder.group({
      name: [''],
      plan: [''],
      status: [''],
      period: [''],
      searchDirect: [''],
    });
    this.filterParams.formGroupName = this.formUsers;
  }

  ngOnInit() {
  }

  selectFile(file: UserFile) {
    this.selectedFile = {...file};
  }

  clearFilters() {
    this.formUsers.patchValue({
      name: '',
      plan: null,
      status: null,
      period: null,
      searchDirect: '',
    }, { emitEvent: false });

    const filters = { ... this.formUsers.getRawValue() };
    delete filters.searchDirect;
    this.filters = filters;
  }

  applyFilters() {
    const filters = { ... this.formUsers.getRawValue() };
    delete filters.searchDirect;
    this.filters = filters;
  }
}
