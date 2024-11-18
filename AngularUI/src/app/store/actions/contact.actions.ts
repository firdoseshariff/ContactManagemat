import { createAction, props } from '@ngrx/store';
import { contactdetail } from '../../../Model/Contact';

export const loadContacts = createAction('[Contact] Load Contacts');
export const loadContactsSuccess = createAction(
  '[Contact] Load Contacts Success',
  props<{ contacts: contactdetail[] }>()
);
export const loadContactsFailure = createAction(
  '[Contact] Load Contacts Failure',
  props<{ error: any }>()
);

export const updateContact = createAction(
  '[Contact] Update Contact',
  props<{ contact: contactdetail }>()
);

export const deleteContact = createAction(
  '[Contact] Delete Contact',
  props<{ id: number }>()
);

export const deleteContactSuccess = createAction(
  '[Contact] Delete Contact Success',
  props<{ id: number }>()
);