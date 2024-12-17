import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

interface mockInterviews {
  id: number;
  text: string;
  hyperlink: string;
}
 

@Component({
  selector: 'app-user-mockinterview',
  templateUrl: './user-mockinterview.component.html',
  styleUrls: ['./user-mockinterview.component.css']
})
export class UserMockinterviewComponent implements OnInit {
  mockInterviews: any[] = [];
  selectedMockInterview: any = null; // To store details of a selected placement
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedMockInterviewDetails: mockInterviews | null = null;
 
  constructor(private adminService: AdminService, private router: Router) {}
 
  ngOnInit(): void {
    this.fetchMockInterviews();
  }
 
  fetchMockInterviews(): void {
    this.isLoading = true;
    this.adminService.getAllMockInterviews().subscribe({
      next: (data) => {
        this.mockInterviews = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load mock interviews. Please try again later.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }
 
  // Fetch details of a specific placement by ID
  fetchMockInterviewById(id: number): void {
    this.isLoading = true;
    this.adminService.getMockInterviewById(id).subscribe({
      next: (data) => {
        this.selectedMockInterview = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = `Failed to fetch mock-interview with ID ${id}.`;
        console.error('Error fetching mock-interview:', error);
        this.isLoading = false;
      }
    });
  }
 
  // Handle Details Button Click
  onDetailsButtonClick(placementId: number) {
    if (this.selectedMockInterview === placementId) {
      this.clearDetails();
    } else {
      this.selectedMockInterview = placementId;
      this.selectedMockInterviewDetails = this.mockInterviews.find(
        (mockInterviews) => mockInterviews.id === placementId
      ) || null;
    }
  }
 
  // Clear Details
  clearDetails() {
    this.selectedMockInterview = null;
    this.selectedMockInterviewDetails = null;
  }
 
  // Navigate back to the homepage
  navigateToHomepage(): void {
    this.router.navigate(['/']); // Adjust route to your homepage
  }
}