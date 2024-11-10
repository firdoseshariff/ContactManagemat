 import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild,Input, ChangeDetectionStrategy} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource} from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig} from "@angular/material/dialog";
import{MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'
import{MatInputModule} from '@angular/material/input';
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
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {  Observable, Subject } from 'rxjs';
import { ContactUserEditUpdate } from '../ContactUserEdit/ContactUserEdit.component';
// import { Interceptor } from '../../Service/Interceptors';
@Component
({
selector:'app-contactgrid',
templateUrl:'./ContactUserGrid.html',
standalone: true,
changeDetection: ChangeDetectionStrategy.OnPush,
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
   
styleUrl:'./ContactUserGrid.css',

})
export class ContactGrid implements OnInit
{
  toaster=inject(ToastrService);
  service=inject(ContactService);
  dialog=inject(MatDialog);
  displayedColumns: string[] = ['Id','FirstName', 'LastName', 'Email','Action'];
  @ViewChild(MatSort)
  sort!: MatSort ;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey:string="search";
    dataSource: MatTableDataSource<contactdetail> = new MatTableDataSource();
    private destroy$ = new Subject<void>();
@Input() contuser:contactdetail=
{
Id:0,
FirstName:"",
LastName:"",
Email:""
} 


ngOnInit(): void {
 
  console.log('Component initialized:', this);
  this.fetchData();
  
  
}
  
      
  
  fetchData() {
    this.service.getcontact(). subscribe(
      (res) => {
        console.table(res);
        this.dataSource.data = [...res];
        
      },
        );
  }
  
 
        ngAfterViewInit(): void {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator
          console.log(this.sort);
                
         }
      
        doFilter(event: Event) {
          const filter = (event.target as HTMLInputElement).value;
          this.dataSource.filter = filter.trim().toLowerCase();
        }

  
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
       dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(UserContact,dialogConfig);
  
  }
   

OnUpdate(updatedContact: contactdetail): void {
  const index = this.dataSource.data.findIndex(c => c.Id === updatedContact.Id);
  if (index !== -1) {
    this.dataSource.data[index] = updatedContact;
    this.dataSource = new MatTableDataSource(this.dataSource.data); 
  }
}

  onEdit(id:any): void {
  
  const contact = this.dataSource.data.find(c => c.Id === id);
    
  const dialogRef = this.dialog.open(ContactUserEditUpdate, {
    width: '400px',
  data: { contact }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
      this.OnUpdate(result);
    }
  });
  
}


onDelete(id: number): void {
  console.log('Delete contact with id', id);
  
    if (confirm('Are you sure you want to delete this contact?')) {
    
    this.service.deleteContact(id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(contact => contact.Id !== id);
      this.toaster.success("contact deleted")
      console.log(`Contact with id ${id} deleted`);
    });
  }
}

}  

