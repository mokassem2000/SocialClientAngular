import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../_services/account.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  SignupData = { name: '', username: '', email: '', password: '' };
  hide = true;
  signUpForm: FormGroup;

  checkPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let pass1 = control.get('Password').value;
    let pass2 = control.get('ConfirmPassword').value;
    console.log(`${pass1} === ${pass2}= ${pass1 === pass2}`);
    if (pass1 === pass2) {
      return null;
    } else {
      return { notIdentical: true };
    }
  };
  constructor(private account: AccountService) {}
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      Name: new FormControl(null, Validators.required),
      UserName: new FormControl(null, Validators.required),
      Email: new FormControl(null, [Validators.email, Validators.required]),
      PasswordGroup: new FormGroup(
        {
          Password: new FormControl(null, [Validators.required]),
          ConfirmPassword: new FormControl(null, [Validators.required]),
        },
        {
          validators: [this.checkPasswords.bind(this), Validators.required],
        }
      ),
    });
  }

  PostingData() {
    this.account.signUP(this.SignupData);
  }

  onSubmit() {
    console.log(this.signUpForm);
    // this.signUpForm.reset();
    this.PostingData();
  }
}
