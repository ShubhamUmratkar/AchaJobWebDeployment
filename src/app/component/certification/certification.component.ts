import { Component } from '@angular/core';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent {
  courses = [
    {
      title: 'Web Development',
      subtitle: 'Full Stack Development',
      description: 'In this web development course you will learn about HTML/CSS, MySQL, PHP, JavaScript, and React and build a website from scratch!',
      duration: '6 Months',
      learners: '1,500'
    },
    {
      title: 'Full Stack Development',
      subtitle: 'Comprehensive Skills',
      description: 'Learn to build dynamic, responsive applications with comprehensive front-end and back-end skills.',
      duration: '6 Months',
      learners: '3,100'
    },
    {
      title: 'Programming with Python',
      subtitle: 'Master Python',
      description: 'Master Python to develop applications, automate tasks, and analyze data with hands-on projects and real-world applications.',
      duration: '6 Months',
      learners: '4,200'
    }
  ];

  // Array to generate 5 stars
  stars = Array(5).fill('★');
}
