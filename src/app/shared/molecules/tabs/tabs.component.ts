import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tab } from '@app/interfaces/tabs.model';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'molecule-tabs',
  imports: [
    CommonModule, 
    TabViewModule, 
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class MoleculeTabsComponent {
    @Input() tabs: Tab[] = [];
    @Input() set activeTab(value: string) {
        this._activeTab = value;
    }
    get activeTab(): string {
        return this._activeTab;
    }
    private _activeTab: string = 'general';
    @Output() activeTabChange: EventEmitter<string> = new EventEmitter<string>();
  
    setActiveTab(tabId: string) {
        this.activeTab = tabId;
        this.activeTabChange.emit(this.activeTab);
    }
}