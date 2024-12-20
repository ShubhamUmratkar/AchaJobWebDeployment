import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginFailed = false;
  errorMessage: string = '';
  passwordFieldType: string = 'password'; // Default type for password field
  setLoggedIn: any;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

   // Toggle password visibility
   togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  // On form submission
  onSubmit() {
    this.submitted = true;

    // If form is invalid, return
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.userService.loginUser(username, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/']); // Navigate to another page after login
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert(error); // Show error to the user
      }
    });
    
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  navigateToAdminLogin() {
    this.router.navigate(['/adminlogindynamic']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']); // Replace with your actual route
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
