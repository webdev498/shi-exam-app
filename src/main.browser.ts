
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, bootloader } from '@angularclass/hmr';

import {NG2_UI_AUTH_PROVIDERS, JwtHttp} from 'ng2-ui-auth';

const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

import { App, APP_PROVIDERS } from './app';
import { AppStore } from './app/app.store';
import { AppModule } from './app/app.module';

@NgModule({
  boostrap: [App],
  declarations: [App],
  imports: [
    HttpModule,
    RouterModule,
    // app
    AppModule
    // vendors
  ],
  providers: [
    ...APP_PROVIDERS,
    AppStore,
    NG2_UI_AUTH_PROVIDERS({defaultHeaders: DEFAULT_POST_HEADER, 
      providers: {google: {clientId: GOOGLE_CLIENT_ID, url: API_HOST + '/login/google'}, 
      facebook: {clientId: FACEBOOK_CLIENT_ID, url: API_HOST + '/login/facebook'}}})
  ]
})

class MainModule {
  constructor(public appRef: ApplicationRef, public appStore: AppStore) {

  }

  hmrOnInit(store) {
    console.log('HMR store', store);
    if (store) {
      let newState = Object.assign({}, store);
      this.appStore.setState(store);
    }
  }
  hmrOnDestroy(store) {
    var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    var currentState = this.appStore.getState();
    Object.assign(store, currentState);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation)
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts;
  }

}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

// boot on document ready
bootloader(main);