import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMember } from '../Interfaces/IMember.interface';

// const httpOption = {
//   headers: new HttpHeaders({
//     Authrization: 'Bearer ' + JSON.parse(localStorage.getItem('auth'))['token'],
//   }),
// };
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  Baseurl = 'https://localhost:7068/api';
  constructor(private http: HttpClient) {}

  getmembers() {
    return this.http.get<IMember[]>(this.Baseurl + '/Users');
  }
  getmember(id: string) {
    return this.http.get<IMember>(this.Baseurl + '/Users/' + id);
  }
}
