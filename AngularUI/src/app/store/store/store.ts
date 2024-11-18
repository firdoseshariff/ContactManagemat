import { Action, ActionReducer } from "@ngrx/store";
import { contactdetail } from "../../../Model/Contact";
import { contactReducer, ContactState } from "../reducers/contact.reducer";
import { ContactEffects } from "../effects/contact.effects";

export interface AppState {
    todo: contactdetail
  }
  
  export interface AppStore {
    todo: ActionReducer<ContactState, Action>;
  }
  
  export const appStore: AppStore = {
    todo: contactReducer
  }
  
  export const appEffects = [ContactEffects];