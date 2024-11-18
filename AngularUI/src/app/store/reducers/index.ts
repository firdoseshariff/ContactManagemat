import { ActionReducerMap, createFeature } from '@ngrx/store';
import { contactReducer, ContactState } from './contact.reducer';
//import { ContactStateInter } from '../models/contact.model';

export const contactFeature = createFeature({
  name: 'contacts', // The feature name in the store
  reducer: contactReducer, // The reducer function
});
export interface AppState {
  contacts: ContactState;
}

export const reducers: ActionReducerMap<AppState> = {
  contacts: contactReducer,
};