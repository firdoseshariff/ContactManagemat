import { Inject, Injectable  } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import{contactdetail} from '../Model/Contact';
import { Observable,map} from "rxjs";
import { json } from "stream/consumers";
import { text } from "node:stream/consumers";
import { environment } from '../utility/environment';

@Injectable
({providedIn:"root",
})
export class ContactService
{

     apiurl='https://localhost:7278/api/Contact/';
 constructor(private http: HttpClient)
{} 

form: FormGroup = new FormGroup({
     $key: new FormControl(null),
     FirstName: new FormControl('', Validators.required),
     LastName: new FormControl('', Validators.required),
     Email: new FormControl('', Validators.email),
})
     getcontact()
     {
      const httpOptionss = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
      return  this.http.get<any[]>(this.apiurl+'GetAll',httpOptionss);

      }
     
     addcontact(cont:any):Observable<any>
     {
          const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
return this.http.post(this.apiurl+'AddContact',cont,httpOptions);
     }

     initializeFormGroup() {
          this.form.setValue({
            $key: null,
            Id:0,
            FirstName: '',
            LastName:'',
            Email: '',
            
          });
        }

        delete(id: any): Observable<any> {
          return this.http.delete(`${this.apiurl}}/${id}`);
        }
      
      
          updatecontact(id: any, data: any): Observable<any> {
               return this.http.put(`${this.apiurl}/${id}`, data);
      }
        deleteAll(): Observable<any> {
          return this.http.delete(this.apiurl);
        }
        populateForm(UserContact: any) {
          this.form.setValue(UserContact.Id);
        
        }
        public getData = (route: string) => {
          return this.http.get(this.createCompleteRoute(route, environment.apiurl));
        }

        private createCompleteRoute = (route: string, envAddress: string) => {
          return `${envAddress}/${route}`;
        }
       
        private generateHeaders = () => {
          return {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
        }
        public update = (route: string ,body: any) => {
          return this.http.put(this.createCompleteRoute(route, environment.apiurl), body, this.generateHeaders());
        }
       
        public deletecon = (route: string) => {
          return this.http.delete(this.createCompleteRoute(route, environment.apiurl));
        }

      }