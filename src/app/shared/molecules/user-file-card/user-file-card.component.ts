import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFile } from '@app/interfaces/files.model';
import { Severity, TagUtil } from '@app/shared/utils/tagUtil';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'molecule-user-file-card',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './user-file-card.component.html',
  styleUrl: './user-file-card.component.scss'
})
export class UserFileCardComponent {
  @Input() file!: UserFile;
  @Input() selected: boolean = false;
  @Output() fileSelected = new EventEmitter<UserFile>();

  selectFile() {
    this.fileSelected.emit(this.file);
  }

  getTagSeverity(tag: string): Severity {
    return TagUtil.getTagSeverity(tag);
  }
}