import { Component, inject, OnInit } from '@angular/core';
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
import { debounceTime } from 'rxjs';
import { FilesService } from './files.service';
import { ToastService } from '@app/shared/service/alerts/toast.service';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { MoleculeUserFilterPanelExpentComponent } from '@app/shared/molecules/user-filter-panel-expen/user-filter-panel-expen.component';
import { UserFilterPanelExpe } from '@app/shared/molecules/user-filter-panel-expen/user-filter-panel-expen.model';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
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
    MoleculeUserFilterPanelExpentComponent,
    ToastModule,
    CalendarModule,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit {
  selectedFile: UserFile | null = null;
  activeTab: string = 'summary';
  private fileSrv = inject(FilesService);
  private toastSrvc = inject(ToastService);

  tabs: Tab[] = [
    { id: 'summary', label: 'Resumen' },
    { id: 'emotions', label: 'Emociones' },
    { id: 'events', label: 'Eventos' },
    { id: 'insights', label: 'Perspectivas' },
    { id: 'notes', label: 'Notas' },
    // { id: 'conversations', label: 'Conversación' },
  ];

  formUsers!: FormGroup;
  filterParams: UserFilterPanelExpe = {
    showSearch: true,
    // searchConfig: {
    //   label: 'Buscar',
    //   placeholder: 'Buscar por nombre',
    //   formControlName: 'name'
    // },
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
    // showStatus: true,
    // statusConfig: {
    //   label: 'Estado',
    //   states: [
    //     { label: 'Activo', value: 'Activo' },
    //     { label: 'Inactivo', value: 'Inactivo' },
    //   ],
    //   formControlName: 'status'
    // },
    // showPeriod: true,
    // periodConfig: {
    //   label: 'Periodo',
    //   periods: [
    //     { label: 'Últimos 7 días', value: '7d' },
    //     { label: 'Últimos 30 días', value: '30d' },
    //     { label: 'Últimos 3 meses', value: '3m' },
    //     { label: 'Último año', value: '1y' }
    //   ],
    //   formControlName: 'period'
    // },
    showTopics: true,
    tagsConfigTopis: {
      label: 'Temas',
      topic: [
        { label: 'Términos aceptados', value: 'terminos-aceptados' },
        // { label: 'No compró Pro', value: 'no-compro-pro' },
        { label: 'Demo finalizada', value: 'demo-finalizada' },
        { label: 'Sin botones', value: 'sin-botones' },
        { label: 'No compró Pro', value: 'quedo-pro' },
        { label: 'No compró Élite', value: 'quedo-elite' },
        { label: 'No ha usado el Pro', value: 'pro-no-uso' },
        { label: 'No ha usado el Élite', value: 'elite-no-uso' },
        { label: 'No ha probado la Demo', value: 'no-prueba' },
        { label: 'No tiene ni data', value: 'no-datos' },
        { label: 'Se quedo a la Mitad de Demo', value: 'demo-mitad' },
        { label: 'Pro completado', value: 'pro-completado' },
        { label: 'Demo completado', value: 'demo-completada' }
      ],
      formControlName: 'topic'
    },
    showEmotions: true,
    tagsConfigEmotions: {
      label: 'Emociones',
      emotions: [
        { label: 'Términos aceptados', value: 'terminos-aceptados' },
        // { label: 'No compró Pro', value: 'no-compro-pro' },
        { label: 'Demo finalizada', value: 'demo-finalizada' },
        { label: 'Sin botones', value: 'sin-botones' },
        { label: 'No compró Pro', value: 'quedo-pro' },
        { label: 'No compró Élite', value: 'quedo-elite' },
        { label: 'No ha usado el Pro', value: 'pro-no-uso' },
        { label: 'No ha usado el Élite', value: 'elite-no-uso' },
        { label: 'No ha probado la Demo', value: 'no-prueba' },
        { label: 'No tiene ni data', value: 'no-datos' },
        { label: 'Se quedo a la Mitad de Demo', value: 'demo-mitad' },
        { label: 'Pro completado', value: 'pro-completado' },
        { label: 'Demo completado', value: 'demo-completada' }
      ],
      formControlName: 'emotions'
    },
    showDate: true,
    dateConfig: {
      labelInicio: 'Fecha inicio',
      labelFin: 'Fecha fin',
      formControlNameInicio: 'fechaInicio',
      formControlNameFin: 'fechaFin'
    }
  }

  filters: any = {
    name: '',
    plan: null,
    status: null,
    period: null,
    fechaInicio: null,
    fechaFin: null,
    tags: [],// <-- ¡Este es el que permite que se envíen las etiquetas!
    topic: [],
    emotions: []
  };

  constructor(private readonly formBuilder: FormBuilder) {

    this.fileSrv.getEmotionsTopis().subscribe((res: any) => {
      console.log("respuesta : ", res);

      // let temasFormateados: any = res.filters.temas.map((item: any) => ({ label: item, value: item }));
      // let emocionesFormateadas: any = res.filters.emociones.map((item: any) => ({ label: item, value: item }));

      let temasFormateados: any = res.filters.temas.map((item: any) => ({
        label: item.toLowerCase(),
        value: item.toLowerCase()
      }));

      let emocionesFormateadas: any = res.filters.emociones.map((item: any) => ({
        label: item.toLowerCase(),
        value: item.toLowerCase()
      }));

      console.log("temasFormateados", temasFormateados);
      console.log("emocionesFormateadas", emocionesFormateadas);
      if (res.filters?.temas && res.filters?.emociones && this.filterParams && this.filterParams.tagsConfigTopis && this.filterParams.tagsConfigEmotions) {
        this.filterParams.tagsConfigTopis.topic = temasFormateados || [];
        this.filterParams.tagsConfigEmotions.emotions = emocionesFormateadas || [];
      }
    })

    this.formUsers = this.formBuilder.group({
      name: [''],
      plan: [''],
      status: [''],
      period: [''],
      searchDirect: [''],
      fechaInicio: [null],
      fechaFin: [null],
      tags: [[]],// <-- ¡Este es el que permite que se envíen las etiquetas!
      topic: [[]],
      emotions: [[]]
    });
    this.filterParams.formGroupName = this.formUsers;

    this.formUsers.get('searchDirect')?.valueChanges
      .pipe(
        debounceTime(1300)
      )
      .subscribe(value => {
        this.formUsers.patchValue({
          name: value,
          plan: null,
          status: null,
          period: null,
        }, { emitEvent: false });
        this.applyFilters();
      });
  }

  ngOnInit() {
  }

  selectFile(file: UserFile) {
    this.selectedFile = { ...file };
  }

  clearFilters() {
    this.formUsers.patchValue({
      name: '',
      plan: null,
      status: null,
      period: null,
      searchDirect: '',
      fechaInicio: null,
      fechaFin: null,
      tags: [],
      topic: [],
      emotions: []
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

  dowloadFile() {
    if (this.selectedFile && this.selectedFile?.weekly_session_id) {

      if (this.isFiltroActivo()) {
        console.log('Hay al menos un filtro aplicado ✅');
        this.fileSrv.downloadCsvFile(this.selectedFile?.weekly_session_id, this.selectedFile?.userId + '-' + this.selectedFile?.user_name, this.formUsers.value,true);
      } else {
        console.log('Todos los filtros están vacíos ❌');
        this.fileSrv.downloadPdfFile(this.selectedFile?.weekly_session_id, this.selectedFile?.userId + '-' + this.selectedFile?.user_name, this.formUsers.value,false);
      }
    }
  }

  filtrarPorFechas(): void {
    const filters = { ...this.formUsers.getRawValue() };

    if (filters.fechaInicio) {
      filters.fechaInicio = this.formatDateOnly(filters.fechaInicio);
    }

    if (filters.fechaFin) {
      filters.fechaFin = this.formatDateOnly(filters.fechaFin);
    }

    // this.myUsers = this.usersService.getUsers(1, 5, filters);
  }

  private formatDateOnly(date: Date): string {
    return date.toISOString().split('T')[0]; // Devuelve "2025-04-01"
  }

  limpiarFiltros(): void {
    this.formUsers.patchValue({
      name: '',
      plan: null,
      status: null,
      period: null,
      tags: [],
      topic: [],
      emotions: [],
      // searchDirect: '',
      fechaInicio: null,
      fechaFin: null,
    }, { emitEvent: false });

    const filters = { ... this.formUsers.getRawValue() };
    delete filters.searchDirect;
    // this.myUsers = this.usersService.getUsers(1, 5, filters);
  }

  isFiltroActivo(): boolean {
    const valores = this.formUsers.value;

    // Recorre los campos y verifica si alguno tiene valor útil
    return Object.values(valores).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== null && value !== '';
    });
  }

}
