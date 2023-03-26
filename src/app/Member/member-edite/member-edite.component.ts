import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { mergeMap, Observable, tap } from 'rxjs';
import { IAuth } from 'src/app/Interfaces/Auth.interface';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { IPhoto } from 'src/app/Interfaces/IPhoto.interface';
import { UpdateMemberDto } from 'src/app/Interfaces/MemberDto';
import { AccountService } from 'src/app/_services/account.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edite',
  templateUrl: './member-edite.component.html',
  styleUrls: ['./member-edite.component.css'],
})
export class MemberEditeComponent implements OnInit {
  user: IAuth;
  Memberp: IMember;
  mainPhoto: IPhoto;
  @ViewChild('UpdateMemberForm1') editeform: NgForm;
  uploadForm: FormGroup;

  constructor(private accout: AccountService, private Member: MemberService) {
    this.accout.AuthBufferSub$.subscribe((u) => (this.user = u));
  }
  ngOnInit(): void {
    this.loadmember();
    this.uploadForm = new FormGroup({
      uploadImage: new FormControl(null),
    });
  }
  loadmember() {
    this.Member.getmember(this.user.id)
      .pipe(
        tap((u) => {
          console.log(u);
        })
      )
      .subscribe((user) => {
        this.Memberp = user;
        this.mainPhoto = this.Memberp.photos.filter((p) => p.isMain == true)[0];
      });
  }

  updateOnsubmit() {
    const memberDto: UpdateMemberDto = {
      Introduction: this.Memberp.introduction,
      Intersts: this.Memberp.intersts,
      City: this.Memberp.city,
      Country: this.Memberp.country,
      LookingFor: this.Memberp.lookingFor,
    };
    this.Member.Updatemember(memberDto, this.Memberp.memberId).subscribe(
      (m) => {
        this.editeform.reset(this.Memberp);
      }
    );
  }
}
