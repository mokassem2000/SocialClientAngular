import { Component, OnInit } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { IAuth } from '../Interfaces/Auth.interface';
import { LoginDto } from '../Interfaces/LoginDto';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  Auth$: Observable<IAuth> | undefined;
  LoginData: LoginDto = { Email: '', Password: '' };

  constructor(
    private accountService: AccountService,
    private route: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getCurrenAuth();
    this.Auth$.subscribe((a) => {
      console.log(a);
    });
  }

  login() {
    this.Auth$ = this.accountService.login(this.LoginData).pipe(
      catchError((e) => {
        this.toastr.error('ivalid email or password ');
        throw e;
      }),
      tap(() => {
        this.route.navigateByUrl('/Members');
      })
    );
  }

  logout() {
    this.accountService.logout();
    this.route.navigateByUrl('/');
  }

  getCurrenAuth() {
    this.Auth$ = this.accountService.AuthBufferSub$;
  }
}
