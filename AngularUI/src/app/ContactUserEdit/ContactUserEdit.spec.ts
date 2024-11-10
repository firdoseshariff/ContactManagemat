import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactUserEditUpdate } from './ContactUserEdit.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../Service/ContactUserService';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { contactdetail } from '../../Model/Contact';

describe('ContactUserEditUpdate', () => {
  let component: ContactUserEditUpdate;
  let fixture: ComponentFixture<ContactUserEditUpdate>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let contactServiceMock: jasmine.SpyObj<ContactService>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<ContactUserEditUpdate>>;

  const mockContact: contactdetail = { Id: 1, FirstName: 'John', LastName: 'Doe', Email: 'john.doe@example.com' };

  beforeEach(() => {
    // Mocking the services
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning']);
    contactServiceMock = jasmine.createSpyObj('ContactService', ['updatecontact']);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContactUserEditUpdate],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ContactService, useValue: contactServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: { cont: mockContact } },
        { provide: MatDialogRef, useValue: dialogRefMock },
        FormBuilder,
      ],
    }).compileComponents();

    // Create component instance and fixture
    fixture = TestBed.createComponent(ContactUserEditUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the provided contact data', () => {
    expect(component.form.controls['Id'].value).toBe(mockContact.Id);
    expect(component.form.controls['FirstName'].value).toBe(mockContact.FirstName);
    expect(component.form.controls['LastName'].value).toBe(mockContact.LastName);
    expect(component.form.controls['Email'].value).toBe(mockContact.Email);
  });

  it('should save the updated contact and close the dialog on valid form submission', () => {
    const updatedContact = { ...mockContact, FirstName: 'Jane', LastName: 'Smith', Email: 'jane.smith@example.com' };

    component.form.setValue(updatedContact);
    contactServiceMock.updatecontact.and.returnValue(of(updatedContact));

    component.onSave();

    expect(contactServiceMock.updatecontact).toHaveBeenCalledOnceWith(updatedContact);
    expect(toastrServiceMock.success).toHaveBeenCalledWith('Contact updated successfully');
    expect(dialogRefMock.close).toHaveBeenCalledWith(updatedContact);
  });

  it('should show error toastr message on failed update', () => {
    contactServiceMock.updatecontact.and.returnValue(throwError(() => new Error('Failed to update contact')));

    component.form.setValue(mockContact);
    component.onSave();

    expect(toastrServiceMock.error).toHaveBeenCalledWith('Failed to update contact');
  });

  it('should show a warning if the form is invalid and "Save" is clicked', () => {
    component.form.controls['FirstName'].setValue('');
    component.form.controls['LastName'].setValue('');
    component.form.controls['Email'].setValue('');

    component.onSave();

    expect(toastrServiceMock.warning).toHaveBeenCalledWith('Please fill in the form correctly');
  });

  it('should close the dialog when cancel is clicked', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});