import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserContact } from './ContactUser.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../Service/ContactUserService';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserContact', () => {
  let component: UserContact;
  let fixture: ComponentFixture<UserContact>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let contactServiceMock: jasmine.SpyObj<ContactService>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<UserContact>>;

  beforeEach(() => {
    // Mock the services
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    contactServiceMock = jasmine.createSpyObj('ContactService', ['addcontact']);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], // Import necessary modules
      declarations: [UserContact],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: ContactService, useValue: contactServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        FormBuilder,
      ],
    }).compileComponents();

    // Create component instance and fixture
    fixture = TestBed.createComponent(UserContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled', () => {
    component.form.controls['FirstName'].setValue('John');
    component.form.controls['LastName'].setValue('Doe');
    component.form.controls['Email'].setValue('john.doe@example.com');

    expect(component.form.valid).toBeTrue();
  });

  it('should display an error message if the form is invalid and submitted', () => {
    component.form.controls['FirstName'].setValue('');
    component.form.controls['LastName'].setValue('Doe');
    component.form.controls['Email'].setValue('john.doe@example.com');

    component.onSubmit();
    expect(component.form.invalid).toBeTrue();
  });

  it('should call addcontact method of ContactService on form submit', () => {
    component.form.controls['FirstName'].setValue('John');
    component.form.controls['LastName'].setValue('Doe');
    component.form.controls['Email'].setValue('john.doe@example.com');
    
    contactServiceMock.addcontact.and.returnValue(of({}));
    
    component.onSubmit();
    expect(contactServiceMock.addcontact).toHaveBeenCalledOnceWith(component.form.value);
  });

  it('should show success toastr message on successful contact submission', () => {
    const mockResponse = { message: 'Contact added successfully' };
    contactServiceMock.addcontact.and.returnValue(of(mockResponse));

    component.form.controls['FirstName'].setValue('John');
    component.form.controls['LastName'].setValue('Doe');
    component.form.controls['Email'].setValue('john.doe@example.com');
    
    component.onSubmit();

    expect(toastrServiceMock.success).toHaveBeenCalledWith(
      'Contact added successfully',
      'Success'
    );
  });

  it('should show error toastr message on failed contact submission', () => {
    const mockError = { status: 400, message: 'Invalid data' };
    contactServiceMock.addcontact.and.returnValue(throwError(() => mockError));

    component.form.controls['FirstName'].setValue('John');
    component.form.controls['LastName'].setValue('Doe');
    component.form.controls['Email'].setValue('john.doe@example.com');

    component.onSubmit();

    expect(toastrServiceMock.error).toHaveBeenCalledWith('no data added', 'Error');
  });

  it('should close the dialog when closecontact is called', () => {
    component.closecontact();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});