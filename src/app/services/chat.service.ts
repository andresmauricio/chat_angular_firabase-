import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '../interfaces/mesagge.interface';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore) { }

   public getMesages() {
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date', "desc").limit(10) );
    return this.itemsCollection.valueChanges().pipe(
      map((message: Message[]) => {
        this.chats = [];
        for (let content of message) {
          this.chats.unshift(content)
        }
        return this.chats;
      })
    )
  }

  public addMessage(message: string) {
    let content: Message = {
      message,
      name: 'Demo',
      date: new Date().getTime()
    }
    return this.itemsCollection.add(content);
  }
}
