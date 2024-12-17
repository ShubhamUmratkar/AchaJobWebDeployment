import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service'; 

@Component({
  selector: 'app-placement',
  templateUrl: './placement.component.html',
  styleUrls: ['./placement.component.css'],
})
export class PlacementComponent implements OnInit {
  placements: any[] = [];
  placementForm: any = {
    text: '',
    hyperlink: '',
  };
  isEditing: boolean = false;
  editingPlacementId: number | null = null;

  constructor(private placementService: AdminService) {}

  ngOnInit(): void {
    this.fetchAllPlacements();
  }

  fetchAllPlacements() {
    this.placementService.getAllPlacements().subscribe({
      next: (data) => (this.placements = data),
      error: (err) => console.error('Failed to fetch placements', err),
    });
  }

  createPlacement() {
    this.placementService.createPlacement(this.placementForm).subscribe({
      next: (data) => {
        this.placements.push(data);
        this.placementForm = { text: '', hyperlink: '' };
      },
      error: (err) => console.error('Failed to create placement', err),
    });
  }

  editPlacement(placement: any) {
    this.isEditing = true;
    this.editingPlacementId = placement.id;
    this.placementForm = { ...placement };
  }

  updatePlacement() {
    if (!this.editingPlacementId) return;

    this.placementService
      .updatePlacement(this.editingPlacementId, this.placementForm)
      .subscribe({
        next: (updatedPlacement) => {
          const index = this.placements.findIndex(
            (p) => p.id === this.editingPlacementId
          );
          if (index !== -1) this.placements[index] = updatedPlacement;

          this.resetForm();
        },
        error: (err) => console.error('Failed to update placement', err),
      });
  }

  deletePlacement(id: number) {
    this.placementService.deletePlacement(id).subscribe({
      next: () => {
        this.placements = this.placements.filter((p) => p.id !== id);
      },
      error: (err) => console.error('Failed to delete placement', err),
    });
  }

  resetForm() {
    this.placementForm = { text: '', hyperlink: '' };
    this.isEditing = false;
    this.editingPlacementId = null;
  }
}