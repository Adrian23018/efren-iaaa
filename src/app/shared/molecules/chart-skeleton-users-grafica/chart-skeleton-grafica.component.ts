import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'molecule-chart-skeleton-users-grafica',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './chart-skeleton-grafica.component.html',
  styleUrl: './chart-skeleton-grafica.component.scss'
})
export class MoleculeChartSkeletonUsersGraficaComponent {

}
