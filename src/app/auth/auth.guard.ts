import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  
  constructor( private authService: AuthService, private router: Router) {}
  
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.singedIn$.pipe(

      //Problem in guard with observables is because guard will allow user to go to /index only when
      //observable will be set as completed, which we dont want to do, because we use this observbable in many places
      //To make "fake" complete we use take function which DOES NOT CHANGE state of observable, but it tricks subscribers
      //to think that this one is completed. 
      //Another issue here is that we are checking auth in app.js and would need to check it in guard as well, 
      //but we dont want to check it in several places because it can couse some issues, when guard will not let loged user
      //To improwe it, we will set default state of observable to null, and when doing checkAuth we will set it to true or false
      //take function with 1 as an argument will trick subscribers that observable is complete after 1 change of state,
      //and because of that we are using skipWhile which is checking if value of singedIn is different than null, 
      //if it is, we are jumping to take, and trick subscribers that observable is completed
      // (real state of observable is not changed by take)
      skipWhile(value => value === null),// default singedIn is null - so this is before check made in checkAuth in App js
      take(1),
      tap((authenticated)=> {
        if (!authenticated){
          this.router.navigateByUrl('/');  //if we get to this tap statement, means that we were not authenticated,
          //this filed is from singedIn response
        }
      })
    );
  }
}
