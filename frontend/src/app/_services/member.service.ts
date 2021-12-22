import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../_models/member.model';

const baseUrl = 'http://localhost:8001/api/members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(baseUrl);
  }

  get(id: any): Observable<Member> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByUsername(username: any): Observable<Member[]> {
    return this.http.get<Member[]>(`${baseUrl}?username=${username}`);
  }
}
