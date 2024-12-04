// internship.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';  // Import throwError from rxjs
import { catchError } from 'rxjs/operators';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class InternshipService {
  // private apiUrl = 'http://localhost:8080/api/internships'; // Adjust base URL if different

  constructor(private http: HttpClient) {}

  createInternship(internship: any, adminId: number): Observable<any> {
    return this.http.post(`${NAV_URL}/internships/createInternship/${adminId}`, internship);
  }

  getAllInternships(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/internships/getAllInternships`);
  }

  getInternshipById(id: number): Observable<any> {
    return this.http.get(`${NAV_URL}/internships/getInternshipById/${id}`);
  }

  updateInternship(id: number, internship: any): Observable<any> {
    return this.http.put(`${NAV_URL}/internships/updateInternship/${id}`, internship);
  }

  deleteInternship(id: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/internships/deleteInternship/${id}`);
  }

  getInternshipsByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/internships/getInternshipsByStatus/${status}`);
  }

  getInternshipsByAdmin(adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/internships/getInternshipsByAdmin/${adminId}`);
  }
   // New method to fetch internships by adminId
   getInternshipsByAdminId(adminId: number): Observable<any[]> {
    const url = `${NAV_URL}/internships/getInternshipsByAdmin/${adminId}`;
    return this.http.get<any[]>(url).pipe(catchError(this.handleErrors));
  }

  // Error handler for HTTP requests
  private handleErrors(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error));  // Use throwError here
  }
}
