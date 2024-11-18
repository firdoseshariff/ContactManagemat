import { createSelector } from '@ngrx/store';
import { ContactState,ENTITY_FEATURE_KEY } from '../reducers/contact.reducer';
import { createFeatureSelector} from "@ngrx/store";


export const selectContacts = (state: any) => state.contact;

export const selectAllContacts = createSelector(
  selectContacts,
  (state: ContactState) => state.contacts
);