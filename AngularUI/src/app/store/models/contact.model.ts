import { contactdetail } from "../../../Model/Contact";

export interface ContactStateInter {
  contacts: contactdetail[];
  loading: boolean;
  error: string | null;
}