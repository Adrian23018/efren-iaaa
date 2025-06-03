import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserFile } from '@app/interfaces/files.model';
import { ButtonModule } from 'primeng/button';
import { FilesService } from '../files.service';
import { ToastService } from '@app/shared/service/alerts/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-files-tab-notes',
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, ToastModule,],
  templateUrl: './files-tab-notes.component.html',
  styleUrl: './files-tab-notes.component.scss'
})
export class FilesTabNotesComponent implements OnInit,OnChanges {
  @Input() selectedFile: UserFile | null = null;
  noteForm!: FormGroup;
  private fileSrv = inject(FilesService);
  private formBuilder = inject(FormBuilder);
  private toastSrvc = inject(ToastService);

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      note: ['', Validators.required]
    });
  }

   // Este sí detecta cuando el padre cambia selectedFile
   ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFile'] && this.selectedFile && this.noteForm) {
      this.noteForm.patchValue({
        note: this.selectedFile.notes || ''
      });
    }
  }

  ngAfterViewInit() {
    if (this.selectedFile?.notes) {
      this.noteForm.get('note')?.setValue(this.selectedFile.notes);
    }
  }

  // Cada vez que cambia de expediente
  updateNoteFromSelectedFile() {
    this.noteForm.patchValue({
      note: this.selectedFile?.notes || ''
    });
  }


  saveNote() {
    if (this.noteForm.valid && this.selectedFile?.weekly_session_id) {
      const noteContent = this.noteForm.value.note;
      this.fileSrv.updateFiles(this.selectedFile?.weekly_session_id, this.noteForm.value.note).data$.subscribe({
        next: (file: any) => {
          this.toastSrvc.showSuccess('Éxito', file.message, false);
        },
        error: (error) => {
          this.toastSrvc.showError('Error', 'No se ha podidio guardar', false);
        }
      });
    }
  }

}
