import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient, withFetch,withInterceptors } from '@angular/common/http';
import { HttpsRequestInterceptor } from '../Service/Interceptors';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),provideHttpClient(withFetch()),HttpsRequestInterceptor,provideToastr(),provideAnimations()]};
