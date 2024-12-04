import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { ApplyInternshipService } from 'src/app/service/apply-internship.service';


@Component({
  selector: 'app-apply-internship',
  templateUrl: './apply-internship.component.html',
  styleUrls: ['./apply-internship.component.css']
})
export class ApplyInternshipComponent {
  applyForm: FormGroup;
  cvFile: File | null = null;
  internshipId: number | null = null;  // Initialize internshipId

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applyInternshipService: ApplyInternshipService  // Use ApplyInternshipService
  ) {
    this.applyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Capture the internshipId from the route parameter
    this.route.params.subscribe(params => {
      this.internshipId = +params['id'];  // Convert the id parameter to a number
      console.log("INTERNSHIP ID@@@@@@@@@@@@@@@@@@@@@@@@@", this.internshipId); // Debugging output
    });
  }

  // Handle CV file selection
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.cvFile = input.files[0];  // Assign selected file to cvFile
    }
  }

  // Submit the application form
  onSubmit(): void {
    if (this.applyForm.valid && this.internshipId) {
      const formData = new FormData();
      formData.append('formData', JSON.stringify(this.applyForm.value));  // Append form data as JSON

      // If a CV file is selected, append it to the formData
      if (this.cvFile) {
        formData.append('cv', this.cvFile);
      }

      // Call the ApplyInternshipService to submit the internship application
      this.applyInternshipService.applyForInternship(this.internshipId, formData).subscribe(
        (response) => {
          alert('Application submitted successfully!');
          this.router.navigate(['/']);  // Redirect to homepage or a success page
        },
        (error) => {
          alert('Application not submitted.');
          console.error(error);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
