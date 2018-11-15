import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url = 'https://api.klymbr.com/';
  public get token() { return this.cookieService.get('token'); }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUser(): Observable<any> {
    return this.http.get(this.url + 'user',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  postEdit(edit: Object): Observable<any> {
    return this.http.post(this.url + 'user/update/', edit,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  deleteUser(_id: string): Observable<any> {
    return this.http.delete(this.url + 'user/delete/' + _id,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }
}
