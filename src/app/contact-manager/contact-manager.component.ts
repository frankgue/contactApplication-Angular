import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { MyContact } from '../models/my-contact.model';

@Component({
  selector: 'app-contact-manager',
  standalone: false,
  templateUrl: './contact-manager.component.html',
  styleUrl: './contact-manager.component.css',
})
export class ContactManagerComponent implements OnInit {
  loading: boolean = false;
  contacts: MyContact[] = [];
  errorMessage: string | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getAllContactsData();
  }

  getAllContactsData() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe(
      (data: MyContact[]) => {
        this.contacts = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }

  deleteContact(contactId: string) {
    this.loading = true;
    this.contactService.deleteContact(contactId).subscribe(
      (data: MyContact) => {
         this.getAllContactsData();
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
