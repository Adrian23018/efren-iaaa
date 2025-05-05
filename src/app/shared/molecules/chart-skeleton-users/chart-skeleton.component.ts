import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'molecule-chart-skeleton-users',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './chart-skeleton.component.html',
  styleUrl: './chart-skeleton.component.scss'
})
export class MoleculeChartSkeletonUsersComponent {

}
