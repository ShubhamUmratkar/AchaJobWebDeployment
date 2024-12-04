import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  searchText: string = '';  // To bind to the input value

  constructor(private router: Router) {}

  // This method is triggered every time the user types something in the input field
  onSearchInput(): void {
    // You can add logic here to process the input or give suggestions if needed.
  }

  // This method is triggered when the user clicks the search button
  searchJobs(): void {
    if (this.searchText.trim()) {
      // Only proceed if searchText is not empty or just spaces
      this.router.navigate(['/job-posts'], { queryParams: { search: this.searchText } });
    }
  }
}