import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';


const NAV_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
  // private apiUrl = 'http://localhost:8080/api/superAdmin'; // Adjust the port if needed

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/superAdmin/getAllAdmins`);
  }

  approveAdmin(adminId: number): Observable<string> {
    return this.http.post<string>(`${NAV_URL}/superAdmin/approveAdmin/${adminId}`, {});
  }

  disableAdmin(adminId: number): Observable<any> {
    return this.http.post<any>(`${NAV_URL}/superAdmin/disableAdmin/${adminId}`, {});
  }

  // Post management
  getAllPendingPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${NAV_URL}/superAdmin/getAllPendingPosts`);
  }

  approvePost(postId: number, isApproved: boolean): Observable<string> {
    return this.http.put<string>(`${NAV_URL}/superAdmin/approvePost/${postId}?isApproved=${isApproved}`, {});
  }

  disapprovePost(postId: number): Observable<string> {
    return this.http.put<string>(`${NAV_URL}/superAdmin/disapprovePost/${postId}`, {});
  }

  // setPremiumPrice(adminId: number, price: number): Observable<void> {
  //   return this.http.put<void>(`${NAV_URL}/superAdmin/setPremiumPrice/${adminId}`, { price });
  // }
}
