import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      // Reset scroll to the top without animations
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
  }

}
