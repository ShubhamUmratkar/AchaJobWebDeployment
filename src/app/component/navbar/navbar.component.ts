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

  isNavbarOpen = false; // Tracks navbar open/close state for mobile
  isResponsiveMode = false; // Tracks responsive mode state
  navItems: any[] = []; // Array to hold navigation items
  isLoggedIn = false; // User authentication state
 
  constructor(private router: Router, private userService: UserService) {}
 
  ngOnInit(): void {
    this.navItems = this.initializeNavItems();
 
    // Detect initial screen size
    this.checkResponsiveMode();
 
    // Subscribe to authentication status changes
    this.userService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
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
 
  @HostListener('window:resize', [])
  onResize(): void {
    this.checkResponsiveMode();
  }
 
  initializeNavItems(): any[] {
    return [
      {
        label: 'Home',
        isOpen: false,
        categories: [
          { title: 'About Us', items: ['We help you prepare & find your dream job'],isOpen: false },
        ]
      },
      {
        label: 'Internships',
        isOpen: false,
        categories: [
          { title: 'By Category', items: ['Engineering', 'Marketing', 'Sales', 'Content Writing', 'Design', 'Media', 'Law'],isOpen: false },
          { title: 'By Location', items: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'],isOpen: false },
          { title: 'Work From Home', items: ['Remote Opportunities', 'Flexible Hours', 'Freelance Jobs', 'Full-Time Remote', 'Part-Time Remote'],isOpen: false },
          { title: 'Part-Time Internships', items: ['Internship', 'Part-Time Internship', 'Full Time Internship'],isOpen: false },
          { title: 'Browse All Internships', items: ['Internship Opportunities', 'Remote Internships', 'Flexible Hours'],isOpen: false }
        ]
      },
      {
        label: 'Online Training',
        isOpen: false,
        categories: [
          // { title: 'By Skills', items: ['Programing', 'Data Science', 'Digital Markating', 'Business Communication',],isOpen: false },
          { title: 'Placement Preparation', items: ['Placement Preparation','Interview Preparation'],isOpen: false },
          // { title: 'Free Courses', items: ['Beginner Courses','Advance Topics','Skills Development','Certification Paths','Practice Exercises'],isOpen: false },
          { title: 'All Courses', items: ['Software Development','Software Testing','Website Development','Business Analyst','Cyber Security','Data Analyst','Data Engineering','Data Science','E-commerce Development','Full Stack Development','Google Cloud','Linux','PowerBI','Python','SAP','UI/UX','AWS Cloud','Azure','Digital Marketing','Business Communication'],isOpen: false },
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
          { title: 'Interview Tips', items: ['Placement','Mock Interviews'],isOpen: false },
        ]
      },
      {
        label: 'Help',
        isOpen: false,
        categories: [
          // { title: 'FAQs', items: ['Frequently Asked Questions'],isOpen: false },
          { title: 'Contact Us', items: ['Email', 'Telecom Number'],isOpen: false },
          // { title: 'T&S', items: [],isOpen: false },
          // { title: 'Privacy Policy', items: [],isOpen: false  },
        ]
      },
      ];
  }
 
  checkResponsiveMode(): void {
    const screenWidth = window.innerWidth;
    this.isResponsiveMode = screenWidth <= 768;
    if (!this.isResponsiveMode) {
      this.isNavbarOpen = false;
    }
  }
 
  toggleNavbar(): void {
    if (this.isResponsiveMode) {
      this.isNavbarOpen = !this.isNavbarOpen;
      console.log(`Navbar is now ${this.isNavbarOpen ? 'expanded' : 'collapsed'}`);
    }
  }
 
  toggleItem(item: any): void {
    if (this.isResponsiveMode) {
      item.isOpen = !item.isOpen;
      console.log(`${item.label} is now ${item.isOpen ? 'expanded' : 'collapsed'}`);
    }
  }
 
  toggleCategory(category: any): void {
    if (this.isResponsiveMode) {
      category.isOpen = !category.isOpen;
      console.log(`${category.title} is now ${category.isOpen ? 'expanded' : 'collapsed'}`);
    }
  }
 
  handleSubItemClick(subItem: string): void {
    console.log(`Sub-item clicked: ${subItem}`);
  }
 
  logout(): void {
    this.userService.logout();
    alert('Logout Successfully.');
    this.router.navigate(['/']);
  }
}