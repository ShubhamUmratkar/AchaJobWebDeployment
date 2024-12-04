import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css'],
})
export class AdminregisterComponent implements OnInit {
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form group with form controls and validations
    this.adminForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.adminForm.valid) {
      const admin: Admin = this.adminForm.value;

      // Call service to register admin
      this.adminService.registerAdmin(admin).subscribe(
        (response) => {
         
          alert('Failed to register admin');
        },
        (error) => {

          // Show popup message
          alert('Admin registered successfully. Please wait until Super Admin approves your application.');

          // Navigate to login page
          
          this.router.navigate(['/adminlogindynamic']);
        }
      );
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/adminlogindynamic']);
  }
}
