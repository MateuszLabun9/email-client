import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rooturl = 'https://api.angular-email.com';

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
    return this.http.post<SignupResponse>(
      `${this.rooturl}/auth/signup`,
      credentials
    );
  }
}
