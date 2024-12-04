import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userData: any = null;

  constructor() { }

  login(username: string, password: string): boolean {
    console.log('Login attempt:', username, password); // Debugging login attempt
    if (username === 'user' && password === 'password') {
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
  }

  setUserData(userData: any) {
    this.userData = userData;
    localStorage.setItem('currentUser', JSON.stringify(userData)); // Optionally sync with localStorage
  }

  getUserData() {
    return this.userData;
  }
}
