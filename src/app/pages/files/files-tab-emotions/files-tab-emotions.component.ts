import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';

@Component({
  selector: 'app-files-tab-emotions',
  imports: [],
  templateUrl: './files-tab-emotions.component.html',
  styleUrl: './files-tab-emotions.component.scss'
})
export class FilesTabEmotionsComponent {
  @Input() selectedFile: UserFile | null = null;
}
