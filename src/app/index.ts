// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { EventService} from './services/event.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/authguard.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  EventService,
  AuthService,
  AuthGuardService
];