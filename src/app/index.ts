// App
export * from './app.component';

import {EventService} from './services/event.service';
import {AnalyticsService} from './services/analytics.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/authguard.service';
import {LoggingService} from './services/logging.service';

// Application wide providers
export const APP_PROVIDERS = [
  EventService,
  AnalyticsService,
  AuthService,
  AuthGuardService,
  LoggingService
];