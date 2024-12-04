import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  // Static credentials
  private staticUsername = 'admin';
  private staticPassword = 'admin@123';

  constructor(private router: Router) {}

   // Add this method to hide the login container
   closeLogin() {
    // Logic to hide or close the login form (e.g., using a flag)
    this.loginError = false;  // Optionally reset any errors
    // You can also use a flag to conditionally render the login form
  }

  onSubmit(): void {
    // Simple username and password validation
    if (this.username === this.staticUsername && this.password === this.staticPassword) {
      this.loginError = false;
      alert('Login successful!');

      // Redirect to another page or take some action
      this.router.navigate(['/super-admin']);
    } else {
      this.loginError = true;
    }
  }
}
