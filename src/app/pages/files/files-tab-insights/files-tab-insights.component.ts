import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';

@Component({
  selector: 'app-files-tab-insights',
  imports: [
    CommonModule,
  ],
  templateUrl: './files-tab-insights.component.html',
  styleUrl: './files-tab-insights.component.scss'
})
export class FilesTabInsightsComponent {
  @Input() selectedFile: UserFile | null = null;
}
