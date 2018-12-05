import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url = 'http://api.klymbr.com/';
  public get token() { return this.cookieService.get('token'); }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser(_id: string): Observable<any> {
    return this.http.get(this.url + 'users/' + _id,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }

  patchUser(_id: string, user: any): Observable<any> {
    return this.http.patch(this.url + 'users/' + _id, user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }

  deleteUser(_id: string): Observable<any> {
    return this.http.delete(this.url + 'users/' + _id,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
}
