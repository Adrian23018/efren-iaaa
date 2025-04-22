import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { UserFile } from '@app/interfaces/files.model';
import { FilesUsersComponent } from './files-users/files-users.component';
import { Severity, TagUtil } from '@app/shared/utils/tagUtil';

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
    InputGroupModule,
    InputGroupAddonModule,
    FilesUsersComponent,
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss'
})
export class FilesComponent implements OnInit {
  selectedFile: UserFile | null = null;

  ngOnInit() {
  }

  selectFile(file: UserFile) {
    this.selectedFile = {...file};
    // console.log(this.file);
  }
  
  getTagSeverity(tag: string): Severity {
    return TagUtil.getTagSeverity(tag);
  }
}
