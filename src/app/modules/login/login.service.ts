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
    return this.http.post(this.url + 'users/authenticate', login,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postSignup(register: Object): Observable<any> {
    return this.http.post(this.url + 'users/', register,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  postRecovery(email: string): Observable<any> {
    return this.http.post(this.url + 'users/passrecovery', { email: email },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getRights(email: string, token: string): Observable<any> {
    return this.http.get(this.url + 'rights/' + email,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + token }) });
  }
}
