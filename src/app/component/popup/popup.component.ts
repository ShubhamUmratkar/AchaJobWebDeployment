import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  isPopupVisible: boolean = true;

  constructor(private router: Router) {}

  selectOption(option: string) {
    if (option === 'job') {
      // Redirect to User Registration page
      this.router.navigate(['/register']);
    } else if (option === 'hire') {
      // Redirect to Admin Registration page
      this.router.navigate(['/adminregister']);
    }
    this.closePopup();
  }

  closePopup() {
    this.isPopupVisible = false;
  }
}
