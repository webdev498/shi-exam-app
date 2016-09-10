
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { AppModule } from './app/app.module';

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

bootloader(main);