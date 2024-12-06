import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { contactInterface } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  registerContact(contact: contactInterface): Observable<any> {
    return this.http.post(`${this.contactUrl}/api/contacts`, contact);
  }
}
