import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuth } from '../Interfaces/Auth.interface';
import { LoginDto } from '../Interfaces/LoginDto';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  Auth$: Observable<IAuth> | undefined;
  LoginData: LoginDto = { Email: '', Password: '' };

  constructor(private accountService: AccountService) {}
  ngOnInit(): void {
    this.getCurrenAuth();
    this.Auth$.subscribe((a) => {
      console.log(a);
    });
  }

  login() {
    this.Auth$ = this.accountService.login(this.LoginData);
  }
  logout() {
    this.accountService.logout();
  }

  getCurrenAuth() {
    this.Auth$ = this.accountService.AuthBufferSub$;
  }
}
