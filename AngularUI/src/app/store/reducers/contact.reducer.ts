import { Action, ActionReducerMap, createFeature, createReducer, on, State } from '@ngrx/store';
import { loadContactsSuccess, updateContact, deleteContactSuccess } from '../actions/contact.actions';
import { contactdetail } from '../../../Model/Contact';
export const ENTITY_FEATURE_KEY="e";
export interface ContactStateInter {
  contacts: contactdetail[];
  loading: boolean;
  error: string | null;
}
export interface ContactState {
  contacts: contactdetail[];
  loading: boolean;
  error: any;
}

export const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};
export const initialStat: ContactStateInter = {
  contacts: [],
  loading: false,
  error: null,
};

export const contactReducer = createReducer(
  initialState,
  on(loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts,
    loading: false,
  })),
  on(updateContact, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map((c) => (c.Id === contact.Id ? contact : c)),
  })),
  on(deleteContactSuccess, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter((contact) => contact.Id !== id),
  }))
);
export const contactFeature = createFeature({
  name: 'contacts',
  reducer: contactReducer,
});
