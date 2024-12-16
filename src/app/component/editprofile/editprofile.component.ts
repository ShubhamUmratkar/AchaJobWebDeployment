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
  user: User & { id: number } = {  // Extend User with id
    id: 0, // Initialize id
    fullName: '',
    userName: '',
    emailId: '',
    gender: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    status: '' // Add status property
  };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      console.error('No user found, redirecting to login...');
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    // Check if passwords match (optional validation)
    if (this.user.password && this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
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