import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MyContact } from '../models/my-contact.model';
import { MyGroup } from '../models/my-group.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsBaseUrl = 'http://localhost:3000/contacts'
  groupsBaseUrl = 'http://localhost:3000/groups'

  constructor(private http: HttpClient) { }

  // Get all Contacts Data
  getAllContacts(): Observable<MyContact[]> {
    return this.http.get<MyContact[]>(`${this.contactsBaseUrl}`).pipe(catchError(this.handleError))
  }

  // Get Single Contact
   getContact(contactId: string): Observable<MyContact> {
    return this.http.get<MyContact>(`${this.contactsBaseUrl}/${contactId}`).pipe(catchError(this.handleError))
  }

  // Create Contact
   createContact(contact: MyContact): Observable<MyContact> {
    return this.http.post<MyContact>(`${this.contactsBaseUrl}/`, contact).pipe(catchError(this.handleError))
  }

  // Update Contact
   updateContact(contact: MyContact, contactId: string): Observable<MyContact> {
    return this.http.put<MyContact>(`${this.contactsBaseUrl}/${contactId}`, contact).pipe(catchError(this.handleError))
  }

  // Update Contact
   deleteContact( contactId: string): Observable<MyContact> {
    return this.http.delete<MyContact>(`${this.contactsBaseUrl}/${contactId}`).pipe(catchError(this.handleError))
  }

  /* GROUPS */
  
  // Get all Groups Data
  getAllGroups(): Observable<MyGroup[]> {
    return this.http.get<MyGroup[]>(`${this.groupsBaseUrl}`).pipe(catchError(this.handleError))
  }

  // Get Single Group
   getGroup(groupId: string): Observable<MyGroup> {
    return this.http.get<MyGroup>(`${this.groupsBaseUrl}/${groupId}`).pipe(catchError(this.handleError))
  }


  handleError(error: HttpErrorResponse){
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      //Client Error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      // Server Side Error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
