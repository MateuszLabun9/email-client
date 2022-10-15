import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' }) //To enable dependency injection system, which we need to invoke httpclient from constructor which we
//need to send POST request
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {} //dependency injection

  validate = (control: AbstractControl) => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
        //here we want to return new observable object which would provide that user made wrong input
        if (err.error.username) {
          return of({ nonUniqueUsername: true }); // of operator is a shortcut in creating new obserwable
        } else {
          return of({ noConnection: true }); // when there is no connection error has to be different than nonUniqueUsername
        }
      })
    );
  };
}

//: Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
