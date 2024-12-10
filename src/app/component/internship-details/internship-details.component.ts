import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InternshipService } from 'src/app/service/service-internship.service';

@Component({
  selector: 'app-internship-details',
  templateUrl: './internship-details.component.html',
  styleUrls: ['./internship-details.component.css']
})
export class InternshipDetailsComponent {
  internshipTitle = '';
  companyName = '';
  location = '';
  duration = '';
  stipend = '';
  qualifications = '';
  description = '';
  applicants = 0;
  activity = {
    started: '',
    opportunities: 0,
    hired: 0
  };
  internshipId: number | null = null;
  jobTitle: string | undefined;

  constructor(
    private internshipService: InternshipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.internshipId = +params['id'];
      if (this.internshipId) {
        this.fetchInternshipDetails(this.internshipId);
      } else {
        this.router.navigate(['/not-found']);
      }
    });
    console.log('Intership id@@@@@@@@@@@@',this.internshipId)
  }

  fetchInternshipDetails(id: number): void {
    this.internshipService.getInternshipById(id).subscribe(
      (internship) => {
        if (internship) {
          this.internshipTitle = internship.title;
          this.companyName = internship.company;
          this.location = internship.location;
          this.duration = internship.duration || 'Loading...';
          this.stipend = internship.stipend ? `₹ ${internship.stipend}` : 'Loading...';
          this.qualifications = internship.qualifications || 'Loading...';
          this.description = internship.description || 'Loading...';
          this.applicants = 10; // Example static value or could be fetched if available
          this.activity.started = internship.createdAt || 'Loading...';
          this.activity.opportunities = 1;
          this.activity.hired = 3;
          console.log('Intership id#############3',this.internshipId)
        } else {
          this.router.navigate(['/not-found']);
        }
      },
      (error) => {
        console.error('Error fetching internship details:', error);
        this.router.navigate(['/not-found']);
      }
    );
  }

  onApplyNow(): void {
    if (this.internshipId) {
    this.router.navigate([`/apply-internship/${this.internshipId}`]);

    } else {
      alert('Internship ID is missing.');
    }
  }


  sharePage(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Job Opportunity',
        text: `Check out this job: `,
        url: window.location.href,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing is not supported on your device or browser.');
    }
}
}