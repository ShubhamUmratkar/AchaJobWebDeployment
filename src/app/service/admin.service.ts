// src/app/admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Admin } from '../model/admin.model';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // private baseUrl = 'http://localhost:8080/api/admin'; // Backend API URL
  adminNameSubject: any;

  constructor(private http: HttpClient) {}

  registerAdmin(admin: Admin): Observable<any> {
    return this.http.post(`${NAV_URL}/admin/registerAdmin `,admin);
  }



  /**
   * Login Admin
   * @param username - Admin username
   * @param password - Admin password
   * @returns Observable<string>
   */
  loginAdmin(username: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${NAV_URL}/admin/loginAdmin`, { username, password });
  }


  /**
   * Fetch admin by ID
   * @param adminId - Admin ID
   * @returns Observable<Admin>
   */
  getAdminById(adminId: number): Observable<any> {
    return this.http.get(`${NAV_URL}/admin/getAdminById/${adminId}`).pipe(catchError(this.handleError('getAdminById')));
  }


  // Error handling helper
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      console.error(`${operation} failed:`, error);
      return throwError(() => new Error(`${operation}: ${error.message || 'unknown error'}`));
    };
  }

  setAdminName(name: string): void {
    this.adminNameSubject.next(name);
  }

  // Get the admin's username
  getAdminName() {
    return this.adminNameSubject.asObservable(); // Returns an observable
  }
  private handleErrors(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error) {
        errorMessage += `\nDetails: ${error.error}`;
      }
    }
    return throwError(errorMessage);
  }

  postJob(adminId: number, job: any): Observable<string> {
    const url = `${NAV_URL}/admin/JobPost/${adminId}`;
    return this.http.post<string>(url, job).pipe(catchError(this.handleErrors));
  }

  postInternship(adminId: number, internship: any): Observable<string> {
    const url = `${NAV_URL}/admin/postInternship/${adminId}`;
    return this.http.post<string>(url, internship).pipe(catchError(this.handleErrors));
  }

  deleteJob(adminId: number, postId: number): Observable<string> {
    const url = `${NAV_URL}/admin/deleteJobPost/${adminId}/${postId}`;
    return this.http.delete(url, { responseType: 'text' });  // Specify responseType as 'text'
  }

  createMockInterview(mockInterview: any): Observable<any> {
    return this.http.post(`${NAV_URL}/admin/mockInterview/createMockInterview`, mockInterview);
  }
  getMockInterviewById(id: number): Observable<any> {
    return this.http.get(`${NAV_URL}/admin/mockInterview/getMockInterviewById/${id}`);
  }

  getAllMockInterviews(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/admin/mockInterview/getAllMockInterviews`);
  }

  updateMockInterview(id: number, mockInterview: any): Observable<any> {
    return this.http.put(`${NAV_URL}/admin/mockInterview/updateMockInterview/${id}`, mockInterview);
  }

  deleteMockInterview(id: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/admin/mockInterview/deleteMockInterview/${id}`);
  }


  createPlacement(placement: any): Observable<any> {
    return this.http.post(`${NAV_URL}/admin/placement/createPlacement`, placement);
  }

  getPlacementById(id: number): Observable<any> {
    return this.http.get(`${NAV_URL}/admin/placement/getPlacementById/${id}`);
  }

  getAllPlacements(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/admin/placement/getAllPlacements`);
  }

  updatePlacement(id: number, placement: any): Observable<any> {
    return this.http.put(`${NAV_URL}/admin/placement/updatePlacement/${id}`, placement);
  }

  deletePlacement(id: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/admin/placement/deletePlacement/${id}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${NAV_URL}/admin/admin/forgotPassword/${email}`, {});
  }
  resetPassword(email: string, passwordResetRequest: any): Observable<any> {
    return this.http.post(`${NAV_URL}/admin/admin/resetPassword/${email}`, passwordResetRequest);
  }


    // Method to get admin by ID
    getAdminByIdInBackEnd(adminId: number): Observable<Admin> {
      return this.http.get<Admin>(`${NAV_URL}/admin/getAdminById/${adminId}`);
    }
  
  /**
   * Update admin by ID
   * @param adminId - Admin ID
   * @param adminData - Updated admin data
   */
  updateAdmin(adminId: number, adminData: Partial<Admin>): Observable<any> {
    const url = `${NAV_URL}/admin/updateAdmin/${adminId}`;
    return this.http.put(url, adminData).pipe(catchError(this.handleError('updateAdmin')));
  }

  
  
}
