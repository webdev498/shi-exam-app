import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { CommonModule }      from '@angular/common';

import {Ng2UiAuthModule, CustomConfig} from 'ng2-ui-auth';
import {ChartsModule} from 'ng2-charts';

const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

import {App} from './app.component';
import {AboutComponent} from './info/about.component';
import {AgreementComponent} from './study/agreement.component';
import {AccountComponent} from './account/account.component';
import {AccountConfirmationComponent} from './account/accountconfirmation.component';
import {ContactComponent} from './info/contact.component';
import {CategoriesComponent} from './study/category/categories.component';
import {ExamStartComponent} from './exam/examstart.component';
import {ExamComponent} from './exam/exam.component';
import {ExamCompleteComponent} from './exam/examcomplete.component';
import {ExamHistoryComponent} from './examhistory/examhistory.component';
import {FAQComponent} from './info/faq.component';
import {MultipleChoice} from './questions/multiplechoice/multiplechoice.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PremiumUpgradeComponent} from './premiumupgrade/premiumupgrade.component';
import {RegisterStartComponent} from './register/registerstart.component';
import {RegisterComponent} from './register/register.component';
import {RegisterConfirmComponent} from './register/registerconfirm.component';
import {ForgotPasswordComponent} from './forgotpassword/forgotpassword.component';

import {StudyComponent} from './study/study.component';
import {StudyQuestionChoiceComponent} from './studyquestionchoice/studyquestionchoice.component';
import {Matching} from './questions/matching/matching.component';
import {Grouping} from './questions/grouping/grouping.component';
import {FillInBlankComponent} from './questions/fillinblank/fillinblank.component';
import {FlashcardComponent} from './questions/flashcard/flashcard.component';
import {FeedbackComponent} from './questions/feedback/feedback.component';

import { ROUTES } from './app.routes';

export class MyAuthConfig extends CustomConfig {
    defaultHeaders = {'Content-Type': 'application/json'};
    baseUrl = api_host;
    providers = {
          google: {clientId: google_client_id, url: '/login/google'}, 
          facebook: {clientId: facebook_client_id, url: '/login/facebook'}}
}

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
    bootstrap: [App],
    imports:      [ BrowserModule, FormsModule, 
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    HttpModule, 
    Ng2UiAuthModule.forRoot(MyAuthConfig), 
    CommonModule, ChartsModule
    ],
    declarations: [ HomeComponent, LoginComponent, RegisterStartComponent, RegisterComponent,
                    ForgotPasswordComponent, ExamStartComponent, ExamComponent, ExamCompleteComponent,
                    ExamHistoryComponent, PremiumUpgradeComponent, FillInBlankComponent, FlashcardComponent,
                    FeedbackComponent,
                    StudyQuestionChoiceComponent,
                    StudyComponent, AccountComponent, AccountConfirmationComponent, 
                    RegisterConfirmComponent, AgreementComponent, ContactComponent,
                    FAQComponent, AboutComponent, CategoriesComponent,
                    MultipleChoice, Matching, Grouping, App],
    providers: [
    ...APP_PROVIDERS,
    ENV_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}