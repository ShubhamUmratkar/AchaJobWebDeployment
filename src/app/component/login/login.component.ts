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

  // On form submission
  onSubmit() {
    this.submitted = true;

    // If form is invalid, return
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    // Call the userService to login
    this.userService.loginUser(username, password).subscribe(
      (response: any) => {
        // Successful login
        this.loginFailed = false;
        console.log('Login successful', response);

        // Redirect to home page after login
        this.router.navigate(['/']);  // Navigate to home page
      },
      (error) => {
        // Login failed
        this.loginFailed = true;
        this.errorMessage = error.error || 'Login failed. Please try again later.';
        console.error('Login error', error);
      }
    );
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.loginForm.controls;
  }

  navigateToAdminLogin() {
    this.router.navigate(['/adminlogindynamic']);
  }

  navigateToForgotPassword() {
    // Implement forgot password navigation logic
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
