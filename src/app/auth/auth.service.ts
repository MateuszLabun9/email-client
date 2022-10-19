import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

interface UsernameAvailableResponse {
  available: boolean; //Because from API we are getting response like that { "available": True }
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SingedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rooturl = 'https://api.angular-email.com';
  singedIn$ = new BehaviorSubject(false); // Community convention to add $ whenever there is a variable which is observable

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    //http req to check if username is available
    return this.http.post<UsernameAvailableResponse>(
      `${this.rooturl}/auth/username`,
      {
        username: username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rooturl}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          // if there would be an error comming back from observable which is this post request we are going to skip this tap statement.
          this.singedIn$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http
      .get<SingedinResponse>(`${this.rooturl}/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          //SingedinResponse have authenticated property and we here need just this one, so we do destructuring
          this.singedIn$.next(authenticated);
        })
      );
  }

  signout() {
    return this.http.post(`${this.rooturl}/auth/signout`, {}).pipe(
      tap(() => {
        this.singedIn$.next(false); //if we get to this tap statement, means that post from above was succesful
        //if it was succesful it means that we are now logged out
      })
    );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post(`${this.rooturl}/auth/signin`, credentials).pipe(
      tap(() => {
        this.singedIn$.next(true);
      })
    );
  }
}
