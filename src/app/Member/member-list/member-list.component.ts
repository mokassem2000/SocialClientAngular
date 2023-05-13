import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { pager } from 'src/app/Interfaces/Pagination';

import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: IMember[];
  pagination: pager;

  constructor(private memberService: MemberService) {}
  ngOnInit(): void {
    this.memberService.getmembers(1, 2).subscribe((pager) => {
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
