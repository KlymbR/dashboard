import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ILogin, IRegister } from './interfaces';

@Injectable()
export class AuthService {
  private url = 'http://0.0.0.0/';

  constructor(private http: HttpClient) { }

  postSignin(login: ILogin): Observable<any> {
    return this.http.post(this.url, login,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postSignup(register: IRegister): Observable<any> {
    return this.http.post(this.url, register,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postRecovery(email: string): Observable<any> {
    return this.http.post(this.url, email,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
