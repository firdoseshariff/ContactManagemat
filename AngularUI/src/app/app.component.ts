import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { PreloadAllModules, provideRouter, withPreloading, withDebugTracing } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink,RouterLinkActive,RouterLinkWithHref],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host:{ngSkipHydration: 'false'}

})
export class AppComponent {
  title = 'contact';
}
