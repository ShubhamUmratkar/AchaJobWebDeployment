import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  images: string[] = [
    '/assets/Banner/1.jpg',
    '/assets/Banner/2.jpg',
    '/assets/Banner/3.jpg'
  ];
  currentIndex = 0;
  translateX = 0;
  containerWidth = 0;
 
  ngOnInit(): void {
    this.updateContainerWidth(); // Set initial container width
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }
 
  @HostListener('window:resize')
  onResize(): void {
    this.updateContainerWidth(); // Update container width on window resize
  }
 
  updateContainerWidth(): void {
    const container = document.querySelector('.slider-container');
    this.containerWidth = container ? container.clientWidth : 0; // Get the container width
    this.translateX = -this.currentIndex * this.containerWidth; // Recalculate translateX
  }
 
  nextSlide(): void {
    if (this.images.length === 0) return; // Ensure the array is not empty
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.translateX = -this.currentIndex * this.containerWidth;
  }
 
  goToSlide(index: number): void {
    this.currentIndex = index;
    this.translateX = -this.currentIndex * this.containerWidth;
  }
}