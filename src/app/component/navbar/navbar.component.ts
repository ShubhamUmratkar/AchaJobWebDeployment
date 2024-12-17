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
          {
            title: 'About Us',
            items: [
              { name: 'We help you prepare & find your dream job', link: '' },
            ],
            isOpen: false,
          },
        ],
      },
      {
        label: 'Internships',
        isOpen: false,
        categories: [
          { title: 'By Category',
            items: [
            { name: 'Engineering', link: '' },
            { name: 'Marketing', link: '' },
            { name: 'Sales', link: '' },
            { name: 'Content Writing', link: '' },
          ],isOpen: false },
          { title: 'By Location', items: [
            {name:'Mumbai', link: ''},
            {name:'Delhi', link:''},
            {name:'Bangalore', link: ''},
            {name:'Pune', link: ''}
          ],isOpen: false },
          {
            title: 'Work From Home',
            items: [
              { name: 'Remote Opportunities', link: '' },
              { name: 'Flexible Hours', link: '' },
              { name: 'Freelance Jobs', link: '' },
              { name: 'Full-Time Remote', link: '' },
              { name: 'Part-Time Remote', link: '' },
            ],
            isOpen: false,
          },
          {
            title: 'Part-Time Internships',
            items: [
              { name: 'Internship', link: '' },
              { name: 'Part-Time Internship', link: '' },
              { name: 'Full-Time Internship', link: '' },
            ],
            isOpen: false,
          },
          {
            title: 'Browse All Internships',
            items: [
              { name: 'Internship Opportunities', link: '' },
              { name: 'Remote Internships', link: '' },
              { name: 'Flexible Hours', link: '' },
            ],
            isOpen: false,
          },
        ],
      },
      {
        label: 'Online Training',
        isOpen: false,
        categories: [
          // { title: 'By Skills', items: ['Programing', 'Data Science', 'Digital Markating', 'Business Communication',],isOpen: false },
          { title: 'Placement Preparation',
            items: [
            {name:'Placement Preparation', link: ''},
            {name:'Interview Preparation', link: ''}
          ],isOpen: false },
          // { title: 'Free Courses', items: ['Beginner Courses','Advance Topics','Skills Development','Certification Paths','Practice Exercises'],isOpen: false },
          { title: 'All Courses',
            items: [
              {name:'Software Development', link: ''},
              {name:'Software Testing', link: ''},
              {name:'Website Development',link: ''},
              {name:'Business Analyst',link: ''},
              {name:'Cyber Security', link: ''},
              {name:'Data Analyst', link: ''},
              {name:'Data Engineering',link: ''},
              {name:'Data Science',link: ''},
              {name:'E-commerce Development',link: ''},
              {name:'Full Stack Development', link: ''},
              {name:'Google Cloud', link: ''},
              {name:'Linux', link: ''},
              {name:'PowerBI', link: ''},
              {name:'Python', link: ''},
              {name:'SAP', link: ''},
              {name:'UI/UX', link: ''},
              {name:'AWS Cloud', link: ''},
              {name:'Azure', link: ''},
              {name:'Digital Marketing', link: ''},
              {name:'Business Communication', link: ''}
            ],
            isOpen: false },
        ]
      },
      {
        label: 'Fresher Jobs',
        isOpen: false,
        categories: [
          {
            title: 'By Industry',
            items: [
              { name: 'IT', link: '' },
              { name: 'Designing', link: '' },
              { name: 'Sales', link: '' },
              { name: 'Engineering', link: '' },
            ],
            isOpen: false,
          },
          {
            title: 'By Location',
            items: [
              { name: 'Mumbai', link: '' },
              { name: 'Delhi', link: '' },
              { name: 'Bangalore', link: '' },
              { name: 'Pune', link: '' },
            ],
            isOpen: false,
          },
          { title: 'Remote Jobs',
            items: [
            {name:'Full-Time Remote', link: ''},
            {name:'Part-Time Remote', link: ''},
            {name:'Hybrid', link: ''}
          ],
          isOpen: false },
          { title: 'All Jobs Categories',
            items: [
              {name:'Entry Level', link: ''},
              {name:'Roler', link: ''},
              {name:'Graduate', link: ''},
              {name:'Programs', link: ''},
              {name:'Internships', link: ''},
              {name:'Trainee', link: ''},
              {name:'Positions',link: ''},
              {name:'Apprenticeships', link: ''}
            ],
            isOpen: false },
        ]
      },
      {
        label: 'For Employers',
        isOpen: false,
        categories: [
          {
            title: 'Job Postings',
            items: [
              { name: 'Full-Time Opportunities', link: '' },
              { name: 'Project Extensions', link: '' },
              { name: 'Part-Time Roles', link: '' },
            ],
            isOpen: false,
          },
          // { title: 'Pricing', items: [],isOpen: false },
          // { title: 'Login/Register', items: [],isOpen: false },

        ]
      },
      {
        label: 'Resources',
        isOpen: false,
        categories: [
          {
            title: 'Blog',
            items: [
              { name: 'Internship Tips', link: '' },
              { name: 'Skills Development', link: '' },
              { name: 'Industry Trends', link: '' },
              { name: 'Success Stories', link: '' },
            ],
            isOpen: false,
          },
          {
            title: 'Resume Generator',
            items: [
              { name: 'Create Resume', link: '' },
              { name: 'Edit Resume', link: '' },
            ],
            isOpen: false,
          },
          {
            title: 'Career Guide',
            items: [
              { name: 'Career Advice', link: '' },
              { name: 'Guidance Articles', link: '' },
            ],
            isOpen: false,
          },
          { title: 'Interview Tips', items: [{name:'Placement', link:'/userplacement'},{name:'Mock Interviews', link: '/usermockinterview'}],isOpen: false },
        ]
      },
      {
        label: 'Help',
        isOpen: false,
        categories: [
          // { title: 'FAQs', items: ['Frequently Asked Questions'],isOpen: false },
          {
            title: 'Contact Us',
            items: [
              { name: 'Email', link: '' },
              { name: 'Telecom Number', link: '' },
            ],
            isOpen: false,
          },
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

  handleSubItemClick(subItemName: string): void {
    console.log(`Sub-item clicked: ${subItemName}`);
  }

  logout(): void {
    this.userService.logout();
    alert('Logout Successfully.');
    this.router.navigate(['/']);
  }
}