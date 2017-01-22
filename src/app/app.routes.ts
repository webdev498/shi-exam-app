import { Routes, RouterModule} from '@angular/router';

import {AboutComponent} from './info/about.component';
import {ContactComponent} from './info/contact.component';
import {FAQComponent} from './info/faq.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {RegisterConfirmComponent} from './register/registerconfirm.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';
import {ExamStartComponent} from './exam/examstart.component';
import {ExamComponent} from './exam/exam.component';
import {ExamCompleteComponent} from './exam/examcomplete.component';
import {ExamHistoryComponent} from './examhistory/examhistory.component';
import {PremiumUpgradeComponent} from './premiumupgrade/premiumupgrade.component';
import {StudyComponent} from './study/study.component';
import {AgreementComponent} from './study/agreement.component';
import {AccountComponent} from './account/account.component';
import {AccountConfirmationComponent} from './account/accountconfirmation.component';

import {AuthGuardService} from './services/authguard.service';

const routes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'faq', component: FAQComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registerstart', component: RegisterStartComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'registerconfirm', component: RegisterConfirmComponent, canActivate: [AuthGuardService]},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'examstart', component: ExamStartComponent, canActivate: [AuthGuardService]},
  { path: 'exam', component: ExamComponent, canActivate: [AuthGuardService]},
  { path: 'examcomplete', component: ExamCompleteComponent, canActivate: [AuthGuardService]},
  { path: 'premiumupgrade', component: PremiumUpgradeComponent, canActivate: [AuthGuardService]},
  { path: 'examhistory', component: ExamHistoryComponent, canActivate: [AuthGuardService]},
  { path: 'study', component: StudyComponent, canActivate: [AuthGuardService]},
  { path: 'studyagreement', component: AgreementComponent, canActivate: [AuthGuardService]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'confirmation', component: AccountConfirmationComponent, canActivate: [AuthGuardService] }
];

export const routing = RouterModule.forRoot(routes, {
      useHash: true
    });
