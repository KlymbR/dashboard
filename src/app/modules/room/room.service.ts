import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = 'http://api.klymbr.com/';
  public get token() { return this.cookieService.get('token'); }

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getRoom(title: string): Observable<any> {
    return this.http.get(this.url + 'climbingRoom',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }),
        params: { title: title }
      });
  }
  getAllRooms(): Observable<any> {
    return this.http.get(this.url + 'climbingRoom',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  getPath(path_id: string): Observable<any> {
    return this.http.get(this.url + 'path',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }),
        params: { path_id: path_id }
      });
  }
  getAllPaths(): Observable<any> {
    return this.http.get(this.url + 'path/all',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  freePath(path_id: string, path_free: boolean): Observable<any> {
    return this.http.post(this.url + 'path/free', { path_id: path_id, path_free: path_free.toString() },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }) });
  }

  getStats(path_id: string): Observable<any> {
    return this.http.get(this.url + 'stat',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.token}` }),
        params: { path_id: path_id }
      });
  }
}
