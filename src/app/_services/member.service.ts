import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs';
import { IMember } from '../Interfaces/IMember.interface';
import { UpdateMemberDto } from '../Interfaces/MemberDto';
import { pager } from '../Interfaces/Pagination';

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

  addLike(id: string) {
    return this.http.get(this.Baseurl + `/Likes/${id}`);
  }
  GetUsersLikes(predicate: string) {
    return this.http.get<any[]>(
      `https://localhost:7068/api/Likes/GetLikes/${predicate}`
    );
  }

  getmembers(currentPage: number = 1, pageSize: number = 1) {
    let params = new HttpParams();

    return this.http.get<pager>(
      this.Baseurl +
        `/Users/?CurrenPage=${currentPage.toString()}&PageSize=${pageSize.toString()}`,
      { observe: 'body', params }
    );
  }
  getmember(id: string) {
    let headers = new HttpHeaders({ Accept: 'application/json' });
    return this.http
      .get<IMember>(this.Baseurl + '/Users/' + id)
      .pipe(shareReplay(1));
  }
  Updatemember(member: UpdateMemberDto, id: string) {
    return this.http.put<IMember>(this.Baseurl + '/Users/' + id, member);
  }
  AddImage(img: any) {
    return this.http.post('https://localhost:7068/api/Users/add-photo', img);
  }
}
