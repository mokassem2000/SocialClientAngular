import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { IMember } from '../Interfaces/IMember.interface';
import { UpdateMemberDto } from '../Interfaces/MemberDto';

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
    return this.http
      .get<IMember[]>(this.Baseurl + '/Users')
      .pipe(shareReplay(1));
  }
  getmember(id: string) {
    return this.http
      .get<IMember>(this.Baseurl + '/Users/' + id)
      .pipe(shareReplay(1));
  }
  Updatemember(member: UpdateMemberDto, id: string) {
    console.log(member);
    return this.http.put<IMember>(this.Baseurl + '/Users/' + id, member);
  }
  AddImage(img: any) {
    return this.http.post('https://localhost:7068/api/Users/add-photo', img);
  }
}
