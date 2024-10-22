import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserContact } from './ContactUser/ContactUser.component';
import { ContactGrid } from './ContactUserGrid/ContactUserGrid.component';

//export const routes: Routes = [];
export const routes: Routes= [

    // {
    //     path: "",
    //     pathMatch: "full",
    //     redirectTo: "AppComponent"
    //   },
     
      {
path:'MyContact',
component:UserContact
      
//loadChildren:()=>import('./ContactUser/ContactUser.route').then((m) => m.CONTACT_ROUTES),
//loadComponent:()=>import('./ContactUser/ContactUser.component').then((m)=>m.UserContact)
      },
     {
      path:'UserGrid',
      //loadComponent:()=>import('./ContactUserGrid/ContactUserGrid.component').then((m)=>m.ContactGrid)
        component:ContactGrid
     
      
     //loadChildren:() => import('./ContactUserGrid/ContactUserGrid.route').then((m)=>m.CONTACTGRID_ROUTES),
     }

    ];
    //   }
    // ]