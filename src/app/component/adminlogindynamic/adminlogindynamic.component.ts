import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-adminlogindynamic',
  templateUrl: './adminlogindynamic.component.html',
  styleUrls: ['./adminlogindynamic.component.css']
})
export class AdminlogindynamicComponent {
  loginForm: FormGroup; // Reactive form for login
  errorMessage: string | null = null; // Error message display
  loginError: boolean = false; // Tracks login error state
  isLoading: boolean = false; // Loading state for button and UI feedback
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private AdminService: AdminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]], // Username validation
      password: ['', [Validators.required]], // Password validation
    });
  }

  ngOnInit(): void {
    // Initialization logic, if any
  }

  onLogin() {
    if (this.loginForm.invalid) {
      // Form validation error
      this.errorMessage = 'Please fill in all required fields.';
      this.loginError = true;
      return;
    }

    const { username, password } = this.loginForm.value;
    this.isLoading = true; // Start loading spinner

    // Make the API call to login the admin
    this.AdminService.loginAdmin(username, password).subscribe(
      (response: any) => {  // response is of type 'any' here
        this.isLoading = false; // Stop loading spinner
        console.log('Full Response:', response);  // Log the full response to check its structure

        // Check if the response has the 'id' property
        if (response && response.id !== undefined) {
          const adminId = response.id;
          console.log('Admin ID:', adminId);  // Log the Admin ID

          // Save the admin ID to localStorage
          localStorage.setItem('adminId', adminId.toString());
          // Show alert on successful login
        alert(`Welcome, Admin! You have successfully logged in.`);

          // Navigate to the next page (e.g., save-job page)
          this.router.navigate(['/save-job']);
        } else {
          console.error('Admin ID is missing or undefined in the response');
          this.errorMessage = 'Failed to retrieve Admin ID.';
          this.loginError = true;
        }
      },
      (error) => {
        this.isLoading = false; // Stop loading spinner
        this.loginError = true; // Display error state
        this.errorMessage = error.error?.message || 'Invalid username or password';
      }
    );
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
