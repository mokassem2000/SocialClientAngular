import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { pager } from 'src/app/Interfaces/Pagination';
import { AccountService } from 'src/app/_services/account.service';

import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: IMember[];
  pagination: pager;
  id: string;

  constructor(
    private memberService: MemberService,
    private auth: AccountService
  ) {}
  ngOnInit(): void {
    this.auth.AuthBufferSub$.subscribe((m) => (this.id = m.id));
    this.memberService
      .getmembers(1, 4)
      .pipe(
        map((m) => {
          let l = m.items.filter(
            (m) => m.memberId !== JSON.parse(localStorage.getItem('auth')).id
          );
          m.items = l;

          return m;
        })
      )
      .subscribe((pager) => {
        this.members = pager.items;
        this.pagination = pager;
      });
  }
  updatePagenation(event) {
    this.memberService
      .getmembers(event.pageIndex + 1, event.pageSize)
      .subscribe((pager) => {
        this.members = pager.items;
        this.pagination = pager;
      });
  }
}
