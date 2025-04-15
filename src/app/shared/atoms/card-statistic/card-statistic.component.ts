import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { CardStatistic } from './card-statistic.model';

@Component({
  selector: 'app-card-statistic',
  imports: [
    CommonModule,
    SkeletonModule
  ],
  templateUrl: './card-statistic.component.html',
  styleUrl: './card-statistic.component.scss'
})
export class CardStatisticComponent {
  @Input() data!: CardStatistic;
}
