import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { FormValidationService } from '@app/shared/service/forms/form-validation.service';
import { LoginService } from './login.service';
import { ToastService } from '@app/shared/service/alerts/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    ToastModule,
    TooltipModule,
    PasswordModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private formValidationService = inject(FormValidationService);
  private loginSrv = inject(LoginService);
  private toastSrvc = inject(ToastService);
  private router = inject(Router);

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email], []],
    password: ['', [Validators.required, Validators.minLength(6)], []],
  });

  public loading = signal<boolean>(false);

  isValidField(field: string): boolean | null {
    return this.formValidationService.isValidField(this.loginForm, field);
  }

  getFieldError(field: string): string | null {
    return this.formValidationService.getFieldError(this.loginForm, field);
  }

  onSave(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.value;
    this.loading.set(true);
    // Llamar al servicio AuthUserService cuando el formulario es válido
    this.loginSrv.loginUser(loginData).subscribe({
      next: (response:any) => {
        this.loading.set(false);
        this.toastSrvc.showSuccess('Éxito', 'Acceso exitoso', false);
        sessionStorage.setItem('access_token', response.message.access_token);
        // Redirigir al usuario después del login exitoso
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      },
      error: (response) => {
        this.loading.set(false);
        this.toastSrvc.showError('Error', response.error.message, false);
        // Manejar errores, mostrar mensajes, etc.
      },
    });
  }


}