import { Component } from '@angular/core';
import { FormService } from 'src/app/service/form.service'; // Assuming FormService is used for API calls
import { JobService } from 'src/app/service/job.service'; // New service for jobs and internships
import { InternshipService } from 'src/app/service/service-internship.service';

@Component({
  selector: 'app-view-all-forms-admin',
  templateUrl: './view-all-forms-admin.component.html',
  styleUrls: ['./view-all-forms-admin.component.css']
})
export class ViewAllFormsAdminComponent {
  forms: any[] = [];  // Forms list
  jobs: any[] = [];   // Jobs list
  internships: any[] = []; // Internships list
  selectedForm: any = null;

  constructor(private formService: FormService, private jobService: JobService,private internshipsService: InternshipService) {}

  ngOnInit(): void {
    this.fetchForms();
  }

  fetchForms(): void {
    this.formService.getAllForms().subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  fetchJobs(): void {
    const adminId = 1; // Replace with the actual adminId
    this.jobService.getJobsByAdmin(adminId).subscribe(
      (data) => {
        this.jobs = data;
        this.internships = []; // Clear internships if displayed
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  fetchInternships(): void {
    const adminId = 1; // Replace with the actual adminId
    console.log(adminId)
    this.internshipsService.getInternshipsByAdmin(adminId).subscribe(
      (data) => {
        this.internships = data;
        this.jobs = []; // Clear jobs if displayed
      },
      (error) => {
        console.error('Error fetching internships:', error);
      }
    );
  }

  viewFormDetails(form: any): void {
    this.selectedForm = form;
  }
}
