import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { IAuth } from '../Interfaces/Auth.interface';
import { LoginDto } from '../Interfaces/LoginDto';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url = 'https://localhost:7068/api/Auth';
  AuthBufferSub = new ReplaySubject<IAuth>(1);
  AuthBufferSub$ = this.AuthBufferSub.asObservable();

  constructor(private http: HttpClient) {}
  login(Data: LoginDto) {
    return this.http.post<IAuth>(this.url + '/GetToken', Data).pipe(
      map((auth: IAuth) => {
        if (auth) {
          localStorage.setItem('auth', JSON.stringify(auth));
          this.AuthBufferSub.next(auth);
        }
        return auth;
      })
    );
  }

  signUP(data: any) {
    return this.http.post<IAuth>(this.url + '/Register', data);
  }
  setyCurrentUser(auth: IAuth) {
    this.AuthBufferSub.next(auth);
  }
  logout() {
    this.AuthBufferSub.next(null);
    localStorage.removeItem('auth');
  }
}
