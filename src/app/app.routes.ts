import { RouterConfig } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';
import {ExamStartComponent} from './exam/examstart.component';
import {AccountComponent} from './account/account.component';
import {AccountConfirmationComponent} from './account/accountconfirmation.component';

import {AuthGuardService} from './services/authguard.service';

export const routes: RouterConfig =[
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registerstart', component: RegisterStartComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'examstart', component: ExamStartComponent, canActivate: [AuthGuardService]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService] },
  { path: 'confirmation', component: AccountConfirmationComponent, canActivate: [AuthGuardService] }
];
