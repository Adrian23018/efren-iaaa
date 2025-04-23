import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';

@Component({
  selector: 'app-files-tab-insights',
  imports: [],
  templateUrl: './files-tab-insights.component.html',
  styleUrl: './files-tab-insights.component.scss'
})
export class FilesTabInsightsComponent {
  @Input() selectedFile: UserFile | null = null;
}
