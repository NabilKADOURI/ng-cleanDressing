import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { ItemInterface } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private url = environment.apiBaseUrl;


  constructor(private http: HttpClient) {}

  createItem(itemData: ItemInterface):Observable<any> {
return this.http.post(`${this.url}/api/items`, itemData);

  }

  getItemByUri(itemUri: string): Observable<ItemInterface>{

    return this.http.get<ItemInterface>(this.url + itemUri)
  }
}
