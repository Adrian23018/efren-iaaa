import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';

@Component({
  selector: 'app-files-tab-notes',
  imports: [],
  templateUrl: './files-tab-notes.component.html',
  styleUrl: './files-tab-notes.component.scss'
})
export class FilesTabNotesComponent {
  @Input() selectedFile: UserFile | null = null;
}
