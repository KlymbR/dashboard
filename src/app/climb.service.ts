import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { IUser, IRoom, IPath, IGrip, IStat } from './interfaces';

@Injectable()
export class ClimbService {
  private url = 'http://api.klymbr.com/';

  constructor(private http: HttpClient, private userService: UserService) { }

  /* PATH */
  getAllPaths(): Observable<any> {
    return this.http.get(this.url + 'path/all',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  getPath(path_id: number): Observable<any> {
    return this.http.get(this.url + 'path',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }),
        params: { path_id: path_id.toString() }
      });
  }

  postPath(path: IPath): Observable<any> {
    return this.http.post(this.url + 'path/free', path,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  deletePath(path_id: number): Observable<any> {
    return this.http.post(this.url + 'path/delete/', { path_id: path_id }, // WHUT ?!
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  postPathFree(path_id: number, free: boolean): Observable<any> {
    return this.http.post(this.url + 'path/free', { path_id: path_id, path_free: free },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }
  /* !PATH */

  /* ROOM */
  postRoom(room: IRoom): Observable<any> {
    return this.http.post(this.url + 'climbingRoom/add', room,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  getRoom(title: string): Observable<any> {
    return this.http.get(this.url + 'climbingRoom',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }),
        params: { title: title }
      });
  }

  getAllRooms(): Observable<any> {
    return this.http.get(this.url + 'climbingRoom',
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  deleteRoom(title: string): Observable<any> {
    return this.http.delete(`${this.url}climbingRoom/delete/${title}`,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }
  /* !ROOM */

  /* GRIP */
  postGrip(path_id: number, grip: IGrip): Observable<any> {
    grip['path_id'] = path_id;
    console.log('postGrip:', grip);
    return this.http.post(this.url + 'grip/add', grip,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  deleteGrip(path_id: number, grip_id: number): Observable<any> {
    return this.http.post(this.url + 'path/delete/', { path_id: path_id, grip_id: grip_id }, // WHUT ?!
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }
  /* !GRIP */

  /* STAT */
  getStat(path_id: number): Observable<any> {
    return this.http.get(this.url + 'stat',
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }),
        params: { path_id: path_id.toString() }
      });
  }

  postStat(stat: IStat): Observable<any> {
    return this.http.post(this.url + 'stat/add', stat,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  patchStat(stat: IStat): Observable<any> {
    return this.http.patch(this.url + 'stat/add', stat,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }

  /* NO BODY IN DELETE PROTOCOLE
  deleteStat(path_id: number): Observable<any> {
    return this.http.delete(this.url + 'stat/delete/', { path_id: path_id },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `JWT ${this.userService.token}` }) });
  }
  */
  /* !STAT */
}
