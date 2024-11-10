import { Routes } from '@angular/router';
import { ContactGrid  } from './ContactUserGrid.component';

export const CONTACTGRID_ROUTES: Routes = [
//     {
//     path: '',
//     pathMatch:'full',
//     component: ContactGrid,
// },
{
  path: 'UserGrid',
  loadComponent: () => import('./ContactUserGrid.component').then((r)=>r.ContactGrid)
 // component:ContactGrid
}
];