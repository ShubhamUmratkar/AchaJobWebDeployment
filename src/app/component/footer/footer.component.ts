import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = ''; // Bind the email input field
  emailSentSuccess: boolean = false; // Flag to show success message
  

  constructor(private router: Router) {}

  // Function to simulate email sending
  sendEmail() {
    alert("Email Sent Successfully.");
  }


  onHomeClick(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}