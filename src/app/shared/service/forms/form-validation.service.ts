import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}

  // Verifica si un campo es válido
  isValidField(
    form: FormGroup | FormArray,
    field: string,
    index?: number,
  ): boolean | null {
    const control = this.getControl(form, field, index);

    // Si no existe el control, retorna null
    if (!control) {
      return null;
    }

    // Si el campo tiene errores y ha sido tocado, retorna true, de lo contrario false
    return control.errors && control.touched ? true : false;
  }

  // Retorna los errores personalizados de los campos
  getFieldError(
    form: FormGroup | FormArray,
    field: string,
    index?: number,
  ): string | null {
    const control = this.getControl(form, field, index);
    if (!control || !control.errors) return null;

    const errors = control.errors;

    if (errors['required']) return 'Este campo es requerido';
    if (errors['email']) return 'Ingrese un correo válido';
    if (errors['minlength'])
      return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength'])
      return `Máximo ${errors['maxlength'].requiredLength} caracteres`;

    // Por defecto, devolver el primer error encontrado
    return Object.keys(errors)[0] + ' es inválido';
  }

  // Verifica si dos valores son iguales (útil para contraseñas o confirmaciones)
  isEqual(value1: string, value2: string): boolean {
    return value1 === value2;
  }

  // Función para obtener el control del FormGroup o FormArray, considerando si es un array
  private getControl(
    form: FormGroup | FormArray,
    field: string,
    index?: number,
  ): AbstractControl | null {
    if (form instanceof FormArray && index !== undefined) {
      return form.at(index).get(field);
    } else if (form instanceof FormGroup) {
      return form.get(field);
    }
    return null;
  }
}
