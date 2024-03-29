import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
import { state } from '@angular/animations';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  hide = true;
  signUpForm: FormGroup;

  checkPasswords: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let pass1 = control.get('Password').value;
    let pass2 = control.get('ConfirmPassword').value;
    if (pass1 === pass2) {
      return null;
    } else {
      return { notIdentical: true };
    }
  };
  constructor(private account: AccountService, private toastr: ToastrService) {}
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
    return this.account.signUP(this.signUpForm.value);
  }

  onSubmit() {
    this.PostingData().subscribe(
      (x) => {
        console.log(x);
        this.toastr.success('you have created user successfully');
        this.signUpForm.reset();
      },
      (e) => {
        this.toastr.error('invalid form');
        this.signUpForm.reset();
      }
    );
    this.signUpForm.reset();
    console.log(this.signUpForm);
  }
}
