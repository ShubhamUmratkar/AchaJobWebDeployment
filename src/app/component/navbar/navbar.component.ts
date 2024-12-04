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

  isNavbarOpen = false;
  // userData: any = null;
  isLoggedIn = true;  // Track login status
  dropdownOpen: any = null;
  isMobile: boolean = false;


    navItems = [
      {
        label: 'Home',
        categories: [
          { title: 'About US', items: ['We help you `Prepare` & `Find your Dream Job`'],isOpen: false },
        ]
      },
      {
        label: 'Internships',
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
        categories: [
          { title: 'By Skills', items: ['Programing', 'Data Science', 'Digital Markating', 'Business Communication',],isOpen: false },
          { title: 'Placement Preparation', items: ['Placement Preparation','Interview Preparation'],isOpen: false },
          { title: 'Free Cources', items: ['Beginner Cources','Advance Topics','Skills Development','Certification Paths','Practice Exercises'],isOpen: false },
          { title: 'All Cources', items: ['Software Development','Software Testing','Website Development','Business Analyst','Cyber Security','Data Analyst','Data Engineering','Data Science','E-commerce Development','Full Stack Development','Google Cloud','Linux','POwerBI','Python','SAP','UI/UX','AWS Cloud','Azure'],isOpen: false },
        ]
      },
      {
        label: 'Fresher Jobs',
        categories: [
          { title: 'By Industry', items: ['IT', 'Designing', 'Content Writing', 'Sales', 'Operations','Engineering'],isOpen: false },
          { title: 'By Location', items: ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Nagpur', 'Hyderabad'],isOpen: false },
          { title: 'Remote Jobs', items: ['Full-Time Remote','Part-Time Remote', 'Hybrid'],isOpen: false },
          { title: 'All Jobs Categories', items: ['Entry Level','Roler','Graduate','Programs','Internships','Trainee','Positions','Apprenticeships'],isOpen: false },
        ]
      },
      {
        label: 'For Employers',
        categories: [
          { title: 'Job Postings', items: ['Full-Time Opportunities','Project Extensions','Part-Time Roles'],isOpen: false },
          // { title: 'Pricing', items: [],isOpen: false },
          // { title: 'Login/Register', items: [],isOpen: false },

        ]
      },
      {
        label: 'Resources',
        categories: [
          { title: 'Blog', items: ['Internship Tips', 'Skilles Development', 'Industry Trends', 'Success Stories'],isOpen: false },
          { title: 'Resume Generator', items: ['Create Resume', 'Edit Resume'],isOpen: false },
          { title: 'Careeer Guide', items: ['Career Advice', 'Guidance Articles'],isOpen: false },
          { title: 'Interview Preparations', items: ['Tips','Mock Interviews'],isOpen: false },
        ]
      },
      {
        label: 'Help',
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
      this.userservice.isLoggedIn$.subscribe((status) => {
        this.isLoggedIn = status;
      });

      // Initial check for mobile mode
      this.checkMobileMode();
    }

    ngAfterViewInit(): void {
      const dropdownElement = document.getElementById('navbarDropdown');
      if (dropdownElement) {
        new bootstrap.Dropdown(dropdownElement);
      }
    }

    // Toggle mobile navbar on button click
    toggleNavbar() {
      if (this.isMobile) {
        this.isNavbarOpen = !this.isNavbarOpen;
      }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.checkMobileMode();
    }

    checkMobileMode() {
      this.isMobile = window.innerWidth <= 768;
    }

    toggleDropdown(item: any, event: MouseEvent | null = null) {
      if (event) {
        event.stopPropagation();
      }
      if (this.dropdownOpen === item) {
        this.dropdownOpen = null;
      } else {
        this.dropdownOpen = item;
      }

      this.navItems.forEach(navItem => {
        if (navItem !== item) {
          navItem.categories.forEach(category => {
            category.isOpen = false;
          });
        }
      });
    }

    toggleCategory(category: any) {
      category.isOpen = !category.isOpen;
    }
  // toggleCategory(category: any) {
  //   category.isOpen = !category.isOpen;
  // }


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
