import { NgModule }      from '@angular/core';
import { CommonModule }      from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { ApplicationRef }      from '@angular/core';

import {Ng2UiAuthModule, CustomConfig, JwtHttp} from 'ng2-ui-auth';

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
import {RegisterConfirmComponent} from './register/registerconfirm.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';
import {ExamStartComponent} from './exam/examstart.component';
import {ExamComponent} from './exam/exam.component';
import {ExamCompleteComponent} from './exam/examcomplete.component';
import {ExamHistoryComponent} from './examhistory/examhistory.component';
import {StudyComponent} from './study/study.component';
import {AgreementComponent} from './study/agreement.component';
import {AccountComponent} from './account/account.component';
import {AccountConfirmationComponent} from './account/accountconfirmation.component';
import {MultipleChoice} from './questions/multiplechoice/multiplechoice.component';
import {Matching} from './questions/matching/matching.component';
import {Grouping} from './questions/grouping/grouping.component';

import { routing } from './app.routes';

export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    providers = {
          google: {clientId: GOOGLE_CLIENT_ID, url: API_HOST + '/login/google'}, 
          facebook: {clientId: FACEBOOK_CLIENT_ID, url: API_HOST + '/login/facebook'}}
}

@NgModule({
    bootstrap: [App],
    imports:      [ BrowserModule, FormsModule, RouterModule, HttpModule, routing, 
    Ng2UiAuthModule.getWithConfig(MyAuthConfig), 
    CommonModule
    ],
    declarations: [ HomeComponent, LoginComponent, RegisterStartComponent, RegisterComponent,
                    ForgotPasswordComponent, ExamStartComponent, ExamComponent, ExamCompleteComponent,
                    ExamHistoryComponent,
                    StudyComponent, AccountComponent, AccountConfirmationComponent, 
                    RegisterConfirmComponent, AgreementComponent,
                    MultipleChoice, Matching, Grouping, App],
    providers: [
    ...APP_PROVIDERS,
    AppStore
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appStore: AppStore) {}
  hmrOnInit(store) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // restore state
    this.appStore.setState(store.state);
    // restore input values
    if ('restoreInputValues' in store) { store.restoreInputValues(); }
    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    const currentState = this.appStore.getState();
    store.state = currentState;
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}