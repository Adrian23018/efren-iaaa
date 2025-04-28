import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';

@Component({
  selector: 'app-files-tab-events',
  imports: [CommonModule],
  templateUrl: './files-tab-events.component.html',
  styleUrl: './files-tab-events.component.scss'
})
export class FilesTabEventsComponent {
  @Input() selectedFile: UserFile | null = null;

  ngAfterViewInit() {
    console.log("selectfiles : ",this.selectedFile);
  }
}
