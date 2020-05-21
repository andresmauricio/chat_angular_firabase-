import { Component } from '@angular/core';
import { AngularFireDatabase,  } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public chats$: Observable<any[]>;

  constructor(public db: AngularFirestore) {
    this.chats$ = db.collection('chats').valueChanges();
  }
}
