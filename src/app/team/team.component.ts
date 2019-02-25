import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { first, tap, skip  } from 'rxjs/operators';

import { Team } from '../models/team';
import { AudioService } from '../services/audio.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  roomId: string;
  teamId: string;

  team: Team;
  team$: Observable<Team>;

  /** The team who latest raised their hand */
  latestTeam$: Observable<Team>;

  disableButton: boolean;

  constructor(
    private audioService: AudioService,
    private db: AngularFirestore,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(first())
      .subscribe(params => {
        // Get objtype
        this.roomId = params['id'];
        this.teamId = params['teamId'];

        this.team$ = this.db
          .collection('rooms')
          .doc<Room>(this.roomId)
          .collection('teams')
          .doc<Team>(this.teamId)
          .valueChanges()
          .pipe(tap(team => this.team = team));
      });

    this.listenForLatestTeam();
  }

  listenForLatestTeam(): any {
    this.latestTeam$ = this.db
      .collection('latestPlayed')
      .doc<Team>(this.roomId)
      .valueChanges()
      .pipe(
        skip(1),
        tap(value => {
          this.disableButton = true;

          // Enable the button again after 3 seconds
          const id = setTimeout(_ => {
            this.disableButton = false;
            clearTimeout(id);
          }, 3000);
        }));
  }

  public raiseHand(): void {
    // Play audio
    this.audioService.play(this.team.sound);

    // Update latest played audio in the db
    this.db
      .collection('latestPlayed')
      .doc<Room>(this.roomId)
      .update({
        ...this.team,
        updated: new Date()
      }).then();
  }
}
