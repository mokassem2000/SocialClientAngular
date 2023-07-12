import { Component, Input, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';
import { ActivatedRoute } from '@angular/router';
import { Imessage } from '../Interfaces/messsage';
import { SignalRServiceService } from '../_services/signal-rservice.service';
import { IRealmessage } from '../Interfaces/IrealMessage';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css'],
})
export class MemberMessageComponent implements OnInit {
  @Input() id: string;
  @Input() messages: IRealmessage[];
  m: string[];
  constructor(
    private message: MessagesService,
    private route: ActivatedRoute,
    private signalRServiceService: SignalRServiceService
  ) {}
  ngOnInit() {
    this.signalRServiceService.buildConnection();
    this.signalRServiceService.addReceiveMessageListener((m) =>
      this.messages.push(m)
    );
  }

  onSendMessage(ele: HTMLInputElement) {
    this.signalRServiceService.sendMessage({
      SenderId: JSON.parse(localStorage.getItem('auth'))['id'],
      RecipientId: `${this.route.snapshot.params['id']}`,
      senderPhotoUrl: JSON.parse(localStorage.getItem('auth'))['photoUrl'],
      content: ele.value,
    });

    // this.message
    //   .sendMessage(this.route.snapshot.params['id'], ele.value)
    //   .subscribe((r) => {
    //     this.messages.push(r);

    //     ele.value = '';
    //   });
  }
}
