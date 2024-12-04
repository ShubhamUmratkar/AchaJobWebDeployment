import { Component } from '@angular/core';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-viell-all-jobs',
  templateUrl: './viell-all-jobs.component.html',
  styleUrls: ['./viell-all-jobs.component.css']
})
export class ViellAllJobsComponent {
  jobs: Job[] = []; // Array to store all jobs
 
  constructor(private jobService: JobService) {}
 
  ngOnInit(): void {
    this.fetchJobs();
  }
 
  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
    });
  }
}
 