import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'https://api.klymbr.com/';
  public set token(t: string) { this.cookieService.set('token', t); }
  public get token() { return this.cookieService.get('token'); }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  postSignin(login: Object): Observable<any> {
    return this.http.post(this.url + 'auth/sign_in/', login,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postSignup(register: Object): Observable<any> {
    return this.http.post(this.url + 'auth/register/', register,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postRecovery(email: string): Observable<any> {
    return this.http.post(this.url, email,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getUser(): Observable<any> {
    return this.http.get(this.url + 'user',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }
}
