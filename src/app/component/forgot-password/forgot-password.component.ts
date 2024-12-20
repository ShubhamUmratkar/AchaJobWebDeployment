import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  
  forgotPasswordForm!: FormGroup;
  submitted = false;
  emailSentSuccess = false;
  emailSentFailed = false;
  errorMessage = '';
  buttonState: string = 'Send OTP'; // Initial button state
  email: string = '';
  isSubmitting: boolean = false; // To manage button state dynamically

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Getter for form controls
  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmitForgotPassword(): void {
    this.submitted = true;
    this.isSubmitting = true; // Mark as submitting
    this.buttonState = 'Sending OTP'; // Update button text


    // Stop if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // Get the email value from the form
    const email = this.f['email'].value;

    // Call the userService with the email value from the form
    this.userService.forgotPassword(email).subscribe(
      (error: any) => {
   
     
        this.emailSentSuccess = false;
        this.emailSentFailed = true;
        if (error.status === 404) {
          this.errorMessage = `User not found with email: ${email}`;
        } else {
          this.errorMessage = 'An error occurred while processing the request.';
        }
      },
      (response) => {
        console.log(response);
        this.emailSentSuccess = true;
        this.emailSentFailed = false;
        this.errorMessage = '';

        this.buttonState = 'Sent OTP'; // Update button text after success
        alert('OTP has been sent Successfully '); // Show success message
        setTimeout(() => {
          this.router.navigate(['/reset-password']);
      }, 2000); // Optional: Add delay before navigation
    });
  }

  // Navigate to home page (you can add navigation logic here)
  navigateToHome(): void {
    this.router.navigate(['/login']);
  }
}