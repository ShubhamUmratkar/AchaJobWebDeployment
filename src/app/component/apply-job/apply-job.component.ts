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
      country: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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


  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.cvFile = input.files[0];
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
        () => {

          alert('Failed to submit application. Please try again.');
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Application submitted successfully!');
          this.router.navigate(['/']);
          console.error(error);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
