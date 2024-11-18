import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserContact } from './ContactUser/ContactUser.component';
import { ContactGrid } from './ContactUserGrid/ContactUserGrid.component';
import {  ContactUserEditUpdate } from './ContactUserEdit/ContactUserEdit.component';

export const routes: Routes= [

    
     
      {
path:'MyContact',
component:UserContact
      
     },
     {
      path:'UserGrid',
      //loadComponent:()=>import('./ContactUserGrid/ContactUserGrid.component').then((m)=>m.ContactGrid)
        component:ContactGrid
     
      
     //loadChildren:() => import('./ContactUserGrid/ContactUserGrid.route').then((m)=>m.CONTACTGRID_ROUTES),
     },
     {
     path:'EditUser',
     component:ContactUserEditUpdate
      //loadChildren:() => import('./ContactUserEdit/ContactUserEdit.route').then((m)=>m.EDITCONTACT_ROUTES),
     }

    ];
    //   }
    // ]