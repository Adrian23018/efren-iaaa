import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'molecule-chart-skeleton-alerts',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './chart-skeleton.component.html',
  styleUrl: './chart-skeleton.component.scss'
})
export class MoleculeChartSkeletonAlertsComponent {

}
