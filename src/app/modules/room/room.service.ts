import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = 'https://api.klymbr.com/';
  public get token() { return this.cookieService.get('token'); }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getRoom(_id: string): Observable<any> {
    return this.http.get(this.url + 'rooms/' + _id,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  getAllRooms(): Observable<any> {
    return this.http.get(this.url + 'rooms',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }

  getPath(_id: string): Observable<any> {
    return this.http.get(this.url + 'paths/' + _id,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  getAllPaths(): Observable<any> {
    return this.http.get(this.url + 'paths',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  postPath(path: any): Observable<any> {
    return this.http.post(this.url + 'paths', path,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  patchPath(_id: string, path: any): Observable<any> {
    return this.http.patch(this.url + 'paths/' + _id, path,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
}
