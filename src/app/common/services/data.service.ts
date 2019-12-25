import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { ITransaction } from '../interfaces/ITransaction';
import { IUserList } from '../interfaces/IUserList';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getListAuthUserTransactions(): Observable<ITransaction[]> {
    return this.http.get<any>(`${this.baseUrl}/api/protected/transactions`).pipe(
      map(data => data.trans_token)
    );
  }

  getLoggedUserInfo(): Observable<IUser> {
    return this.http.get<any>(`${this.baseUrl}/api/protected/user-info`).pipe(
      map(data => data.user_info_token)
    );
  }

  usersList(filter:string): Observable<IUserList[]> {
    return this.http.post<IUserList[]>(`${this.baseUrl}/api/protected/users/list`, {filter});
  }

  createTransaction(name: string, amount: number): Observable<ITransaction> {
    return this.http.post<ITransaction>(`${this.baseUrl}/api/protected/transactions`, {name, amount});
  }

}
