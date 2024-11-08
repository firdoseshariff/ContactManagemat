import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { contactdetail } from '../Model/Contact';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../utility/environment';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  const mockContacts: contactdetail[] = [
    { Id: 1, FirstName: 'John', LastName: 'Doe', Email: 'john.doe@example.com' },
    { Id: 2, FirstName: 'Jane', LastName: 'Doe', Email: 'jane.doe@example.com' },
  ];

  const mockContact: contactdetail = { Id: 1, FirstName: 'John', LastName: 'Doe', Email: 'john.doe@example.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import the HttpClientTestingModule
      providers: [ContactService],         // Provide the service to be tested
    });

    service = TestBed.inject(ContactService);  // Inject the service
    httpMock = TestBed.inject(HttpTestingController);  // Inject the mock HTTP controller
  });

  afterEach(() => {
    httpMock.verify();  // Ensure that no unmatched HTTP requests remain
  });

  describe('getcontact', () => {
    it('should fetch all contacts', () => {
      service.getcontact().subscribe((contacts) => {
        expect(contacts.length).toBe(2);  // Check that the contacts returned are correct
        expect(contacts).toEqual(mockContacts);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/GetAll`);  // Verify the URL
      expect(req.request.method).toBe('GET');  // Verify the HTTP method
      req.flush(mockContacts);  // Provide mock data as the response
    });

    it('should handle error when fetching contacts', () => {
      service.getcontact().subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error).toContain('Error fetching contacts');
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/GetAll`);
      req.flush('Error fetching contacts', { status: 500, statusText: 'Server Error' });  // Simulate an error response
    });
  });

  describe('addcontact', () => {
    it('should add a new contact', () => {
      service.addcontact(mockContact).subscribe((response) => {
        expect(response).toBeTruthy();
        expect(response.FirstName).toBe('John');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/AddContact`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockContact);
      req.flush(mockContact);
    });

    it('should handle error during contact addition', () => {
      service.addcontact(mockContact).subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toContain('Error occurred');
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/AddContact`);
      req.flush('Error occurred', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('deleteContact', () => {
    it('should delete a contact by id', () => {
      service.deleteContact(1).subscribe(() => {
        expect(true).toBeTruthy();  // Confirm the deletion worked
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/Delete/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should handle error during contact deletion', () => {
      service.deleteContact(1).subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error).toContain('Error occurred while deleting contact');
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/Delete/1`);
      req.flush('Error occurred while deleting contact', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('updatecontact', () => {
    it('should update an existing contact', () => {
      service.updatecontact(mockContact).subscribe((response) => {
        expect(response).toBeTruthy();
        expect(response.FirstName).toBe('John');
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/UpdateContact`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(mockContact);
      req.flush(mockContact);
    });

    it('should handle error during contact update', () => {
      service.updatecontact(mockContact).subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toContain('Error occurred while updating contact');
        }
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/Contact/UpdateContact`);
      req.flush('Error occurred while updating contact', { status: 400, statusText: 'Bad Request' });
    });
  });
});