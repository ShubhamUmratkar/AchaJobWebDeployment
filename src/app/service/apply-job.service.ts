import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ApplyJobService {
  // private baseUrl = 'http://localhost:8080/api/forms';  // Adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Fetch form details for a single form ID
  getFormDetails(formId: number): Observable<any> {
    const url = `${NAV_URL}/${formId}`;
    return this.http.get<any>(url);
  }

  // Fetch form details for multiple form IDs
  getFormDetailsByIds(formIds: number[]): Observable<any[]> {
    return forkJoin(formIds.map((id) => this.getFormDetails(id)));
  }

  // Download CV for a specific form
  downloadCv(formId: number): Observable<Blob> {
    const url = `${NAV_URL}/forms/downloadCv/${formId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  // Submit a job application
  submitApplication(jobId: number, formData: FormData): Observable<any> {
    const url = `${NAV_URL}/forms/applyForJobForm/${jobId}`;
    return this.http.post<any>(url, formData);
  }
}
