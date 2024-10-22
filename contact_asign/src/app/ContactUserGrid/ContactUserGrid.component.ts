import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild,Input, NgZone} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MatTableDataSource} from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig} from "@angular/material/dialog";
import{MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import{MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import{MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from "@angular/material/icon";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactService } from '../../Service/ContactUserService';
import { UserContact } from '../ContactUser/ContactUser.component';
import { contactdetail } from '../../Model/Contact';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

@Component
({
selector:'app-contactgrid',
templateUrl:'./ContactUserGrid.html',
standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,
    FlexLayoutServerModule,
     FlexLayoutModule,
        MatToolbarModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
    
      
      ],
    // { provide: ToastrService, useClass: ToastrService },
    // { provide: ToastNoAnimation, useClass: ToastNoAnimation }
  //]
styleUrl:'./ContactUserGrid.css'
})
export class ContactGrid implements OnInit
{
  toaster=inject(ToastrService);
  service=inject(ContactService);
  dialog=inject(MatDialog);
   public listData=new MatTableDataSource<any>();
  //listData: any=[];
  displayedColumns: string[] = ['Id','FirstName', 'LastName', 'Email','update','delete'];
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey:string="search";
@Input() contuser:contactdetail=
{
Id:0,
FirstName:"",
LastName:"",
Email:""
}
constructor(){
  const ngZone = inject(NgZone);
  ngZone.runOutsideAngular(() => {
    setInterval(() => {}, 1000)
  
});
}
  ngOnInit(): void {
this.getContact();
  }
  public getContact()
  {
    this.service.getcontact().subscribe
    (
   
       res=> {
          this.listData.data=res as contactdetail[];
        // this.listData.sort=this.sort;
        });
      
        }
        ngAfterViewInit(): void {

          this.listData.sort = this.sort;
          this.listData.paginator=this.paginator;
        }
        public redirectToDetails = (Id:number) => {
    
        }
        public redirectToUpdate = (Id: number) => {
          
        }
        public redirectToDelete = (Id:number) => {
          
        }
        public doFilter = (value: string) => {
          this.listData.filter = value.trim().toLocaleLowerCase();
        }
      
    

  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(UserContact,dialogConfig);
  
  }

  

  
  
OnUpdate()
{
  this.service.updatecontact(this.contuser.Id,this.contuser).subscribe
  ({
    next:(res)=>
    {
       this.toaster.success("updated");
    },
    error:(er)=>console.error(er)

  });
}

}

