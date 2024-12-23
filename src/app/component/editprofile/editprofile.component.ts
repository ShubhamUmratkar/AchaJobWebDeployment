import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
 
 
  user: User & { id: number } = {
    id: 0, // Initialize id
    fullName: '',
    userName: '',
    emailId: '',
    gender: '',
    mobileNo: '',
    password: '', // Start with empty password field
    confirmPassword: '', // Start with empty confirm password field
    status: ''
  };
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      
      // Make sure the password fields are empty for the user to fill
      this.user.password = '';
      this.user.confirmPassword = '';
    } else {
      console.error('No user found, redirecting to login...');
      this.router.navigate(['/login']);
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
  
  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordFieldType =
      this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  onSubmit(): void {
    if (!this.user.password || this.user.password !== this.user.confirmPassword) {
      alert('Passwords are required and must match!');
      return;
    }

    // Pass the user ID along with user data
    this.userService.updateUserProfile(this.user.id, this.user).subscribe({
      next: (error) => {
        console.error('Error updating profile:', error);
        alert('Error updating profile: ' + error); // Optionally show an alert
      },
      error: (response) => {
        alert('Profile updated Successfully:');
        // Update local storage with the new user data
        this.user = { ...this.user, password: '', confirmPassword: '' }; // Clear password fields
        localStorage.setItem('user', JSON.stringify(this.user)); // Update local storage
        this.router.navigate(['/']); // Navigate back to the homepage
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']); // Navigate back without saving changes
  }
}