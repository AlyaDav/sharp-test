import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { IResponseReg } from '../interfaces/IResponseReg';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  registerUser(username: string, password: string, email: string): Observable<IResponseReg> {
    return this.http.post<IResponseReg>(`${this.baseUrl}/users`, {username, password, email});
  }

  login(email: string, password: string): Observable<IResponseReg> {
    return this.http.post<IResponseReg>(`${this.baseUrl}/sessions/create`, {email, password});
  }

  saveToken(token: string) {
    localStorage.setItem('id_token', token);
  }

  getToken():string {
    return localStorage.getItem('id_token');
  }
}
