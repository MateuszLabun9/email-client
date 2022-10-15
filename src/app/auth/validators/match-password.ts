import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' }) //Angular dependency Injection to get this method injected in custom validators in signup.components.ts
export class MatchPassword implements Validator {
  validate(formGroup: AbstractControl): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}
