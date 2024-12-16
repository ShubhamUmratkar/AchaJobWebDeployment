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

  loginUser(userName: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { userName, password };
  
    return this.http.post(`${NAV_URL}/users/user/login`, body, { headers })
      .pipe(
        map((response: any) => {
          console.log('Login response:', response);
          if (response && response.id) {
            this.setLoggedIn(true);
            localStorage.setItem('user', JSON.stringify(response)); // Save user data
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

  private hasToken(): boolean {
    return !!localStorage.getItem('currentUser'); // Check for a key, adjust if storing tokens
  }
  

  private setLoggedIn(status: boolean): void {
    console.log('Setting logged-in state to:', status);
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

 // Method to update user profile
 updateUserProfile(userId: number, user: User): Observable<string> {  // Changed return type to Observable<string>
  return this.http.put<string>(`${NAV_URL}/users/user/update/${userId}`, user);
}
  
  
}
