import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';

@Component({
  selector: 'app-files-tab-events',
  imports: [],
  templateUrl: './files-tab-events.component.html',
  styleUrl: './files-tab-events.component.scss'
})
export class FilesTabEventsComponent {
  @Input() selectedFile: UserFile | null = null;
}
