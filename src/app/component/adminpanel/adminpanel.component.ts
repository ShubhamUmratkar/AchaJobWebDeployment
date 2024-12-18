import { Component } from '@angular/core';
import { ApplyJobService } from 'src/app/service/apply-job.service';
import { FormService } from 'src/app/service/form.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent {
  forms: any[] = [];  // Array to hold the list of forms
  selectedForm: any = null;

  constructor(private formService: FormService, private applyJobService : ApplyJobService) {}

  ngOnInit(): void {
    this.fetchForms();
  }

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

  downloadCv(formId: number): void {
    this.applyJobService.downloadCv(formId).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);  // Create URL for the Blob
        const a = document.createElement('a');  // Create an anchor element
        a.href = url;  // Set the download URL
        a.download = `cv_${formId}.pdf`;  // Specify filename for download
        document.body.appendChild(a);  // Append anchor to DOM
        a.click();  // Trigger click event to start download
        document.body.removeChild(a);  // Clean up the DOM by removing the anchor
        window.URL.revokeObjectURL(url);  // Release the blob URL
      },
      (error) => {
        console.error('Error downloading CV:', error);  // Handle errors
      }
    );
  }
  

}