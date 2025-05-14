import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { UserFilterPanelExpe } from './user-filter-panel-expen.model';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'molecule-user-filter-panel-expen',
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
    MultiSelectModule,
    CheckboxModule,
    CalendarModule,
  ],
  templateUrl: './user-filter-panel-expen.component.html',
})
export class MoleculeUserFilterPanelExpentComponent {
  @Input() custom!: UserFilterPanelExpe;
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

  toggleTag(value: string): void {
    const control = this.custom?.formGroupName?.get(this.custom.tagsConfig?.formControlName ?? '');
    if (!control) return;
  
    const currentTags = control.value || [];
    const isSelected = currentTags.includes(value);
  
    const updatedTags = isSelected
      ? currentTags.filter((tag: string) => tag !== value)
      : [...currentTags, value];
  
    control.setValue(updatedTags);
  }
  
}