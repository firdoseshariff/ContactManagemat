import { Routes } from '@angular/router';

export const EDITCONTACT_ROUTES: Routes = [

{
  path: 'EditUser',
 loadComponent: () => import('./ContactUserEdit.component').then((m) => m.ContactUserEditUpdate),
 // component:UserContact
}
];