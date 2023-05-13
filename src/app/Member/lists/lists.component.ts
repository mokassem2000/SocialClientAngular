import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  ngOnInit(): void {
    this.loadMemberLikes(this.pridicate);
  }

  constructor(private memberservice: MemberService) {}
  members: any[];
  pridicate = 'liked';

  loadMemberLikes(prdicate: string) {
    this.memberservice.GetUsersLikes(prdicate).subscribe((members) => {
      this.members = members;
    });
  }
}
