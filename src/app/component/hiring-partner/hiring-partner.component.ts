import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hiring-partner',
  templateUrl: './hiring-partner.component.html',
  styleUrls: ['./hiring-partner.component.css']
})
export class HiringPartnerComponent {
  isPlaying: boolean = false;
 
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
 
  // Method to toggle video play/pause
  togglePlayPause() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
 
  // Handle video play event
  onPlay() {
    console.log('Video is playing...');
  }
 
  // Handle video pause event
  onPause() {
    console.log('Video is paused.');
  }
}