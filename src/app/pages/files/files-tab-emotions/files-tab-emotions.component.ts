import { Component, Input } from '@angular/core';
import { UserFile } from '@app/interfaces/files.model';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-files-tab-emotions',
  imports: [ChipModule,CommonModule],
  templateUrl: './files-tab-emotions.component.html',
  styleUrl: './files-tab-emotions.component.scss'
})
export class FilesTabEmotionsComponent {
  @Input() selectedFile: UserFile | null = null;

  ngAfterViewInit() {
  }


  getEmotionClass(emotion: string): string {
    switch (emotion.toLowerCase()) {
      case 'alegría':
        return 'bg-green-100 text-green-800';
      case 'ansiedad':
      case 'estrés':
      case 'frustración':
        return 'bg-red-100 text-red-800';
      case 'sorpresa':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
  

}
