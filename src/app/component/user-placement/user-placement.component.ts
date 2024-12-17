import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-user-placement',
  templateUrl: './user-placement.component.html',
  styleUrls: ['./user-placement.component.css']
})
export class UserPlacementComponent implements OnInit {
  placements: any[] = []; // To store all placements
  selectedPlacement: any = null; // To store details of a selected placement
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchAllPlacements();
  }

  // Fetch all placements
  fetchAllPlacements(): void {
    this.isLoading = true;
    this.adminService.getAllPlacements().subscribe({
      next: (data) => {
        this.placements = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to fetch placements.';
        console.error('Error fetching placements:', error);
        this.isLoading = false;
      }
    });
  }

  // Fetch details of a specific placement by ID
  fetchPlacementById(id: number): void {
    this.isLoading = true;
    this.adminService.getPlacementById(id).subscribe({
      next: (data) => {
        this.selectedPlacement = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = `Failed to fetch placement with ID ${id}.`;
        console.error('Error fetching placement:', error);
        this.isLoading = false;
      }
    });
  }

  // Clear selected placement
  clearSelectedPlacement(): void {
    this.selectedPlacement = null;
  }
}
