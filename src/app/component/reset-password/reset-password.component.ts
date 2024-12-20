import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import ActivatedRoute to access route parameters
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordResetRequest, UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent  {
  userEmail!: string;
  password!: string;
  confirmPassword!: string;
  otp!: string;
  errorMessage!: string;
  successMessage!: string;

  constructor(
    private passwordResetService: UserService,
    private router: Router
  ) { }

  resetPassword() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const requestBody: PasswordResetRequest = {
      password: this.password,
      confirmPassword: this.confirmPassword,
      otp: this.otp
    };

    this.passwordResetService.resetPassword(this.userEmail, requestBody).subscribe({
      
      next: (error) => {
        this.errorMessage = error.error || 'An unexpected error occurred.';
      },
      error: (response) => {
        this.successMessage = response;
        alert('Password Reset Successfully');
        this.router.navigate(['/login']);

      }
    });
  }

    // Method to navigate to the home page
    navigateToHome() {
      this.router.navigate(['/']); // You can adjust the route as needed
    }
}