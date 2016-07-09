// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { EventService} from './services/event.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  EventService
];