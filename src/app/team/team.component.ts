import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Team } from '../models/team';
import { AudioService } from '../services/audio.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  @Input() team: Team;
  @Input() roomId: string;
  @Input() disableButton: boolean;

  constructor(
    private audioService: AudioService,
    private db: AngularFirestore
  ) { }

  ngOnInit() {

  }

  public raiseHand(): void {
    // Play audio
    this.audioService.play(this.team.sound);

    // Update latest played audio in the db

    this.db
      .collection('rooms')
      .doc<Room>(this.roomId)
      .update({
        latestPlayed: {
          ...this.team,
          updated: new Date()
        }
      }).then(value => {
        console.log(value);
      });
  }
}
