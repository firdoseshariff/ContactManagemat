import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactGrid } from './ContactUserGrid';
import { ContactService } from '../../Service/ContactUserService';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { contactdetail } from '../../Model/Contact';
import { UserContact } from '../ContactUser/ContactUser.component';
import { ContactUserEditUpdate } from '../ContactUserEdit/ContactUserEdit.component';

describe('ContactGrid', () => {
  let component: ContactGrid;
  let fixture: ComponentFixture<ContactGrid>;
  let contactServiceMock: jasmine.SpyObj<ContactService>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let matDialogMock: jasmine.SpyObj<MatDialog>;

  const mockContacts: contactdetail[] = [
    { Id: 1, FirstName: 'John', LastName: 'Doe', Email: 'john.doe@example.com' },
    { Id: 2, FirstName: 'Jane', LastName: 'Smith', Email: 'jane.smith@example.com' },
  ];

  beforeEach(() => {
    // Mock the services
    contactServiceMock = jasmine.createSpyObj('ContactService', ['getcontact', 'deleteContact', 'initializeFormGroup']);
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule],
      declarations: [ContactGrid, UserContact, ContactUserEditUpdate],
      providers: [
        { provide: ContactService, useValue: contactServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data and bind it to the table on initialization', () => {
    contactServiceMock.getcontact.and.returnValue(of(mockContacts));

    component.ngOnInit();

    expect(contactServiceMock.getcontact).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockContacts);
  });

  it('should filter data correctly when search input is given', () => {
    component.dataSource.data = mockContacts;
    component.searchKey = 'John';
    component.applyFilter();
    expect(component.dataSource.filter).toBe('john');
  });

  it('should open create contact dialog when "Create" button is clicked', () => {
    component.onCreate();
    expect(matDialogMock.open).toHaveBeenCalledWith(UserContact, {
      disableClose: false,
      autoFocus: true,
      width: '50%',
    });
  });

  it('should open edit contact dialog when "Edit" button is clicked', () => {
    const contact = mockContacts[0];
   // matDialogMock.open.and.returnValue({ afterClosed: () => of(contact) });

    component.onEdit(contact.Id);

    expect(matDialogMock.open).toHaveBeenCalledWith(ContactUserEditUpdate, {
      width: '400px',
      data: { contact },
    });
  });

  it('should update the table data when contact is updated from the edit dialog', () => {
    const updatedContact = { ...mockContacts[0], FirstName: 'Johnathan' };

   // matDialogMock.open.and.returnValue({ afterClosed: () => of(updatedContact) });

    component.OnUpdate(updatedContact);

    expect(component.dataSource.data[0].FirstName).toBe('Johnathan');
  });

  it('should delete a contact when "Delete" button is clicked', () => {
    contactServiceMock.deleteContact.and.returnValue(of(null));

    component.onDelete(mockContacts[0].Id);

    expect(contactServiceMock.deleteContact).toHaveBeenCalledWith(mockContacts[0].Id);
    expect(component.dataSource.data.length).toBe(1); 
    expect(toastrServiceMock.success).toHaveBeenCalledWith('contact deleted');
  });

  it('should display a confirmation prompt before deleting a contact', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.onDelete(mockContacts[0].Id);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this contact?');
  });
});