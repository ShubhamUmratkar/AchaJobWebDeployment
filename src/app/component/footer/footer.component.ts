import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = ''; // Bind the email input field
  emailSentSuccess: boolean = false; // Flag to show success message

  // Function to simulate email sending
  sendEmail() {
    alert("Email Sent Successfully.");
  }
}