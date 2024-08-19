import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { IUserInterface, UserInterface } from "../models/IUser";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  register(user: IUserInterface): Observable<any> {
    return this.http.post(`${this.url}/api/users`, user);
  }

  getUserById(id: number): Observable<UserInterface>{

    return this.http.get<UserInterface>(`${this.url}/api/users/${id}`)
  }
}
