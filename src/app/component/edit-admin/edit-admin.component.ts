import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/model/admin.model';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent { 
  adminData: any = {};
  adminId: number | null = null;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.adminId = +params['id'];  // + converts the string to a number
      if (this.adminId) {
        this.loadAdminDetails(this.adminId);
      }
    });
  }
  

  loadAdminDetails(adminId: number): void {
    this.adminService.getAdminById(adminId).subscribe((data) => {
      console.log('Admin data fetched:', data);  // Check if the password field is there
      this.adminData = data;
    });
  }
  

  updateAdmin(): void {
    if (!this.adminId) {
      alert('Admin ID is required to update details.');
      return;
    }

    const updatedData = {
      name: this.adminData.name,
      mobileNo: this.adminData.mobileNo,
      password: this.adminData.password,
    };

    this.adminService.updateAdmin(this.adminId, updatedData).subscribe(
      () => {
        alert('Admin details updated successfully!');
        this.router.navigate(['/adminlogindynamic']);
      },
      (error) => {
        alert('Failed to update admin details. Please try again later.');
      }
    );
  }

  
  
}
