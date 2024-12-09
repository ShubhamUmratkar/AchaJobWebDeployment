import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyJobService } from 'src/app/service/apply-job.service';


@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  applyForm: FormGroup;
  cvFile: File | null = null;
  jobId: number | null = null;  // Initialize jobId
  fileError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applyJobService: ApplyJobService
  ) {
    this.applyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]], // Accepts only alphabets and spaces
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Only 10-digit numbers
      location: ['', Validators.required]
    });
  }





  ngOnInit(): void {
    // Capture the jobId from the route parameter
    this.route.params.subscribe(params => {
      this.jobId = +params['id'];  // Convert the id parameter to a number
      console.log("JOB ID@@@@@@@@@@@@@@@@@@@@@@@@@", this.jobId); // Debugging output
    });
  }


  // Handle CV file selection
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      if (allowedTypes.includes(file.type)) {
        this.cvFile = file;
        this.fileError = null;
      } else {
        this.cvFile = null;
        this.fileError = 'Only DOC, DOCX, and PDF files are allowed.';
    }
  }
}

  onSubmit(): void {
    if (this.applyForm.valid && this.jobId) {
      const formData = new FormData();
      formData.append('formData', JSON.stringify(this.applyForm.value));

      if (this.cvFile) {
        formData.append('cv', this.cvFile);
      }

      this.applyJobService.submitApplication(this.jobId, formData).subscribe(
        (error) => {
          alert('Failed to submit application. Please try again.');
          console.error(error);
        },
        (response) => {
          console.log('Application Submitted Successfully', response);
          alert('Application submitted successfully!');
          this.router.navigate(['/']);  // Redirect to homepage or a success page
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
