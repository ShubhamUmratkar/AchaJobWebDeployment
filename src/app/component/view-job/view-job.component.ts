import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/service/job.service';


@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {
  jobTitle = '';
  companyName = '';
  location = '';
  startDate = '';
  ctc = '';
  experience = '';
  applyBy = '';
  applicants = 0;
  skills: string[] = [];
  responsibilities: string[] = [];
  perks = '';
  openings = 0;
  companyDescription = '';
  activity = {
    started: '',
    opportunities: 0,
    hired: 0
  };
  jobId: number | null = null;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['id'];
      if (this.jobId) {
        this.fetchJobDetails(this.jobId);
      } else {
        this.router.navigate(['/not-found']);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  fetchJobDetails(id: number): void {
    this.jobService.getJobById(id).subscribe(
      (job: Job) => {
        if (job) {
          this.jobTitle = job.title;
          this.companyName = job.company;
          this.location = job.location;
          this.startDate = job.openingStartDate || 'Loading...';
          this.ctc = job.salary ? `₹ ${job.salary}` : 'Loading...';
          this.experience = job.experience;
          this.applyBy = job.lastApplyDate || 'Loading...';
          this.applicants = 41;
          this.skills = job.skills ? job.skills.split(',') : [];
          this.responsibilities = job.jobDescription.split('\n');
          this.perks = job.perks || 'Loading...';
          this.openings = job.numberOfOpenings || 0;
          this.companyDescription = job.companyDescription || 'Loading...';
          this.activity.started = job.created_at || 'Loading...';
          this.activity.opportunities = 1;
          this.activity.hired = 4;
        } else {
          this.router.navigate(['/not-found']);
        }
      },
      (error) => {
        console.error('Error fetching job details:', error);
        this.router.navigate(['/not-found']);
      }
    );
  }

  onApplyNow(): void {
    if (this.jobId) {
      this.router.navigate([`/apply-job/${this.jobId}`]);
      console.log("JOb Id In View Job@@@@@@@@@@@", this.jobId);
    } else {
      alert('Job ID is missing.');
    }
  }

  sharePage(): void {
    const shareText = `Check out this amazing job opportunity at ${this.companyName}`;
    const shareUrl = window.location.href;  // Get the current page URL

    console.log('Share button clicked');  // Debugging: confirm the method is being triggered
    console.log('Share URL:', shareUrl);  // Debugging: confirm the URL

    if (navigator.share) {
      navigator.share({
        title: this.jobTitle,         // Job title
        text: shareText,              // The text content to share
        url: shareUrl                 // The current page URL
      }).then(() => {
        console.log('Job details shared successfully!');
      }).catch((error) => {
        console.error('Error sharing the job:', error);
        alert('Something went wrong while sharing the job!');
      });
    } else {
      // Fallback: Log and alert if Web Share API is not supported
      console.log('Web Share API is not supported');
      alert('Sharing is not supported on this browser.');
    }
  }

}

