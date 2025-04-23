import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';
import { Severity, TagUtil } from '@app/shared/utils/tagUtil';
import { TagModule } from 'primeng/tag';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-files-tab-summary',
  imports: [
    CommonModule,
    TagModule,
    ScrollPanelModule,
  ],
  templateUrl: './files-tab-summary.component.html',
  styleUrl: './files-tab-summary.component.scss'
})
export class FilesTabSummaryComponent {
  @Input() selectedFile: UserFile | null = null;

  getTagSeverity(tag: string): Severity {
    return TagUtil.getTagSeverity(tag);
  }
}
