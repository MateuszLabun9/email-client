import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          //first arg is default, secon array are synchronous validators, third arg-another array is an asynchronous validators
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
        [this.uniqueUsername.validate] //anyc validator here
        //Angular is firstly runnign all sync validators, if any one fails, angular is not calling async validators. If every sync validator pass,
        //Angular is invoking an async validator!
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService
      .signup(this.authForm.value) //this is returning observable -gotcha here we need to subscribe first, if not post req would not work
      .subscribe({
        next: (response) => {
          //Navigate to some other route
          this.router.navigateByUrl('/inbox');
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
  }
}
