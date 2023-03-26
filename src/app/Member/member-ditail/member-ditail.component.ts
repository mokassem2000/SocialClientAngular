import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { IUser } from 'src/app/_entites/iuser';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-ditail',
  templateUrl: './member-ditail.component.html',
  styleUrls: ['./member-ditail.component.css'],
})
export class MemberDitailComponent implements OnInit {
  User$: Observable<IMember>;

  constructor(private route: ActivatedRoute, private member: MemberService) {}
  ngOnInit(): void {
    this.LoadUserDitail();
  }
  LoadUserDitail() {
    let id: string;
    this.route.params.subscribe((p) => (id = p['id']));
    console.log(id);
    this.User$ = this.member.getmember(id);
  }
}
