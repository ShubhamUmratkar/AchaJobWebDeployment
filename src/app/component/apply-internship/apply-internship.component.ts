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
  internshipId: number | null = null;
  fileError: string | null = null;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applyInternshipService: ApplyInternshipService
  ) {
    this.applyForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]]
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.internshipId = +params['id'];
    });
  }
 
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
    if (this.applyForm.valid && this.internshipId) {
      const formData = new FormData();
      formData.append('formData', JSON.stringify(this.applyForm.value));
 
      if (this.cvFile) {
        formData.append('cv', this.cvFile);
      }
 
      this.applyInternshipService.applyForInternship(this.internshipId, formData).subscribe(
        (response) => {
          alert('Application submitted successfully!');
          this.router.navigate(['/']);  // Redirect to homepage or a success page
        },
        (error) => {
          alert('Application submitted successfully!');
          console.error(error);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}