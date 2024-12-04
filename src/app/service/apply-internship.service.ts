import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApplyInternshipService {
  // private apiUrl = 'http://localhost:8080/api/forms';

  constructor(private http: HttpClient) {}

  /**
   * Apply for internship by submitting form data and CV file
   * @param internshipId - The internship ID
   * @param formData - The form data (including CV file if present)
   * @returns Observable<any> - The response from the API
   */
  applyForInternship(internshipId: number, formData: FormData): Observable<any> {
    // Send POST request to the backend API
    return this.http.post(`${NAV_URL}/forms/applyForInternshipForm/${internshipId}`, formData);
  }
}
