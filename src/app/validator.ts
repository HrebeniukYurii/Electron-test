import { AbstractControl, ValidationErrors } from '@angular/forms';

export const noWhitespaceValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const isValid = control.value === '' || control.value?.trim().length > 0;
  debugger;
  return isValid ? null : { whitespace: true };
};
