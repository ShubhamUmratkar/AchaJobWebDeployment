// internship.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { InternshipService } from 'src/app/service/service-internship.service';


@Component({
  selector: 'app-internship',
  templateUrl: './internship.component.html',
  styleUrls: ['./internship.component.css']
})
export class InternshipComponent implements OnInit {
  internshipForm!: FormGroup;
  internships: any[] = [];
  selectedInternship: any = null;
  adminId: number = 0; // Initially null
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private internshipService: InternshipService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.internshipForm = this.fb.group({
      id:[''],
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      duration: [''],
      stipend: [''],
      qualifications: ['', Validators.required],
      skills: [''],
      description: [''],
      status: ['', Validators.required],
      openingStartDate: [''],
      lastApplyDate: [''],
      numberOfOpenings: [null],
      perks: [''],
      companyDescription: [''],
    });
    // Retrieve adminId from localStorage after login
    const storedAdminId = localStorage.getItem('adminId');
    if (storedAdminId) {
      this.adminId = parseInt(storedAdminId, 10); // Convert to number
      this.fetchInternships();
    } else {
      // Handle case where adminId is not available, e.g., redirect to login page
      this.errorMessage = 'You must be logged in to manage jobs.';
      // Optionally redirect to the login page
      // this.router.navigate(['/login']);
    }

    console.log("AdminID:@@@@@@@@@@@@@@@",this.adminId);
  }

  // Update fetchInternships to use the method that fetches internships by adminId
  fetchInternships(): void {
    if (this.adminId) {
      this.internshipService.getInternshipsByAdminId(this.adminId).subscribe(
        (data) => {
          this.internships = data;
          console.log('No insternship Fetch');
        },
        (error) => {
          this.errorMessage = 'Error fetching internships. Please try again later.';
          console.error('Error fetching internships: ', error);
        }
      );
    } else {
      this.errorMessage = 'Admin ID is not set.';
    }
  }

  createInternship(): void {
    if (this.internshipForm.valid) {
      const internshipData = this.internshipForm.value;
      alert('Waiting for Super-Admin Approvel');
      this.adminService.postInternship(this.adminId, internshipData).subscribe(() => {
        this.fetchInternships();
        this.resetForm();
      });
    }
  }

  selectInternship(internship: any): void {
    this.selectedInternship = internship;
    this.internshipForm.patchValue(internship);
  }

  updateInternship(): void {
    if (this.selectedInternship && this.internshipForm.valid) {
      alert('Post Updated Successfully');
      this.internshipService.updateInternship(this.selectedInternship.id, this.internshipForm.value).subscribe(() => {
        this.fetchInternships();
        this.internshipForm.reset();
        this.selectedInternship = null;
      });
    }
  }

  deleteInternship(id: number): void {
    alert('Post Deleted Successfully');
    this.internshipService.deleteInternship(id).subscribe(() => {
      this.fetchInternships();
    });
    this.fetchInternships();
  }

  resetForm(): void {
    this.internshipForm.reset();
    this.selectedInternship = null;
  }
}
