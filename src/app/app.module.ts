import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, provideForms, disableDeprecatedForms } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, bootloader } from '@angularclass/hmr';

import {NG2_UI_AUTH_PROVIDERS, JwtHttp} from 'ng2-ui-auth';

const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

import { APP_PROVIDERS } from './index';
import { AppStore } from './app.store';

import {App} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';
import {ExamStartComponent} from './exam/examstart.component';
import {ExamComponent} from './exam/exam.component';
import {ExamCompleteComponent} from './exam/examcomplete.component';
import {StudyComponent} from './study/study.component';
import {AccountComponent} from './account/account.component';
import {AccountConfirmationComponent} from './account/accountconfirmation.component';

import { routing } from './app.routes';

@NgModule({
    bootstrap: [App],
    imports:      [ BrowserModule, FormsModule, RouterModule, HttpModule, routing ],
    declarations: [ HomeComponent, LoginComponent, RegisterStartComponent, RegisterComponent,
                    ForgotPasswordComponent, ExamStartComponent, ExamComponent, ExamCompleteComponent,
                    StudyComponent, AccountComponent, AccountConfirmationComponent, App],
    providers: [
        disableDeprecatedForms(),
        provideForms(),
    ...APP_PROVIDERS,
    AppStore,
    NG2_UI_AUTH_PROVIDERS({defaultHeaders: DEFAULT_POST_HEADER, 
      providers: {google: {clientId: GOOGLE_CLIENT_ID, url: API_HOST + '/login/google'}, 
      facebook: {clientId: FACEBOOK_CLIENT_ID, url: API_HOST + '/login/facebook'}}})
  ]
})
export class AppModule { }