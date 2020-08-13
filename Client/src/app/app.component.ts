import { Message } from './Interface/message';
import { SocketIoService } from './services/socket-io.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatList } from '@angular/material/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Client';

  public username: string;
  public message: string;
  public messages: Message[] = [];
  private subscriptionsMessages: Subscription;

  @ViewChild(MatList, { read: ElementRef, static: true }) list: ElementRef;

  ngOnInit() {
    this.socketService.messages().subscribe((m: Message) => {
      console.log(m);
      this.messages.push(m);
    });
  }

  constructor(
    private socketService: SocketIoService) {

  }

  send() {
    this.socketService.send({
      from: this.username,
      message: this.message
    });
    this.message = '';
  }

  ngOnDestroy() {
    this.subscriptionsMessages.unsubscribe();
  }
}
