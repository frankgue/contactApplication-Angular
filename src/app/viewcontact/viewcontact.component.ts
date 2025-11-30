import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/my-contact.model';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute } from '@angular/router';
import { MyGroup } from '../models/my-group.model';

@Component({
  selector: 'app-viewcontact',
  standalone: false,
  templateUrl: './viewcontact.component.html',
  styleUrl: './viewcontact.component.css'
})
export class ViewcontactComponent implements OnInit {
  contactId: string | null = null;
  loading: boolean = false;
  contact: MyContact = {} as MyContact;
  group: MyGroup = {} as MyGroup;
  errorMessage: string | null = null;

  constructor(private contactService: ContactService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((param) => {
        this.contactId = param.get('contactId');
      });
      if (this.contactId) {
        this.loading=true;
        this.contactService.getContact(this.contactId).subscribe(
          (data: MyContact) => {
          this.contact = data;
          this.contactService.getGroup(data.groupId).subscribe(
            (data: MyGroup) => {
              this.group = data;
            }
          )
          this.loading = false;
        },
        (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      )
      }
  }

  isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
