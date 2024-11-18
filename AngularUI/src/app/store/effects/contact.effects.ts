import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContactService } from '../../../Service/ContactUserService';
import {
  loadContacts,
  loadContactsSuccess,
  loadContactsFailure,
  updateContact,
  deleteContact,
  deleteContactSuccess,
} from '../actions/contact.actions';

import { catchError, map, mergeMap,switchMap} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Action,Store } from '@ngrx/store';


@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions, private contactService: ContactService) {}

  
  
  
   loadContacts$ :Observable<Action>= createEffect(() =>
    this.actions$.pipe(
      ofType(loadContacts),
      switchMap(() =>
        this.contactService.getcontact().pipe(
          map((contacts) => loadContactsSuccess({ contacts })),
          catchError((error) => of(loadContactsFailure({ error })))
        )
      )
    )
  );

 

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact),
      mergeMap((action) =>
        this.contactService.deleteContact(action.id).pipe(
          map(() => deleteContactSuccess({ id: action.id })),
          catchError((error) => of(loadContactsFailure({ error })))
        )
      )
    )
  );
}

