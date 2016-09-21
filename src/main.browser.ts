
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import {enableProdMode} from '@angular/core';

import { AppModule } from './app/app.module';

export function main() {
  if (ENV === 'production')
    enableProdMode();
    
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

bootloader(main);