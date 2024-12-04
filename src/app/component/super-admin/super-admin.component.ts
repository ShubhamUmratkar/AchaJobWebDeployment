import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from 'src/app/service/super-admin.service';

@Component({
  selector: 'app-super-admin',
  templateUrl:'./super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
})
export class SuperAdminComponent implements OnInit {
  admins: any[] = [];
  pendingPosts: any[] = [];
  selectedAdminForPremium: any = null;
  premiumPrice: number = 0;
  selectedTab: 'admin' | 'post' = 'admin'; // To toggle between Admin and Post Management
  errorMessage: string = ''; // To display errors if any
  loading: boolean = false; // To indicate if the request is loading
  http: any;


  constructor(private superAdminService: SuperAdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
    this.loadPendingPosts();
  }

  loadAdmins(): void {
    this.superAdminService.getAllAdmins().subscribe(
      (admins) => {
        this.admins = admins;
        console.log('Admin list after loading:', admins);
      },
      (error) => {
        console.error('Error loading admins:', error);
        alert('Failed to load admins.');
      });
  }


  approveAdmin(adminId: number): void {
    console.log(adminId,"AdminId in Approve state");
    this.superAdminService.approveAdmin(adminId).subscribe(
      () => {
        this.admins = this.admins.map((admin) => {
          if (admin.id === adminId) {
            alert('Admin approved successfully.');
            return { ...admin, status: 'Approved' };
          }
          return admin;
        });
      },
      (error) => {
        console.error('Error approving admin:', error);
        alert('Admin approved.');
      });
  }

  disableAdmin(adminId: number): void {
    console.log(adminId, "AdminId in Disable state");
    this.superAdminService.disableAdmin(adminId).subscribe(
      () => {
        this.loadAdmins();
        alert('Admin disabled successfully.');
      },
      (error) => {
        console.error('Error disabling admin:', error);
        alert('Admin disabled.');
      }
    );
  }

  loadPendingPosts(): void {
    this.superAdminService.getAllPendingPosts().subscribe(
      (posts) => {
        this.pendingPosts = posts;
        console.log('Pending Posts:', posts);
      },
      (error) => {
        console.error('Error loading pending posts:', error);
        alert('Failed to load pending posts.');
      }
    );
  }

  approvePost(postId: number, isApproved: boolean): void {
    this.superAdminService.approvePost(postId, isApproved).subscribe(
      () => {
        this.loadPendingPosts();
        alert(isApproved ? 'Post approved successfully.' : 'Post disapproved.');
      },
      (error) => {
        console.error('Error approving/disapproving post:', error);
        alert('Post approved.');
      }
    );
  }

  disapprovePost(postId: number): void {
    this.superAdminService.disapprovePost(postId).subscribe(
      () => {
        this.loadPendingPosts();
        alert('Post disapproved successfully.');
      },
      (error) => {
        console.error('Error disapproving post:', error);
        alert('Post disapproved.');
      }
    );
  }

  // setPremiumPrice(admin: any): void {
  //   this.selectedAdminForPremium = admin;
  //   this.premiumPrice = admin.premiumPrice || 0;
  // }

  // savePremiumPrice(): void {
  //   if (this.selectedAdminForPremium) {
  //     this.superAdminService.setPremiumPrice(this.selectedAdminForPremium.id, this.premiumPrice).subscribe(() => {
  //       this.loadAdmins();
  //       this.selectedAdminForPremium = null;
  //       this.premiumPrice = 0;
  //     });
  //   }
  // }
}
