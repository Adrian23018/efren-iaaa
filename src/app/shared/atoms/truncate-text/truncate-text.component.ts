import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'atom-truncate-text',
  imports: [CommonModule, TooltipModule],
  templateUrl: './truncate-text.component.html',
  styleUrl: './truncate-text.component.scss'
})
export class AtomTruncateTextComponent {
  @Input() text: string = '';
  @Input() limit: number = 30;
  @Input() maxWidth: number = 150;
  @Input() showTooltip: boolean = true;
}
