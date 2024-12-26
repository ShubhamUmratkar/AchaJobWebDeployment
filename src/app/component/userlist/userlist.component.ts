import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  users: any[] = [];
  adminId: number = 0; // Initially null
  errorMessage: string | null = null;
  sidebarOpen = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();

     // Retrieve adminId from localStorage after login
     const storedAdminId = localStorage.getItem('adminId');
     if (storedAdminId) {
       this.adminId = parseInt(storedAdminId, 10); // Convert to number

     } else {
       // Handle case where adminId is not available, e.g., redirect to login page
       this.errorMessage = 'You must be logged in to manage jobs.';
       // Optionally redirect to the login page
       // this.router.navigate(['/login']);
     }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}


