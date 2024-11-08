import { Inject, Injectable  } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import{contactdetail} from '../Model/Contact';
import { Observable,catchError,map, throwError} from "rxjs";
import { json } from "stream/consumers";
import { text } from "node:stream/consumers";
import { environment } from '../utility/environment';

@Injectable
({providedIn:"root",
})
export class ContactService
{

     apiurl='https://localhost:7278/api/Contact';
 constructor(private http: HttpClient)
{} 

initializeFormGroup() {
  this.form.setValue({
    $key: null,
    Id:0,
    FirstName: '',
    LastName:'',
    Email: '',
    
  });
}
form: FormGroup = new FormGroup({
   Id:new FormControl('',Validators.required),
     $key: new FormControl(null),
     FirstName: new FormControl('', Validators.required),
     LastName: new FormControl('', Validators.required),
     Email: new FormControl('', Validators.email),
})

     getcontact():Observable<contactdetail[]>
     {
      const httpOptionss = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };

      return  this.http.get<contactdetail[]>(this.apiurl+'/GetAll',httpOptionss).pipe(
        catchError((error) => {
          console.error('Error fetching contacts', error);
          return throwError(error); // Rethrow the error for handling in the component
        })
      );
    }
      
     addcontact(cont:any):Observable<any>
     {
      const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      return this.http.post(`${this.apiurl}/AddContact`, cont, httpOptions).pipe(
          catchError((error: HttpErrorResponse) => {
              console.error('Error occurred:', error);
              if (error.status === 400 && error.error && error.error.errors) {
                  console.error('Validation errors:', error.error.errors);
              }
              return throwError(() => error);
          })
      );

     }
    
        deleteContact(id: any): Observable<any> {
      
        return this.http.delete<void>(`${this.apiurl}/Delete/${id}`);
        }     
        updatecontact( data: any): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put(this.apiurl+'/UpdateContact',data,httpOptions);
      }
        
        

      }