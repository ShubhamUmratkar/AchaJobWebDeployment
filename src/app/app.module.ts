import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CertificationComponent } from './component/certification/certification.component';
import { FooterComponent } from './component/footer/footer.component';
import { HiringPartnerComponent } from './component/hiring-partner/hiring-partner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HomepageComponent } from './component/homepage/homepage.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { InternshipComponent } from './component/internship/internship.component';
import { JobSliderComponent } from './component/job-slider/job-slider.component';
import { InternshipSliderComponent } from './component/internship-slider/internship-slider.component';
import { LoginComponent } from './component/login/login.component';
import { AdminpanelComponent } from './component/adminpanel/adminpanel.component';
import { AdminloginComponent } from './component/adminlogin/adminlogin.component';
import { AdminlogindynamicComponent } from './component/adminlogindynamic/adminlogindynamic.component';


import { RegisterComponent } from './component/register/register.component';
import { UserlistComponent } from './component/userlist/userlist.component';
import { ViewAllInternshipComponent } from './component/view-all-internship/view-all-internship.component';
import { SaveJobComponent } from './component/save-job/save-job.component';
import { ViellAllJobsComponent } from './component/view-all-jobs/viell-all-jobs.component';
import { JobspostsComponent } from './component/jobsposts/jobsposts.component';
import { FaqsComponent } from './component/faqs/faqs.component';
import { InternshipDetailsComponent } from './component/internship-details/internship-details.component';
import { ViewJobComponent } from './component/view-job/view-job.component';
import { ApplyJobComponent } from './component/apply-job/apply-job.component';
import { ApplyInternshipComponent } from './component/apply-internship/apply-internship.component';
import { ViewAllFormsAdminComponent } from './component/view-all-forms-admin/view-all-forms-admin.component';
import { UserhomepageComponent } from './component/userhomepage/userhomepage.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminregisterComponent } from './component/adminregister/adminregister/adminregister.component';
import { SuperAdminComponent } from './component/super-admin/super-admin.component';
import { FrequentlyQuestionComponent } from './component/frequently-question/frequently-question.component';
import { SliderComponent } from './component/slider/slider.component';
import { EditprofileComponent } from './component/editprofile/editprofile.component';
import { MockInterviewComponent } from './component/mockinterview/mockinterview.component';
import { PlacementComponent } from './component/placement/placement.component';
import { UserMockinterviewComponent } from './component/user-mockinterview/user-mockinterview.component';
import { UserPlacementComponent } from './component/user-placement/user-placement.component';
import { InternshippostsComponent } from './component/internshipposts/internshipposts.component';
import { PlacementPreparationComponent } from './component/placement-preparation/placement-preparation.component';
import { InterviewPreparationComponent } from './component/interview-preparation/interview-preparation.component';
import { AllcoursesComponent } from './component/allcourses/allcourses.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { AdminForgetComponent } from './component/admin-forget/admin-forget.component';
import { AdminResetPassComponent } from './component/admin-reset-pass/admin-reset-pass.component';
import { EditAdminComponent } from './component/edit-admin/edit-admin.component';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { PopupComponent } from './component/popup/popup.component';
import { CreateResumeComponent } from './component/create-resume/create-resume.component';
import { GuidanceAdviceComponent } from './component/guidance-advice/guidance-advice.component';
import { CareerAdviceComponent } from './component/career-advice/career-advice.component';




@NgModule({
  declarations: [
    AppComponent,
    CertificationComponent,
    FooterComponent,
    HiringPartnerComponent,

    HomepageComponent,
    NavbarComponent,
    InternshipComponent,
    JobSliderComponent,
    InternshipSliderComponent,
    LoginComponent,
    AdminpanelComponent,
    AdminloginComponent,
    AdminlogindynamicComponent,
    AdminregisterComponent,
    RegisterComponent,
    UserlistComponent,
    ViewAllInternshipComponent,
    SaveJobComponent,
    ViellAllJobsComponent,
    JobspostsComponent,
    FaqsComponent,
    InternshipDetailsComponent,
    ViewJobComponent,
    ApplyJobComponent,
    ApplyInternshipComponent,
    ViewAllFormsAdminComponent,
    UserhomepageComponent,
    SuperAdminComponent,
    FrequentlyQuestionComponent,
    SliderComponent,
    EditprofileComponent,
    MockInterviewComponent,
    PlacementComponent,
    UserMockinterviewComponent,
    UserPlacementComponent,
    InternshippostsComponent,
    PlacementPreparationComponent,
    InterviewPreparationComponent,
    AllcoursesComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminForgetComponent,
    AdminResetPassComponent,
    EditAdminComponent,


    PopupComponent,
    CreateResumeComponent,
    GuidanceAdviceComponent,
    CareerAdviceComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
