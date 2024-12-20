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
            { name: 'Engineering', link: '/internshippost' },
            { name: 'Marketing', link: '/internshippost' },
            { name: 'Sales', link: '/internshippost' },
            { name: 'Content Writing', link: '/internshippost' },
          ],isOpen: false },
          { title: 'By Location', items: [
            {name:'Mumbai', link: '/internshippost'},
            {name:'Delhi', link:'/internshippost'},
            {name:'Bangalore', link: '/internshippost'},
            {name:'Pune', link: '/internshippost'}
          ],isOpen: false },
          {
            title: 'Work From Home',
            items: [
              { name: 'Remote Opportunities', link: '/internshippost' },
              { name: 'Flexible Hours', link: '/internshippost' },
              { name: 'Freelance Jobs', link: '/internshippost' },
              { name: 'Full-Time Remote', link: '/internshippost' },
              { name: 'Part-Time Remote', link: '/internshippost' },
            ],
            isOpen: false,
          },
          {
            title: 'Part-Time Internships',
            items: [
              { name: 'Internship', link: '/internshippost' },
              { name: 'Part-Time Internship', link: '/internshippost' },
              { name: 'Full-Time Internship', link: '/internshippost' },
            ],
            isOpen: false,
          },
          {
            title: 'Browse All Internships',
            items: [
              { name: 'Internship Opportunities', link: '/internshippost' },
              { name: 'Remote Internships', link: '/internshippost' },
              { name: 'Flexible Hours', link: '/internshippost' },
            ],
            isOpen: false,
          },
        ],
      },
      {
        label: 'Online Training',
        isOpen: false,
        categories: [

          { title: 'Placement Preparation',
            items: [
            {name:'Placement Preparation', link: '/placement-preparation'},
            {name:'Interview Preparation', link: '/interview-preparation'}
          ],isOpen: false },

          { title: 'All Courses',
            items: [
              {name:'Software Development', link: '/allcourses'},
              {name:'Software Testing', link: '/allcourses'},
              {name:'Website Development',link: '/allcourses'},
              {name:'Business Analyst',link: '/allcourses'},
              {name:'Cyber Security', link: '/allcourses'},
              {name:'Data Analyst', link: '/allcourses'},
              {name:'Data Engineering',link: '/allcourses'},
              {name:'Data Science',link: '/allcourses'},
              {name:'E-commerce Development',link: '/allcourses'},
              {name:'Full Stack Development', link: '/allcourses'},
              {name:'Google Cloud', link: '/allcourses'},
              {name:'Linux', link: '/allcourses'},
              {name:'PowerBI', link: '/allcourses'},
              {name:'Python', link: '/allcourses'},
              {name:'SAP', link: '/allcourses'},
              {name:'UI/UX', link: '/allcourses'},
              {name:'AWS Cloud', link: '/allcourses'},
              {name:'Azure', link: '/allcourses'},
              {name:'Digital Marketing', link: '/allcourses'},
              {name:'Business Communication', link: '/allcourses'}
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
              { name: 'IT', link: '/job-posts' },
              { name: 'Designing', link: '/job-posts' },
              { name: 'Sales', link: '/job-posts' },
              { name: 'Engineering', link: '/job-posts' },
            ],
            isOpen: false,
          },
          {
            title: 'By Location',
            items: [
              { name: 'Mumbai', link: '/job-posts' },
              { name: 'Delhi', link: '/job-posts' },
              { name: 'Bangalore', link: '/job-posts' },
              { name: 'Pune', link: '/job-posts' },
            ],
            isOpen: false,
          },
          { title: 'Remote Jobs',
            items: [
            {name:'Full-Time Remote', link: '/job-posts'},
            {name:'Part-Time Remote', link: '/job-posts'},
            {name:'Hybrid', link: '/job-posts'}
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
              { name: 'Full-Time Opportunities', link: '/adminregister' },
              { name: 'Project Extensions', link: '/adminregister' },
              { name: 'Part-Time Roles', link: '/adminregister' },
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
              { name: 'Create Resume', link: '/create-resume' },
              // { name: 'Edit Resume', link: '' },
            ],
            isOpen: false,
          },
          {
            title: 'Career Guide',
            items: [
              { name: 'Career Advice', link: '/career-advice' },
              { name: 'Guidance Advice', link: '/Guidance-advice' },
            ],
            isOpen: false,
          },
          { title: 'Interview Tips',
             items: [
                {name:'Placement',link:'/userplacement'},
                {name:'Mock Interviews', link: '/usermockinterview'}
              ],isOpen: false 
          },
        ]
      },
      {
        label: 'Help',
        isOpen: false,
        categories: [

          {
            title: 'Contact Us',
            items: [
              { name: 'Email', link: '' },
              { name: 'Telecom Number', link: '' },
            ],
            isOpen: false,
          },

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