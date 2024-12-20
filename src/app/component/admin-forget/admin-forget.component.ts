import { Component } from '@angular/core'
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-forget',
  templateUrl: './admin-forget.component.html',
  styleUrls: ['./admin-forget.component.css']
})
export class AdminForgetComponent {
  email: string = '';
  buttonState: string = 'Send OTP'; // Initial button state
  isSubmitting: boolean = false; // To manage button state dynamically

  constructor(private adminService: AdminService, private router: Router) {}

  onSubmit() {
    this.isSubmitting = true; // Mark as submitting
    this.buttonState = 'Sending OTP'; // Update button text


    this.adminService.forgotPassword(this.email).subscribe(
      (error) => {
        // Error handling
        this.buttonState = 'Send OTP'; // Revert button text on error
        this.isSubmitting = false; // Allow retry
        alert('Error: ' + error.Message); // Show error message
      },
      response => {
        this.buttonState = 'Sent OTP'; // Update button text after success
        alert('OTP has been sent Successfully '); // Show success message
        setTimeout(() => {
        this.router.navigate(['/admin-reset-pass']);
      }, 2000); // Optional: Add delay before navigation
    });
  }
}
