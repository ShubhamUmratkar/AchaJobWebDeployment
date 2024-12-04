import { Component } from '@angular/core';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent {
  forms: any[] = [];  // Array to hold the list of forms
  selectedForm: any = null;

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  // Method to fetch all forms from the backend
  fetchForms(): void {
    this.formService.getAllForms().subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  // Method to display selected form's details
  viewFormDetails(form: any): void {
    this.selectedForm = form;
  }

}