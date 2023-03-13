import { Component, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  SignupData = { name: '', username: '', email: '', password: '' };
  @ViewChild('SignUp') SignUp: NgForm;
  hide = true;

  constructor(private account: AccountService) {}

  PostingData() {
    this.account.signUP(this.SignupData);
  }
  onSubmit() {
    this.SignupData.name = this.SignUp.value.name;
    this.SignupData.username = this.SignUp.value.username;
    this.SignupData.email = this.SignUp.value.email;
    this.SignupData.password = this.SignUp.value.password;
    this.SignUp.reset();
    this.PostingData();
  }
}
