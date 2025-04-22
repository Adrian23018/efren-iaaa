import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { SkeletonModule } from 'primeng/skeleton';
import { UserFileCardComponent } from '@app/shared/molecules/user-file-card/user-file-card.component';
import { UserFile } from '@app/interfaces/files.model';

@Component({
  selector: 'app-files-users',
  standalone: true,
  imports: [
    CommonModule,
    ScrollerModule,
    SkeletonModule,
    UserFileCardComponent
  ],
  templateUrl: './files-users.component.html',
  styleUrl: './files-users.component.scss'
})
export class FilesUsersComponent {
  //@Input() files: UserFile[] = [];
  files: UserFile[] = [];
  selectedFile: UserFile | null = null;
  @Output() fileSelected = new EventEmitter<UserFile>();
  
  totalRecords: number = 10000;
  lazyLoading: boolean = false;
  loadLazyTimeout: any;

  @ViewChild('scroller') scroller!: Scroller;
  lastLoaded = 0;
  pageSize = 30;
  previousLast = 0;
  highestLastSeen = 0;

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    const initialItems = Array.from({ length: this.pageSize }).map((_, i) => (<UserFile>{
      id: i + 1,
      name: `María González #${i + 1}`,
      userId: '101',
      period: '2023-09-01 - 2023-09-07',
      status: 'Revisado',
      summary: 'La usuaria muestra signos de ansiedad moderada relacionados con su trabajo. Ha expresado preocupaciones por plazos ajustados y conflictos con colegas.',
      tags: ['ansiedad', 'estrés laboral', 'insomnio']
    }));
    
    this.files = initialItems;
    this.highestLastSeen = this.pageSize - 1;
  }

  loadData(event: any) {
    const { last } = event;
    
    if (!this.lazyLoading && last >= this.files.length - 5) {
      this.loadMoreItems();
    }
  }

  loadMoreItems() {
    if (this.lazyLoading || this.files.length >= this.totalRecords) {
      return;
    }
    
    this.lazyLoading = true;
    
    setTimeout(() => {
      const startIndex = this.files.length;
      const endIndex = Math.min(startIndex + this.pageSize, this.totalRecords);
      
      const newItems = Array.from({ length: endIndex - startIndex }).map((_, i) => (<UserFile>{
        id: startIndex + i + 1,
        name: `María González #${startIndex + i + 1}`,
        userId: '101',
        period: '2023-09-01 - 2023-09-07',
        status: 'Revisado',
        summary: 'La usuaria muestra signos de ansiedad moderada relacionados con su trabajo. Ha expresado preocupaciones por plazos ajustados y conflictos con colegas.',
        tags: ['ansiedad', 'estrés laboral', 'insomnio']
      }));
      
      this.files = [...this.files, ...newItems];
      this.lazyLoading = false;
    }, 500);
  }
}
