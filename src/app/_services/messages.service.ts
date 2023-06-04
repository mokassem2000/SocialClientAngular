import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imessage } from '../Interfaces/messsage';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  url = 'https://localhost:7068';
  constructor(private http: HttpClient) {}

  sendMessage() {
    return this.http.post<Imessage>(this.url + '/createMessage', {
      recipientUserId: 2,
      content: 'tryng to send message ',
    });
  }
}
