import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from './Interfaces/Auth.interface';
import { IUser } from './_entites/iuser';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users$: Observable<IUser[]> | any;
  constructor(private http: HttpClient, private account: AccountService) {}
  ngOnInit(): void {
    this.users$ = this.getAllUSer();
    this.setCurrentUser();
  }

  title = 'project';

  setCurrentUser() {
    let auth: IAuth = JSON.parse(localStorage.getItem('auth') ?? '');
    this.account.setyCurrentUser(auth);
  }
  getAllUSer() {
    return this.http.get<IUser[]>('https://localhost:7068/api/Users');
  }
}
