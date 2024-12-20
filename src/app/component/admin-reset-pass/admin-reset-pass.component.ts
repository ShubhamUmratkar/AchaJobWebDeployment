import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-reset-pass',
  templateUrl: './admin-reset-pass.component.html',
  styleUrls: ['./admin-reset-pass.component.css']
})
export class AdminResetPassComponent {
  email: string = '';
  otp: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  onSubmit() {
    const passwordResetRequest = {
      otp: this.otp,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.adminService.resetPassword(this.email, passwordResetRequest).subscribe(
      error => {
        alert('Error: ' + error.message);
      },
      response => {
        alert('Password Reset Successfully');
        this.router.navigate(['/adminlogindynamic']); // Redirect to login page
      }
    );
  }
}
