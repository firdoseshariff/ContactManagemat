
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../Service/ContactUserService';
import { contactdetail } from '../../Model/Contact';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-contact-dialog',
  templateUrl: './ContactUserEdit.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule]
})
export class ContactUserEditUpdate implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ContactUserEditUpdate>,
    @Inject(MAT_DIALOG_DATA) public data: { cont: contactdetail },
    private fb: FormBuilder,
    private service: ContactService,
    private toast: ToastrService
  ) {
    
    const contactData = data?.cont ?? { Id: 0, FirstName: '', LastName: '', Email: '' };

    this.form = this.fb.group({
    Id: [contactData.Id, Validators.required],
      FirstName: [contactData.FirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      LastName: [contactData.LastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      Email: [contactData.Email, [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
   
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSave(): void {
    if (this.form.valid) {
      this.service.updatecontact(this.form.value).subscribe({
        next: (res) => {
          this.toast.success("Contact updated successfully");
          this.dialogRef.close(this.form.value); // Close dialog and return updated data
        },
        error: (err) => {
          console.error("Error updating contact:", err);
          this.toast.error("Failed to update contact");
        }
      });
    } else {
      this.toast.warning("Please fill in the form correctly");
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}