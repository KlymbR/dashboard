import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from './interfaces';

@Injectable()
export class UserService {
  private url = 'http://api.klymbr.com/';
  public set token(t: string) { this.cookieService.set('token', t); }
  public get token() { return this.cookieService.get('token'); }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser(): Observable<any> {
    return this.http.get(this.url + 'user/',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  patchUser(user: IUser): Observable<any> {
    return this.http.patch(this.url + 'user/update', user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.patch(`${this.url}user/delete/${id}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.url + 'user/all',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  getUsersBylicense(clubId: string): Observable<any> {
    return this.http.get(this.url + 'user/license',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }),
        params: { clubId: clubId }
      });
  }
}
