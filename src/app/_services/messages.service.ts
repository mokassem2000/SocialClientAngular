import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imessage } from '../Interfaces/messsage';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  url = 'https://localhost:7068';
  constructor(private http: HttpClient) {}

  sendMessage(recipientUserId: string, message: string) {
    return this.http.post<Imessage>(this.url + '/createMessage', {
      recipientUserId: recipientUserId,
      content: message,
    });
  }
  getMessageThread(id: string) {
    return this.http.get<Imessage[]>(this.url + '/thread/' + id);
  }
  // &PageNumber=${pageNumber}&PageSize=${pageSize}
  getMessages(id: string, container: string) {
    return this.http.get<Imessage[]>(
      this.url + '/messages' + `?UserID=${id}&container=${container}`
    );
  }

  deleteMessage(id: number) {
    return this.http.delete(this.url + '/message/delete/' + id);
  }
}
