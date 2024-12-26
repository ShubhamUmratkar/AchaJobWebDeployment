import { Component } from '@angular/core';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent {

  currentIndex: number = 0;
  itemsPerSlide: number = 3; // Number of courses to show per slide

  
  courses = [
    { title: 'Software Development', description: 'Master end-to-end software development and maintenance for web, mobile, and cloud platforms. Gain real-world experience with hands-on projects.', duration: '6 months', learners: '1,200' },
    { title: 'Software Testing', description: 'Learn manual and automated testing techniques to identify bugs and ensure software quality. Work on real-world testing projects covering unit, integration, and system testing.', duration: '6 months', learners: '1,000' },
    { title: 'Website Development', description: 'Build modern, responsive websites using HTML, CSS, JavaScript, and frameworks like React or Angular. Gain hands-on experience with real-world projects.', duration: '6 months', learners: '1,800' },
    { title: 'Business Analyst', description: 'Bridge business needs with technical solutions by learning process mapping and requirement gathering, and translating them into actionable insights. Includes real-world projects.', duration: '6 months', learners: '1,500' },
    { title: 'Cybersecurity', description: 'Protect systems from cyberattacks by mastering firewalls, encryption, and intrusion detection. Real-world training in security audits and threat management.', duration: '6 months', learners: '1,700' },
    { title: 'Data Analyst', description: 'Analyze and interpret data using tools like Excel, SQL, and Power BI. Learn to turn raw data into actionable insights with real-world datasets.', duration: '6 months', learners: '1,300' },
    { title: 'Data Engineering', description: 'Learn to design and maintain scalable data pipelines using tools like Python, SQL, and Spark. Gain expertise in managing and transforming big data.', duration: '6 months', learners: '1,200' },
    { title: 'Data Science', description: 'Explore machine learning, predictive analytics, and data visualization using Python and R. Work on real-world datasets to extract meaningful insights.', duration: '6 months', learners: '1,900' },
    { title: 'E-commerce', description: 'Learn the fundamentals of e-commerce, including online store creation, payment gateways, and inventory management. Build a live e-commerce platform.', duration: '6 months', learners: '1,100' },
    { title: 'Full Stack Development', description: 'Master both front-end (React/Angular) and back-end (Java/Spring Boot) development. Learn to build complete web applications through real-world projects.', duration: '6 months', learners: '2,200' },
    { title: 'Google Cloud', description: 'Master Google Cloud infrastructure, storage, and analytics tools. Learn to deploy scalable cloud applications with hands-on experience.', duration: '6 months', learners: '1,400' },
    { title: 'Linux', description: 'Gain expertise in Linux system administration, including server management and scripting. Hands-on training in managing Linux-based environments.', duration: '6 months', learners: '1,000' },
    { title: 'Power BI', description: 'Transform raw data into interactive dashboards and reports. Learn data visualization and analysis using real-world business projects.', duration: '6 months', learners: '1,500' },
    { title: 'Python', description: 'Learn Python programming for web development, data analysis, and automation. Hands-on training in building scalable solutions.', duration: '6 months', learners: '2,000' },
    { title: 'SAP', description: 'Master core SAP ERP functionalities like finance, HR, and supply chain management. Gain practical experience in enterprise-level projects.', duration: '6 months', learners: '1,800' },
    { title: 'UI/UX Design', description: 'Learn to design intuitive user interfaces and experiences. Gain expertise in wireframing, prototyping, and usability testing with real-world projects.', duration: '6 months', learners: '1,100' },
    { title: 'AWS Cloud', description: 'Master AWS services, including storage, computing, and databases. Hands-on training in building and managing scalable applications.', duration: '6 months', learners: '2,300' },
    { title: 'Azure', description: 'Learn Microsoft Azure cloud infrastructure and services, including virtual machines, databases, and application deployment. Real-world project experience included.', duration: '6 months', learners: '1,700' },
    { title: 'Digital Marketing', description: 'Learn SEO, content marketing, PPC, and social media strategies to master online promotion with real-world projects.', duration: '6 months', learners: '1,600' },
    { title: 'Business Communication', description: 'Enhance your professional communication skills, including presentation, email writing, and interpersonal communication, with corporate-level training in 6 months.', duration: '6 months', learners: '1,400' }
];

stars = Array(5).fill('★');

 // Method to get the first 3 courses to display
 displayedCourses() {
  return this.courses.slice(0, this.itemsPerSlide);
}
nextCourse() {
  this.currentIndex = (this.currentIndex < this.courses.length - 1) ? this.currentIndex + 1 : 0;
}

prevCourse() {
  if (this.currentIndex - this.itemsPerSlide >= 0) {
    this.currentIndex -= this.itemsPerSlide;
  }
}
}