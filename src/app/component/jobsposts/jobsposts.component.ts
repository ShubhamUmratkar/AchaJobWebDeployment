import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-jobsposts',
  templateUrl: './jobsposts.component.html',
  styleUrls: ['./jobsposts.component.css']
})
export class JobspostsComponent {


  jobs: Job[] = [];  // All jobs fetched from the backend
  filteredJobs: Job[] = [];  // Jobs after applying the filter
  loading = true;  // A loading indicator to show while data is being fetched
  error: string = '';  // For error handling

  filters = {
    location: '',
    minSalary: null,
    maxSalary: null,
    workMode: '',
    experience: '',
    employmentType: '' // Add this to the filter object
  };

  constructor(private jobService: JobService, private router: Router) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  // Fetch all jobs from the backend API (no filters applied initially)
  getAllJobs(): void {
    this.jobService.getAllJobs().subscribe(
      (data) => {
        this.jobs = data;
        this.filteredJobs = data;  // Initially, show all jobs
        this.loading = false;
      },
      (error) => {
        this.error = 'Error fetching jobs. Please try again later.';
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.filteredJobs = this.jobs.filter(job => {
      let matches = true;
  
      // Location Filter
      if (this.filters.location && !job.location.toLowerCase().includes(this.filters.location.toLowerCase())) {
        matches = false;
      }
  
      // Salary Range Filter
      if (this.filters.minSalary && job.salary < this.filters.minSalary) {
        matches = false;
      }
      if (this.filters.maxSalary && job.salary > this.filters.maxSalary) {
        matches = false;
      }
  
      // Work Mode Filter
      if (this.filters.workMode) {
        const validWorkModes = ["Remote", "On-site", "Hybrid", "WFH", "WFO"];
        if (validWorkModes.includes(this.filters.workMode)) {
          if (job.workModel !== this.filters.workMode) {
            matches = false;
          }
        } else {
          matches = false; // Invalid work mode
        }
      }
  
      // Experience Filter
      if (this.filters.experience) {
        if (this.filters.experience === '5+ years') {
          const jobExperience = this.getExperienceInYears(job.experience);
          if (jobExperience < 5) {
            matches = false;
          }
        } else {
          const experienceRange = this.filters.experience.split('-').map(val => parseInt(val.trim()));
          if (experienceRange.length === 2) {
            const minExperience = experienceRange[0];
            const maxExperience = experienceRange[1];
            const jobExperience = this.getExperienceInYears(job.experience);
            if (jobExperience < minExperience || jobExperience > maxExperience) {
              matches = false;
            }
          }
        }
      }

      // Employment Type Filter (new filter)
      if (this.filters.employmentType && job.employmentType !== this.filters.employmentType) {
        matches = false;
      }
  
  
      return matches;
    });
  }
  

  // Helper method to extract years of experience from the job's experience string (e.g., "2 years")
  getExperienceInYears(experience: string): number {
    const experienceYears = experience.match(/\d+/); // Extract the number part from the string (e.g., "2" from "2 years")
    return experienceYears ? parseInt(experienceYears[0]) : 0;  // Return the number of years
  }

  // Method to clear all filters
  clearFilters(): void {
    this.filters = {
      location: '',
      minSalary: null,
      maxSalary: null,
      workMode: '',
      experience: '',
      employmentType: '' // Reset employmentType when clearing filters
    };
    this.filteredJobs = this.jobs;  // Show all jobs again after clearing filters
  }

  // Navigate to the job application page when the user clicks "Apply Now"
  onApplyNow(jobId: number): void {
    this.router.navigate([`/apply-job/${jobId}`]);
    console.log("Navigating to apply for job with ID:", jobId);
  }
}