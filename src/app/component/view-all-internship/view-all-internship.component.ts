import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from 'src/app/model/internship.model';
import { InternshipService } from 'src/app/service/service-internship.service';



@Component({
  selector: 'app-view-all-internship',
  templateUrl: './view-all-internship.component.html',
  styleUrls: ['./view-all-internship.component.css']
})
export class ViewAllInternshipComponent implements OnInit {
  internships: Internship[] = [];

  constructor(private internshipService: InternshipService,  private router:Router) {}

  ngOnInit(): void {
    this.fetchAllInternships();
  }

  fetchAllInternships() {
    this.internshipService.getAllInternships().subscribe(
      (data: Internship[]) => {
        this.internships = data;
        console.log('All internships:', this.internships);
      },
      (error) => {
        console.error('Error fetching internships:', error);
      }
    );
  }

  viewInternshipDetails(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/internship-detail', id]); // Proceed to detail page if id is valid
    } else {
      console.error('Internship ID is undefined');
    }
  }
}
