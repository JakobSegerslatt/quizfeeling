import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit, OnDestroy {
  sub: Subscription;


  constructor(
    private db: AngularFirestore,
  ) { }

  ngOnInit() {
   this.db.collection<any>('latestPlayed').doc<any>('team')
      .valueChanges()
      .subscribe(t => {
        let path = '';
        if (t.team && t.team.musicPath) {
          path = t.team.musicPath;
        }
        const audio = new Audio(path);
        t.audio = audio;
        t.audio.play();
      });
  }

  ngOnDestroy() {
  }

}
