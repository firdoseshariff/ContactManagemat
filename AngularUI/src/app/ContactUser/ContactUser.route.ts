import { Routes } from '@angular/router';
import { UserContact } from './ContactUser.component';

export const CONTACT_ROUTES: Routes = [

{
  path: 'MyContact',
 loadComponent: () => import('./ContactUser.component').then((m) => m.UserContact),
 // component:UserContact
}
];
