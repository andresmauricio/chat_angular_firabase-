import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public message;
  private element: any;

  constructor(public chatService: ChatService) { 
    this.chatService.getMesages().subscribe( () => { 
      this.element.scrollTop = this.element.scrollHeight;
    });
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  public sendMessage() {
    if (this.message.length === 0) return;
    this.chatService.addMessage(this.message)
      .then( () =>  this.message = "" )
      .catch( e => console.error('Fallo al envair', e) )
  }


}
