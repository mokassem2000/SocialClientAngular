import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './_entites/iuser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users$: Observable<IUser[]> | any;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.users$ = this.getAllUSer();
  }

  title = 'project';
  getAllUSer() {
    return this.http.get<IUser[]>('https://localhost:7068/api/Users');
  }
}
