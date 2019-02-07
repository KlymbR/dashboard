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

  getRoom(roomid: string): Observable<any> {
    return this.http.get(this.url + 'rooms/' + roomid,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  getAllRooms(): Observable<any> {
    return this.http.get(this.url + 'rooms',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }

  getPath(roomid: string, pathid: string): Observable<any> {
    return this.http.get(this.url + 'rooms/' + roomid + '/paths/' + pathid,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  getAllPaths(roomid: string): Observable<any> {
    return this.http.get(this.url + 'rooms/' + roomid + '/paths',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  postPath(roomid: string, path: any): Observable<any> {
    return this.http.post(this.url + 'rooms/' + roomid + '/paths/', path,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
  patchPath(roomid: string, pathid: string, path: any): Observable<any> {
    return this.http.patch(this.url + 'rooms/' + roomid + '/paths/' + pathid, path,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `bearer ${this.token}` }) });
  }
}
