import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from 'src/app/model/internship.model';
import { InternshipService } from 'src/app/service/service-internship.service';

@Component({
  selector: 'app-internshipposts',
  templateUrl: './internshipposts.component.html',
  styleUrls: ['./internshipposts.component.css']
})
export class InternshippostsComponent {
  internships: Internship[] = []; // All internships fetched from the backend
  filteredInternships: Internship[] = []; // Internships after applying the filter
  loading = true; // Loading indicator
  error: string = ''; // Error handling

  filters = {
    location: '',
    minStipend: null,
    maxStipend: null,
    status: '',
    qualifications: ''
  };

  constructor(private internshipService: InternshipService,private router: Router) {}

  ngOnInit(): void {
    this.getAllInternships();
  }

  // Fetch all internships
  getAllInternships(): void {
    this.internshipService.getAllInternships().subscribe(
      (data) => {
        this.internships = data;
        this.filteredInternships = data; // Initially show all internships
        this.loading = false;
      },
      (error) => {
        this.error = 'Error fetching internships. Please try again later.';
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredInternships = this.internships.filter(internship => {
      let matches = true;
  
      // Location filter
      if (this.filters.location && !internship.location.toLowerCase().includes(this.filters.location.toLowerCase())) {
        matches = false;
      }
  
      // Stipend range filter
      if (this.filters.minStipend && internship.stipend !== undefined) {
        const stipendValue = parseFloat(internship.stipend);
        if (isNaN(stipendValue) || stipendValue < this.filters.minStipend) {
          matches = false;
        }
      }
  
      if (this.filters.maxStipend && internship.stipend !== undefined) {
        const stipendValue = parseFloat(internship.stipend);
        if (isNaN(stipendValue) || stipendValue > this.filters.maxStipend) {
          matches = false;
        }
      }
  
      // Status filter
      if (this.filters.status && internship.status !== this.filters.status) {
        matches = false;
      }
  
      // Qualifications filter
      if (this.filters.qualifications && !internship.qualifications.toLowerCase().includes(this.filters.qualifications.toLowerCase())) {
        matches = false;
      }
  
      return matches;
    });
  }
  

  // Clear all filters
  clearFilters(): void {
    this.filters = {
      location: '',
      minStipend: null,
      maxStipend: null,
      status: '',
      qualifications: ''
    };
    this.filteredInternships = this.internships; // Show all internships
  }
  


  applyForInternship(internshipId: number | undefined): void {
    if (internshipId !== undefined) {
      this.router.navigate([`/apply-internship/${internshipId}`]);
      console.log("Navigating to apply for internship with ID:", internshipId);
    } else {
      console.log("Internship ID is undefined");
    }
  }
  
}