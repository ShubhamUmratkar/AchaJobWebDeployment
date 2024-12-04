import { Component } from '@angular/core';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/service/job.service';

@Component({
  selector: 'app-job-slider',
  templateUrl: './job-slider.component.html',
  styleUrls: ['./job-slider.component.css']
})
export class JobSliderComponent {
  jobs: Job[] = [];
  currentIndex = 0;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe(
      (data: Job[]) => {
        if (data && data.length > 0) {
          this.jobs = data;
          console.log('Fetched jobs:', this.jobs);
        } else {
          console.warn('No jobs returned from API.');
          this.jobs = []; // Ensure jobs array is empty but defined
        }
      },
      (error) => {
        console.error('Error fetching jobs:', error);
        this.jobs = []; // Fallback to empty array in case of an error
      }
    );
  }

  getVisibleJobs(): (Job | null)[] {
    const length = this.jobs.length;
    if (length === 0) {
      return [null, null, null]; // Return placeholders when no jobs are available
    }
    return [
      this.jobs[(this.currentIndex - 1 + length) % length] || null,
      this.jobs[this.currentIndex] || null,
      this.jobs[(this.currentIndex + 1) % length] || null
    ];
  }

  isActive(index: number): boolean {
    return index === 1; // Middle element in `getVisibleJobs()` is active
  }

  isPrev(index: number): boolean {
    return index === 0; // First element in `getVisibleJobs()` is previous
  }

  isNext(index: number): boolean {
    return index === 2; // Last element in `getVisibleJobs()` is next
  }

  prev(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.jobs.length - 1;
  }

  next(): void {
    this.currentIndex = (this.currentIndex < this.jobs.length - 1) ? this.currentIndex + 1 : 0;
  }

  setActiveIndex(index: number): void {
    this.currentIndex = index;
  }
}
