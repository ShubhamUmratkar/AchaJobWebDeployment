import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../model/user';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseUrl = 'http://localhost:8080/api/users';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken()); // Initialized with token check
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Expose as observable to subscribe to login status

  constructor(private http: HttpClient) { }

  // Register a new user
  registerUser(user: User): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${NAV_URL}/users/user/register`, user, { headers, responseType: 'text' })
      .pipe(
        map((response: string) => {
          console.log('Registration response:', response);
          return { success: true, message: response };
        }),
        catchError((error) => {
          console.error('Registration failed', error);
          // Return the specific error message if available, otherwise return a generic message
          const errorMessage = error.error || 'Registration failed. Please try again later.';
          return throwError(() => errorMessage);
        })
      );
  }

  // Login user
  loginUser(userName: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { userName, password };

    return this.http.post(`${NAV_URL}/users/user/login`, body, { headers, responseType: 'text' })
      .pipe(
        map((response: string) => {
          console.log('Login response:', response);
          if (response === 'Login successful.') {
            this.setLoggedIn(true);
          }
          return response;
        }),
        catchError((error) => {
          console.error('Login failed', error);
          const errorMessage = error.error || 'Login failed. Please try again later.';
          return throwError(() => errorMessage);
        })
      );
  }

  // Fetch all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${NAV_URL}/users/getAllUsers`)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch users', error);
          return throwError(() => 'Failed to fetch users. Please try again later.');
        })
      );
  }

  // Check if user is logged in
  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Update logged-in status
  private setLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);
    if (status) {
      localStorage.setItem('currentUser', 'loggedIn');
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  // Logout user
  logout(): void {
    console.log('Logging out...');
    this.setLoggedIn(false);
  }
}
