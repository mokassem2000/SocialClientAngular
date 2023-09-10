import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { IRetryPolicy } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
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
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private member: MemberService,
    private message: MessagesService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.LoadUserDitail();
  }
  LoadUserDitail() {
    this.route.params.subscribe((p) => (this.id = p['id']));
    this.User$ = this.member.getmember(this.id).pipe(
      tap(
        (u) =>
          (this.mainPhoto = u.photos.find((p) => p.isMain)?.url
            ? u.photos.find((p) => p.isMain)?.url
            : '../../../assets/Cute Anime Illustration Boy Avatar.png')
      ),
      tap((m) => (this.user = m)),
      tap((m) => console.log(m))
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

  onLike() {
    console.log('like');
    this.member.addLike(this.id).subscribe(() => {
      this.toastr.success(`you have liked this user`);
    });
  }
}
