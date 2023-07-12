import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { IRetryPolicy } from '@microsoft/signalr';
import { Observable, map, observable, tap } from 'rxjs';
import { IMember } from 'src/app/Interfaces/IMember.interface';
import { IRealmessage } from 'src/app/Interfaces/IrealMessage';
import { Imessage } from 'src/app/Interfaces/messsage';
import { IUser } from 'src/app/_entites/iuser';
import { MemberService } from 'src/app/_services/member.service';
import { MessagesService } from 'src/app/_services/messages.service';

@Component({
  selector: 'app-member-ditail',
  templateUrl: './member-ditail.component.html',
  styleUrls: ['./member-ditail.component.css'],
})
export class MemberDitailComponent implements OnInit {
  User$: Observable<IMember>;
  user: IMember;
  @ViewChild('tabsParent') tabsParent: MatTabGroup;
  tabData: MatTab;
  mainPhoto: string;
  messages: IRealmessage[] = [];

  constructor(
    private route: ActivatedRoute,
    private member: MemberService,
    private message: MessagesService
  ) {}
  ngOnInit(): void {
    this.LoadUserDitail();
  }
  LoadUserDitail() {
    let id: string;
    this.route.params.subscribe((p) => (id = p['id']));
    this.User$ = this.member.getmember(id).pipe(
      tap((u) => (this.mainPhoto = u.photos.find((p) => p.isMain).url)),
      tap((m) => (this.user = m))
    );
  }
  loadMessages() {
    this.message.getMessageThread(this.user.memberId).subscribe((m) => {
      this.messages = m.map((m) => {
        return {
          SenderId: m.senderId,
          RecipientId: m.recipientId,
          senderPhotoUrl: m.senderPhotoUrl,
          content: m.content,
        } as IRealmessage;
      });
    });
  }
  selectMessageTab() {
    this.tabsParent.selectedIndex = 3;
  }
  onTabActivated(data: MatTabChangeEvent) {
    this.tabData = data['tab'];
    if (this.tabData.textLabel === 'Messages' && this.messages.length <= 0) {
      this.loadMessages();
    }
  }
}
