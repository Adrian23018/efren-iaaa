import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Scroller, ScrollerModule } from 'primeng/scroller';
import { SkeletonModule } from 'primeng/skeleton';
import { MoleculeUserFileCardComponent } from '@app/shared/molecules/user-file-card/user-file-card.component';
import { MetaFile, UserFile } from '@app/interfaces/files.model';
import { FilesService } from '../files.service';
import { Filters, PaginatorModel } from '@app/interfaces/paginator.model';

@Component({
  selector: 'app-files-users',
  standalone: true,
  imports: [
    CommonModule,
    ScrollerModule,
    SkeletonModule,
    MoleculeUserFileCardComponent
  ],
  templateUrl: './files-users.component.html',
  styleUrl: './files-users.component.scss'
})
export class FilesUsersComponent {
  files: UserFile[] = [];
  selectedFile: UserFile | null = null;
  @Output() fileSelected = new EventEmitter<UserFile>();
  
  totalRecords: number = 0;
  lazyLoading: boolean = false;

  @ViewChild('scroller') scroller!: Scroller;
  pageSize: number = 20;
  pageDefault: number = 1;
  page: number = 1;

  @Input() filters: Filters = {
    name: '',
    plan: null,
    status: null,
    period: null
  };

  constructor(private readonly filesService: FilesService){}

  ngOnInit() {
    this.loadInitialData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters'] && !changes['filters'].firstChange) {
      this.loadInitialData();
    }
  }

  loadInitialData() {
    console.log("this.filters: ", this.filters);
    
    this.filesService.getFiles(this.pageDefault, this.pageSize, this.filters).subscribe({
      next: (response: PaginatorModel<UserFile[], MetaFile>) => {
        this.files = response.data;
        console.log("files", this.files);
        this.totalRecords = response.meta.totalFiles;
        this.page++;
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
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
    this.filesService.getFiles(this.page, this.pageSize, this.filters).subscribe({
      next: (response: PaginatorModel<UserFile[], MetaFile>) => {
        this.files = [...this.files, ...response.data];
        this.totalRecords = response.meta.totalFiles;
        this.page++;
        this.lazyLoading = false;
      },
      error: (err) => {
        console.log('Error', err);
        this.lazyLoading = false;
      },
    });
  }
}
