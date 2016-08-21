/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';
/*
* Platform and Environment
* our providers/directives/pipes
*/
import { PLATFORM_PROVIDERS } from './platform/browser';
import { decorateComponentRef } from './platform/environment';

import {HTTP_PROVIDERS} from '@angular/http';
import {NG2_UI_AUTH_PROVIDERS, JwtHttp} from 'ng2-ui-auth';

const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

/*
* App Component
* our top level component that holds all of our components
*/
import { App, APP_PROVIDERS } from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(App, [
    ...PLATFORM_PROVIDERS,
    ...APP_PROVIDERS,
    HTTP_PROVIDERS,
    NG2_UI_AUTH_PROVIDERS({defaultHeaders: DEFAULT_POST_HEADER, 
      providers: {google: {clientId: GOOGLE_CLIENT_ID, url: API_HOST + '/login/google'}, 
      facebook: {clientId: FACEBOOK_CLIENT_ID, url: API_HOST + '/login/facebook'}}})
  ])
  .then(decorateComponentRef)
  .catch(err => console.error(err));

}





/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * You can also import them in vendors to ensure that they are bundled in one file
 * Also see custom-typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when document is ready
  document.addEventListener('DOMContentLoaded', () => main());
}