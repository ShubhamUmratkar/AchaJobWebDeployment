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

  constructor(private mockInterviewService: AdminService) {}

  ngOnInit(): void {
    this.fetchAllMockInterviews();
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
