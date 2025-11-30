import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/my-contact.model';
import { MyGroup } from '../models/my-group.model';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-addcontact',
  standalone: false,
  templateUrl: './addcontact.component.html',
  styleUrl: './addcontact.component.css',
})
export class AddcontactComponent implements OnInit {
  contactId: string | null = null;
  loading: boolean = false;
  contact: MyContact = {} as MyContact;
  groups: MyGroup[] = [];
  errorMessage: string | null = null;
  formValue!: FormGroup;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      photo: [''],
      email: [''],
      mobile: [''],
      company: [''],
      title: [''],
      groupId: [''],
    });
    this.loading = true;
    this.contactService.getAllGroups().subscribe(
      (data: MyGroup[]) => {
        this.groups = data;
        console.log(data);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  submit() {
    this.loading = true;
    this.contactService.createContact(this.formValue.value).subscribe(
      (data: MyContact) => {
        this.loading = false;
        this.formValue.reset();
        this.router.navigate(['/']).then();
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error;
        this.router.navigate(['/contacts/add']).then();
      }
    );
  }
}
