import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import * as bootstrap from 'bootstrap';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit{

  isResponsiveMode = false; // Tracks if the current mode is responsive
  isNavbarOpen = false;
  userData: any = null;
  isLoggedIn = true;  // Track login status


    navItems = [
      {
        label: 'Home',
        isOpen: false,
        categories: [
          { title: 'About US', items: ['We help you Prepare & Find your Dream Job'],isOpen: false },
        ]
      },
      {
        label: 'Internships',
        isOpen: false,
        categories: [
          { title: 'By Category', items: ['Engineering', 'Marketing', 'Sales', 'Content Writing', 'Design', 'Media', 'Law'],isOpen: false },
          { title: 'By Location', items: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'],isOpen: false },
          { title: 'Work from Home', items: ['Remote Opportunities', 'Flexible Hours', 'Freelance Jobs', 'Full-Time Remote', 'Part-Time Remote'],isOpen: false },
          { title: 'Part-time Internships', items: ['Internship', 'Part-Time Internship', 'Full Time Internship'],isOpen: false },
          { title: 'Browse All Internships', items: ['Internship Opportunities', 'Remote Internships', 'Skill Development', 'Flexible Hours', 'Industry Exposure'],isOpen: false }
        ]
      },
      {
        label: 'Online Traning',
        isOpen: false,
        categories: [
          { title: 'By Skills', items: ['Programing', 'Data Science', 'Digital Markating', 'Business Communication',],isOpen: false },
          { title: 'Placement Preparation', items: ['Placement Preparation','Interview Preparation'],isOpen: false },
          { title: 'Free Cources', items: ['Beginner Cources','Advance Topics','Skills Development','Certification Paths','Practice Exercises'],isOpen: false },
          { title: 'All Cources', items: ['Software Development','Software Testing','Website Development','Business Analyst','Cyber Security','Data Analyst','Data Engineering','Data Science','E-commerce Development','Full Stack Development','Google Cloud','Linux','POwerBI','Python','SAP','UI/UX','AWS Cloud','Azure'],isOpen: false },
        ]
      },
      {
        label: 'Fresher Jobs',
        isOpen: false,
        categories: [
          { title: 'By Industry', items: ['IT', 'Designing', 'Content Writing', 'Sales', 'Operations','Engineering'],isOpen: false },
          { title: 'By Location', items: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Nagpur', 'Hyderabad'],isOpen: false },
          { title: 'Remote Jobs', items: ['Full-Time Remote','Part-Time Remote', 'Hybrid'],isOpen: false },
          { title: 'All Jobs Categories', items: ['Entry Level','Roler','Graduate','Programs','Internships','Trainee','Positions','Apprenticeships'],isOpen: false },
        ]
      },
      {
        label: 'For Employers',
        isOpen: false,
        categories: [
          { title: 'Job Postings', items: ['Full-Time Opportunities','Project Extensions','Part-Time Roles'],isOpen: false },
          // { title: 'Pricing', items: [],isOpen: false },
          // { title: 'Login/Register', items: [],isOpen: false },

        ]
      },
      {
        label: 'Resources',
        isOpen: false,
        categories: [
          { title: 'Blog', items: ['Internship Tips', 'Skills Development', 'Industry Trends', 'Success Stories'],isOpen: false },
          { title: 'Resume Generator', items: ['Create Resume', 'Edit Resume'],isOpen: false },
          { title: 'Career Guide', items: ['Career Advice', 'Guidance Articles'],isOpen: false },
          { title: 'Interview Preparations', items: ['Tips','Mock Interviews'],isOpen: false },
        ]
      },
      {
        label: 'Help',
        isOpen: false,
        categories: [
          { title: 'FAQs', items: ['Frequently Asked Questions'],isOpen: false },
          { title: 'Contact Us', items: ['Email', 'Telecom Number'],isOpen: false },
          // { title: 'T&S', items: [],isOpen: false },
          // { title: 'Privacy Policy', items: [],isOpen: false  },
        ]
      },
    ];


    constructor(private router: Router, private userservice: UserService) {}

  ngOnInit(): void {
    // Subscribe to authentication status changes
    this.userservice.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap dropdowns if needed
    const dropdownElement = document.getElementById('navbarDropdown');
    if (dropdownElement) {
      new bootstrap.Dropdown(dropdownElement);
    }
  }

   // Detect screen resize
   @HostListener('window:resize', [])
   onResize(): void {
     this.checkResponsiveMode();
   }

   // Check if the screen width is within the responsive range
   checkResponsiveMode(): void {
     const screenWidth = window.innerWidth;
     this.isResponsiveMode = screenWidth <= 768; // Adjust width threshold as needed
     if (!this.isResponsiveMode) {
       this.isNavbarOpen = false; // Close the navbar in non-responsive mode
     }
   }

   // Functionality for "hamburger-icon"
   toggleNavbar(): void {
     if (this.isResponsiveMode) {
       this.isNavbarOpen = !this.isNavbarOpen;
       console.log(`Navbar is now ${this.isNavbarOpen ? 'open' : 'closed'}`);
     }
   }

   toggleItem(item: any): void {
    if (this.isResponsiveMode) {
      item.isOpen = !item.isOpen;
      console.log(`${item.label} is now ${item.isOpen ? 'expanded' : 'collapsed'}`);
    }
  }
   // Functionality for "nav-items"
   toggleCategory(category: any): void {
     if (this.isResponsiveMode) {
       category.isOpen = !category.isOpen;
       console.log(`${category.title} is now ${category.isOpen ? 'expanded' : 'collapsed'}`);
     }
   }

   // Functionality for "dropdown-category" and "secondary-dropdown"
   handleSubItemClick(subItem: string): void {
     if (this.isResponsiveMode) {
       console.log(`Sub-item clicked: ${subItem}`);
       // Add any desired functionality here
     }
   }

  onSubItemClick(subItem: any): void {
    console.log('Sub-item clicked:', subItem.label);
  }

  loginUser(userName: string, password: string): void {
    // Call the login method from the UserService
    this.userservice.loginUser(userName, password).subscribe(response => {
      if (response === 'Login successful.') {
        this.router.navigate(['/']);
      }
    });
  }

  logout(): void {
    this.userservice.logout();
    alert('Logout Successfully.')
    this.router.navigate(['/']);
  }
}
