import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Imessage } from '../Interfaces/messsage';
import { IRealmessage } from '../Interfaces/IrealMessage';

@Injectable({
  providedIn: 'root',
})
export class SignalRServiceService {
  private hubConnection: HubConnection;
  constructor() {}

  public buildConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7068/MessageHub')
      .build();
    console.log('mo kassem traying to start signalr');
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started.'))
      .catch((err) =>
        console.log('Error while starting SignalR connection: ' + err)
      );
  }
  public addReceiveMessageListener(
    callback: (message: IRealmessage) => void
  ): void {
    this.hubConnection.on('udateMessageBox', callback);
  }

  public sendMessage(message: IRealmessage) {
    this.hubConnection
      .invoke('NotifyMessage', message)
      .catch((err) => console.log('Error while sending message: ' + err));
  }
}
