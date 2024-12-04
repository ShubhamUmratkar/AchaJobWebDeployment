import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../model/job.model';
import { environment } from '../environment/environment';

const NAV_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class JobService {
  // private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) {}

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${NAV_URL}/jobs/getJobById/${id}`);
  }


  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${NAV_URL}/jobs/getAllJobs`);
  }


  saveJob(adminId: number, job: Job): Observable<Job> {
    return this.http.post<Job>(`${NAV_URL}/jobs/saveJob/${adminId}`, job);
  }

  searchJobs(searchParams: any): Observable<Job[]> {
    let params = new HttpParams();

    // Dynamically add non-empty search parameters to HttpParams
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) {
        params = params.append(key, searchParams[key]);
      }
    });

    return this.http.get<Job[]>(`${NAV_URL}/jobs/searchJobs`, { params });
  }

  // Other method examples for any other API requests if required (e.g., delete job, etc.)
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${NAV_URL}/jobs/deleteJobById/${jobId}`);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${NAV_URL}/jobs/updateJob/${id}`, job);
  }
   getJobsByAdmin(adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/jobs/getJobsByAdmin/${adminId}`);
  }
}
