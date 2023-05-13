import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imessage } from '../Interfaces/messsage';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  url = 'https://localhost:7068/createMessage';
  constructor(private http: HttpClient) {}

  sendMessage(PageNumber: number, PageSize: number, Container: string) {
    return this.http.post<Imessage>(this.url, {
      recipientUserId: 2,
      content: 'tryng to send message ',
    });
  }
}
