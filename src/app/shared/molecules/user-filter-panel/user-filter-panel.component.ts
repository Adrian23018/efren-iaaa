import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserFilterPanel } from './user-filter-panel.model';

@Component({
  selector: 'molecule-user-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule, 
    ChipModule, 
    InputTextModule, 
    ButtonModule, 
    FormsModule, 
  ],
  templateUrl: './user-filter-panel.component.html',
})
export class MoleculeUserFilterPanelComponent {
  @Input() custom!: UserFilterPanel;
  @Output() clearFilters = new EventEmitter<void>();
  @Output() applyFilters = new EventEmitter<void>();

  @ViewChild('filterPanel') filterPanel!: OverlayPanel;

  toggle($event: unknown){
    this.filterPanel?.toggle($event);
  }

  onSelectPlan(value: number) {
    if(this.custom.planConfig)
      this.custom.formGroupName?.get(this.custom.planConfig.formControlName)?.setValue(value);
  }
  
  onSelectStatus(value: string) {
    if(this.custom.statusConfig)
      this.custom.formGroupName?.get(this.custom.statusConfig.formControlName)?.setValue(value);
  }
  
  onSelectPeriod(value: string) {
    if(this.custom.periodConfig)
      this.custom.formGroupName?.get(this.custom.periodConfig.formControlName)?.setValue(value);
  }
  
}