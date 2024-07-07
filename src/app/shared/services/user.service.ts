import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { IUserInterface } from "../models/IUser";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(user:IUserInterface): Observable<any> {
    return this.http.post(`${this.url}/users`, user, {
      headers: {'Access-Control-Allow-Origin': '*'},
    });
  }
}
