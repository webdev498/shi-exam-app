
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import {NG2_UI_AUTH_PROVIDERS, JwtHttp} from 'ng2-ui-auth';

const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

import { AppModule } from './app/app.module';


export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

// boot on document ready
bootloader(main);