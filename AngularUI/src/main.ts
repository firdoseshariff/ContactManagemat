import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app/app.routes';
import { 
  PreloadAllModules, 
  provideRouter, 
  withDebugTracing, 
  withPreloading, 
  withRouterConfig 
} 
from '@angular/router';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent,appConfig
  // providers: [
  //   provideHttpClient(),
  // provideRouter(routes,withPreloading(PreloadAllModules), withDebugTracing()),
  // importProvidersFrom(BrowserModule, CommonModule)]
  ).catch((err) => console.error(err));
