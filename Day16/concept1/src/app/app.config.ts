import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LOGGER, CONFIG, SELF_SERVICE, PARENT_SERVICE } from './decorator-examples/decorator-examples.component';

// Simple logger implementation
const logger = {
  log: (message: string) => console.log(`[Logger] ${message}`),
  error: (message: string) => console.error(`[Logger] ${message}`),
  warn: (message: string) => console.warn(`[Logger] ${message}`)
};

// Configuration object
const config = {
  environment: 'development',
  apiVersion: '1.0.0',
  features: {
    logging: true,
    analytics: false
  }
};

// Service implementations
const selfService = {
  name: 'SelfService',
  version: '1.0.0'
};

const parentService = {
  name: 'ParentService',
  version: '1.0.0'
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: 'API_URL', useValue: 'https://api.example.com' },
    { provide: LOGGER, useValue: logger },
    { provide: CONFIG, useValue: config },
    { provide: SELF_SERVICE, useValue: selfService },
    { provide: PARENT_SERVICE, useValue: parentService }
  ]
};
