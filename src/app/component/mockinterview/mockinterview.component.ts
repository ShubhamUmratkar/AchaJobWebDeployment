// src/app/mockinterview/mockinterview.component.ts

import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
@Component({
  selector: 'app-mockinterview',
  templateUrl: './mockinterview.component.html',
  styleUrls: ['./mockinterview.component.css']
})
export class MockInterviewComponent implements OnInit {
  mockInterviews: any[] = [];
  mockInterview = { id: null, text: '', hyperlink: '' };
  editing = false;
  adminId: number = 0; // Initially null
  errorMessage: string | null = null;
  sidebarOpen = false;

  constructor(private mockInterviewService: AdminService) {}

  ngOnInit(): void {
    this.fetchAllMockInterviews();

         // Retrieve adminId from localStorage after login
         const storedAdminId = localStorage.getItem('adminId');
         if (storedAdminId) {
           this.adminId = parseInt(storedAdminId, 10); // Convert to number
    
         } else {
           // Handle case where adminId is not available, e.g., redirect to login page
           this.errorMessage = 'You must be logged in to manage jobs.';
           // Optionally redirect to the login page
           // this.router.navigate(['/login']);
         }
  }

  fetchAllMockInterviews(): void {
    this.mockInterviewService.getAllMockInterviews().subscribe((data) => {
      this.mockInterviews = data;
    });
  }

  createMockInterview(): void {
    this.mockInterviewService.createMockInterview(this.mockInterview).subscribe(() => {
      this.fetchAllMockInterviews();
      this.resetForm();
    });
  }

  editMockInterview(mockInterview: any): void {
    this.mockInterview = { ...mockInterview };
    this.editing = true;
  }

  updateMockInterview(): void {
    if (this.mockInterview.id) {
      this.mockInterviewService.updateMockInterview(this.mockInterview.id, this.mockInterview).subscribe(() => {
        this.fetchAllMockInterviews();
        this.resetForm();
      });
    }
  }

  deleteMockInterview(id: number): void {
    this.mockInterviewService.deleteMockInterview(id).subscribe(() => {
      this.fetchAllMockInterviews();
    });
  }

  resetForm(): void {
    this.mockInterview = { id: null, text: '', hyperlink: '' };
    this.editing = false;
  }
}
