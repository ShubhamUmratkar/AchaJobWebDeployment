import { Component } from '@angular/core';

@Component({
  selector: 'app-frequently-question',
  templateUrl: './frequently-question.component.html',
  styleUrls: ['./frequently-question.component.css']
})
export class FrequentlyQuestionComponent {

  activeIndex: number | null = null;

  faqs = [
    {
      question: 'How can I post a job on AchaJob?',
      answer: 'Log into your employer account and click on Post a Job. Fill out the job description, requirements, and other details. Once submitted, the job post will go live after a quick review.'
    },
    {
      question: 'Can I search for candidates directly?',
      answer: 'Yes, with our resume database access plans, you can search and contact candidates who match your job requirements directly.'
    },
    {
      question: 'Are there packages available for bulk job postings?',
      answer: 'Yes, AchaJob offers multiple pricing plans for bulk job postings. Contact our sales team for customized solutions.'
    },
    {
      question: 'How can I manage applications received for my job postings?',
      answer: 'Log into your account and go to the Applications section. You can review, shortlist, and contact candidates directly from your dashboard.'
    },
    {
      question: 'Is there customer support available for employers?',
      answer: 'Absolutely! You can reach out to us via the Contact Us page or email us at info@acchajobs.com for assistance.'
    }
  ];

  toggleFaq(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
