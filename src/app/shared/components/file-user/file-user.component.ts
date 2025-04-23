import { Component, Input, OnInit } from '@angular/core';
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
import { Severity, TagUtil } from '@app/shared/utils/tagUtil';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-file-user',
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
    DialogModule
  ],
  templateUrl: './file-user.component.html',
  styleUrl: './file-user.component.scss'
})
export class FileUserComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() sessionData: any;

  selectedFile: UserFile | null = null;
  showFileDialog = false;

  ngOnInit() {
    this.showFileDialog = this.display;
  }

  selectFile(file: UserFile) {
    this.selectedFile = { ...file };
    // console.log(this.file);
  }

  getTagSeverity(tag: string): Severity {
    return TagUtil.getTagSeverity(tag);
  }

 

  openFileDialog(file: any) {
    this.selectedFile = file;
    this.showFileDialog = true;
  }

}
