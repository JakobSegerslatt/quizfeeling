import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { first, tap, skip, map } from 'rxjs/operators';

import { Team } from '../models/team';
import { AudioService } from '../services/audio.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  roomId: string;
  teamId: string;

  team$: Observable<Team>;

  /** The team who latest raised their hand */
  latestTeam$: Observable<Team>;

  disableButton: boolean;

  constructor(
    private audioService: AudioService,
    private roomService: RoomService,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params => {
      // Get objtype
      this.roomId = params['id'];
      this.teamId = params['teamId'];

      this.roomService.setActiveRoom(this.roomId);

      this.team$ = this.roomService.activeTeams$.pipe(
        map(teams => teams.find(t => t.id === this.teamId))
      );
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
        })
      );
  }

  public raiseHand(team: Team): void {
    // Play audio
    this.audioService.play(team.sound);

    // Update latest played audio in the db
    this.db
      .collection('latestPlayed')
      .doc<Room>(this.roomId)
      .update({
        ...team,
        updated: new Date()
      })
      .then();
  }
}
