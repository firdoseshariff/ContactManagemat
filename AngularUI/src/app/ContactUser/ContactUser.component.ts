import{ApplicationRef, Component, NgZone, OnInit,inject} from '@angular/core';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { contactdetail } from '../../Model/Contact';
import { ContactService } from '../../Service/ContactUserService';
import { ToastrService} from 'ngx-toastr';
import { ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
    ReactiveFormsModule,
  } from '@angular/forms';
  import Validation from '../../utility/validation'

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { error } from 'console';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component
({
selector:'app-contact',
templateUrl:'./ContactUser.component.html',

standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,MatInputModule,MatIconModule],
   
styleUrl:'./ContactUser.component.css',
host:{ngSkipHydration: 'false'}

})
export class UserContact implements OnInit
{
  
  router = inject(Router);
  route = inject(ActivatedRoute);
  service=inject(ContactService);

    form: FormGroup = new FormGroup({
        FirstName: new FormControl(''),
        LastName: new FormControl(''),
        Email: new FormControl('')
});
submitted=false;

constructor(private formBuilder: FormBuilder,private toster:ToastrService,
  public dialogRef: MatDialogRef<UserContact>
) {
  const applicationRef = inject(ApplicationRef);
  applicationRef.isStable.pipe( first((isStable) => isStable) ).subscribe(() => {
   
    setTimeout(() => {1000});
  
 
  });
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
      FirstName: ['', 
        [
          Validators.required
        ,Validators.maxLength(20),
        Validators.minLength(3),
         ],   ],
        LastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
          ],
        ],
        Email: ['', [Validators.required, Validators.email]],
        
        
      },
      
    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

 onSubmit(): void {
    this.submitted= true;

    if (this.form.invalid) {
      return;
    }
 this.postContact();
    console.log(JSON.stringify(this.form.value, null, 2));
  }
  

  onReset(): void {
    this.submitted= false;
    this.form.reset();
    
  }
  postContact()
  {

       this.service.addcontact(this.form.value)
.subscribe({
  next: (res) =>{

    this.toster.success('Contact added successfully','Success');
    //alert("data added successfully");
    console.log(res);
  },error:(error)=>console.error("no data added",error)
  });
  }
closecontact()
{
this.dialogRef.close(null)
}

}