import { Component, OnInit } from '@angular/core';
import { MyContact } from '../models/my-contact.model';
import { MyGroup } from '../models/my-group.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editcontact',
  standalone: false,
  templateUrl: './editcontact.component.html',
  styleUrl: './editcontact.component.css',
})
export class EditcontactComponent implements OnInit {
  contactId: string | null = null;
  loading: boolean = false;
  contact: MyContact = {} as MyContact;
  groups: MyGroup[] = [];
  errorMessage: string | null = null;
  formValue!: FormGroup;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    if (this.contactId) {
      this.contactService
        .getContact(this.contactId)
        .subscribe((data: MyContact) => {
          this.contact = data;
          this.contactService.getAllGroups().subscribe(
            (data: MyGroup[]) => {
              this.groups = data;
              console.log(data);
              this.loading = false;

              this.formValue.patchValue({
                name: this.contact.name,
                photo: this.contact.photo,
                email: this.contact.email,
                mobile: this.contact.mobile,
                company: this.contact.company,
                title: this.contact.title,
                groupId: this.contact.groupId,
              });
            },
            (error) => {
              this.errorMessage = error;
              this.loading = false;
            }
          );
        });
    }
  }

  submit() {
    if (this.contactId) {
      this.loading = true;
    this.contactService.updateContact(this.formValue.value, this.contactId).subscribe(
      (data: MyContact) => {
        this.loading = false;
        this.formValue.reset();
        this.router.navigate(['/']).then();
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error;
        this.router.navigate(['/contacts/edit', this.contactId]).then();
      }
    );
    }
  }
}
