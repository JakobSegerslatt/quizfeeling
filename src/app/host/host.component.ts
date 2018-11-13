import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map, skip, tap } from 'rxjs/operators';
import { Team } from '../models/team';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit, OnDestroy {
  team$: Observable<Team>;

  constructor(
    private db: AngularFirestore,
    private audioService: AudioService
  ) { }

  ngOnInit() {
    let iterations = 0;
    this.team$ = this.db.collection<Team>('latestPlayed').doc<Team>('team')
      .valueChanges()
      .pipe(
        map(team => {
          // Don't play the sound on load
          if (iterations > 0) {
            this.audioService.play(team.sound);
            return team;
          }
          return {} as Team;
        }),
        tap(_ => iterations++)
      );
  }

  ngOnDestroy() {
  }

}
