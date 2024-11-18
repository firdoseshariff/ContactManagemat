import { createFeature, createReducer, on } from '@ngrx/store';
import { loadContactsSuccess, loadContactsFailure } from '../actions/contact.actions';
import { contactdetail } from '../../../Model/Contact';

export interface ContactState {
  contacts: contactdetail[];
  loading: boolean;
  error: string | null;
}