import { Message } from './Interface/message';
import { SocketIoService } from './services/socket-io.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatList, MatListItem } from '@angular/material/list';

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
  private subscriptionsList: Subscription;

  @ViewChild(MatList, { read: ElementRef, static: true }) list: ElementRef;
  @ViewChildren(MatListItem) listItems: QueryList<MatListItem>;

  ngOnInit() {
    this.socketService.messages().subscribe((m: Message) => {
      console.log(m);
      this.messages.push(m);
    });
  }

  constructor(
    private socketService: SocketIoService) {

  }

  ngAfterViewInit() {
    this.subscriptionsList = this.listItems.changes.subscribe((e) => {
      this.list.nativeElement.scrollTop = this.list.nativeElement.scrollHeight;
    })
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
    this.subscriptionsList.unsubscribe();
  }
}
