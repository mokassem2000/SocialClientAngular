import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../_services/messages.service';
import { Imessage } from '../Interfaces/messsage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Imessage[];
  container = '';
  id = '';

  constructor(
    private message: MessagesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => (this.id = param['id']));
    this.container == 'inbox';
    this.loadMesssage();
  }
  sendMessage() {
    this.message.sendMessage('dd', 'i love you');
  }
  deleteMessage(id: number) {
    this.message.deleteMessage(id).subscribe((m) => {
      console.log(m);
    });
  }
  loadMesssage() {
    this.message
      .getMessages(this.id, this.container)
      .subscribe((messages) => (this.messages = messages['result']));
  }
}
