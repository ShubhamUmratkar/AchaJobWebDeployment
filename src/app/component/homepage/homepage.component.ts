import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  searchText: string = '';  // To bind to the input value
  suggestions: Array<string> = []; // Holds filtered job suggestions
  debounceTimeout: any; // Used for debouncing user input
  jobs: Array<any> = []; // Holds the fetched jobs from the backend
  noResults: boolean = false; // Tracks if no results are found
  isSearching: boolean = false; // Loading state for search
  showErrorMessage: boolean = false;

  // Predefined job suggestions list
  jobTitles: Array<string> = [
        // Software Development & Engineering
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'Mobile App Developer',
        'Game Developer',
        'Embedded Systems Engineer',
        'AR/VR Developer',
        'IoT Specialist',
        'AI/ML Engineer',
        'Blockchain Developer',
        'Cloud Architect',
        'Site Reliability Engineer (SRE)',
        'DevOps Engineer',
        'Python Developer',
        'Java Developer',
        'MEAN Stack Developer',
        'MERN Stack Developer',
        'React Developer',
        'Angular Developer',

        // Data Science & Analytics
        'Data Scientist',
        'Data Analyst',
        'Business Intelligence Analyst',
        'Big Data Engineer',
        'Machine Learning Scientist',
        'Statistical Analyst',
        'Quantitative Analyst',
        'NLP Specialist',
        'AI Prompt Engineer',

        // Cybersecurity & Networking
        'Cybersecurity Specialist',
        'Penetration Tester',
        'Security Analyst',
        'Ethical Hacker',
        'Network Administrator',
        'Information Security Manager',
        'IT Risk Analyst',

        // Product Management & Design
        'Product Manager',
        'UX/UI Designer',
        'Interaction Designer',
        'Design Researcher',
        'Graphic Designer',
        'Game Designer',

        // IT Administration & Support
        'IT Support Specialist',
        'System Administrator',
        'Database Administrator',
        'IT Project Manager',
        'IT Consultant',

        // Marketing, Content & Strategy
        'Digital Marketing Specialist',
        'Social Media Manager',
        'Content Writer',
        'SEO Analyst',
        'E-commerce Specialist',
        'Brand Strategist',

        // Emerging Tech & Innovation
        'Robotics Engineer',
        'Quantum Computing Scientist',
        'Renewable Energy Technologist',
        'Digital Twin Specialist',
        'Smart City Planner',

        // Research, Academia & Writing
        'Research Scientist',
        'Technical Writer',
        'Data Journalist',
        'IT Trainer',
        'Curriculum Developer',

        // Miscellaneous Roles
        'Technical Recruiter',
        'CRM Specialist',
        'ERP Consultant',
        'Operations Manager',
        'Salesforce Developer',
        'Audio Engineer',
        'Video Game Tester',
        'Innovation Strategist',
        'Customer Success Manager',
        'Technical Account Manager',
        'Field Engineer',
        'Supply Chain Analyst',
        'Logistics Manager',
        'Compliance Specialist',
        'Healthcare Data Analyst',
        'Bioinformatics Specialist',
        'Agricultural Technologist',
        'Astronomy Data Scientist',
        'Space Systems Engineer',
        'AI Ethics Consultant',
        'Knowledge Engineer',
        'Digital Transformation Consultant',
        'Startup Advisor'
      ]


      isLoggedIn: boolean = false;
      user: {
        fullName: string;
        userName: string;
        emailId: string;
        gender: string;
        mobileNo: string;
        password: string;
        confirmPassword: string;
        status: string;
      } | null = null;
    
      showProfileDropdown: boolean = false;

  constructor(private router: Router, private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    // Check local storage for user details
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLoggedIn = true;
    }

     // Subscribe to login status updates
  this.userService.isLoggedIn$.subscribe((loggedIn) => {
    this.isLoggedIn = loggedIn;
    if (loggedIn) {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
    } else {
      this.user = null;
    }
  });
  }  
  

  // Filter suggestions based on user input
  onSearchInput(): void {
    this.showErrorMessage = false; // Hide error message on input
    clearTimeout(this.debounceTimeout);
    const query = this.searchText.trim().toLowerCase();
    if (query.length > 0) {
      this.debounceTimeout = setTimeout(() => {
        this.suggestions = this.jobTitles.filter((title) =>
          title.toLowerCase().includes(query)
        );
      }, 300);
    } else {
      this.suggestions = []; // Clear suggestions if input is empty
    }
  }

  // Handle suggestion click
  onSuggestionClick(suggestion: string): void {
    this.searchText = suggestion; // Set the selected suggestion as search text
    this.suggestions = []; // Clear suggestions
    this.searchJobs(); // Trigger the search when a suggestion is clicked
  }

  searchJobs(): void {
    const trimmedSearchText = this.searchText.trim();
  
    if (!trimmedSearchText) {
      this.showErrorMessage = true; // Show error message
      this.jobs = []; // Clear previous results
      return;
    }
  
    this.showErrorMessage = false; // Hide error message if input is valid
  
    const params = new HttpParams().set('title', trimmedSearchText);
    this.isSearching = true; // Show loader
  
    this.http.get<any[]>('/api/searchJobs', { params }).subscribe(
      (response) => {
        this.jobs = response.filter((job) =>
          job.title.toLowerCase().includes(trimmedSearchText.toLowerCase())
        );
        this.isSearching = false; // Hide loader
      },
      (error) => {
        console.error('Error fetching jobs:', error);
        this.jobs = [];
        this.isSearching = false; // Hide loader
      }
    );
  
    this.router.navigate(['/job-posts'], { queryParams: { search: trimmedSearchText } });
  }
  

  // Handle the Enter key press to trigger search
  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.searchJobs();
    }
  }

  toggleProfileDropdown(): void {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  editProfile(): void {
    this.router.navigate(['/editprofile']);
  }

  logout(): void {
    this.userService.logout(); // Call the service logout
    this.isLoggedIn = false;
    this.user = null;
  }
  
}
