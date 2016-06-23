import { RouterConfig } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';
import {ExamStartComponent} from './exam/examstart.component';

export const routes: RouterConfig =[
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registerstart', component: RegisterStartComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'examstart', component: ExamStartComponent}
];
