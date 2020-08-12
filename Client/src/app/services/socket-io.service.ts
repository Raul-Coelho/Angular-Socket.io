import { environment } from './../../environments/environment';
import { Message } from './../Interface/message';
import { Injectable } from '@angular/core';
import * as socketIO from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = environment.url;
  private socket = socketIO(this.url);
  private subjMessages: Subject<Message> = new Subject<Message>();

  constructor() {
    this.socket.on('message', (m: Message) => {
      this.subjMessages.next(m);
    })
  }

  send(msg: Message) {
    this.socket.emit('message', msg);
  }

  messages() {
    return this.subjMessages.asObservable();
  }

}

