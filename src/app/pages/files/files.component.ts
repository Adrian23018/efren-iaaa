import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

interface UserFile {
  id: number;
  name: string;
  userId: string;
  period: string;
  status: 'Revisado' | 'Pendiente';
  summary: string;
  tags: string[];
}

interface FileDetail {
  id: number;
  name: string;
  userId: string;
  period: string;
  summary: string;
  engagement: {
    score: number;
    characters: number;
  };
  tags: string[];
  campaign: string;
}

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    TagModule,
    ChipModule,
    DividerModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit {
  files: UserFile[] = [];
  selectedFile: FileDetail | null = null;
  
  ngOnInit() {
    this.loadFiles();
  }
  
  loadFiles() {
    // Mock data - in a real app, this would come from a service
    this.files = [
      {
        id: 1,
        name: 'María González',
        userId: '101',
        period: '2023-09-01 - 2023-09-07',
        status: 'Revisado',
        summary: 'La usuaria muestra signos de ansiedad moderada relacionados con su trabajo. Ha expresado preocupaciones por plazos ajustados y conflictos con colegas.',
        tags: ['ansiedad', 'estrés laboral', 'insomnio']
      },
      {
        id: 2,
        name: 'Carlos Rodríguez',
        userId: '102',
        period: '2023-09-02 - 2023-09-08',
        status: 'Pendiente',
        summary: 'El usuario está atravesando una ruptura amorosa reciente. Muestra signos de tristeza y desánimo pero mantiene actitud proactiva.',
        tags: ['duelo', 'procesando pérdida', 'reflexión']
      },
      {
        id: 3,
        name: 'Ana Martínez',
        userId: '103',
        period: '2023-09-03 - 2023-09-09',
        status: 'Revisado',
        summary: 'La usuaria está enfrentando decisiones importantes sobre su carrera profesional. Muestra señales de indecisión y miedo al fracaso.',
        tags: ['indecisión', 'transición vital', 'miedo al fracaso']
      }
    ];
  }
  
  selectFile(file: UserFile) {
    this.selectedFile = {
      ...this.selectedFile,
      id: file.id,
      name: file.name,
      userId: file.userId,
      period: file.period,
      summary: file.summary,
      engagement: {
        score: 8.5,
        characters: 1250
      },
      tags: file.tags,
      campaign: 'Campaña de manejo del estrés'
    };
    console.log(this.selectedFile);
  }
  
  getTagSeverity(tag: string): string {
    const severityMap: Record<string, string> = {
      'ansiedad': 'warning',
      'estrés laboral': 'warning',
      'insomnio': 'info',
      'duelo': 'danger',
      'procesando pérdida': 'danger',
      'reflexión': 'info',
      'indecisión': 'warning',
      'transición vital': 'info',
      'miedo al fracaso': 'warning'
    };
    
    return severityMap[tag] || 'info';
  }
}
