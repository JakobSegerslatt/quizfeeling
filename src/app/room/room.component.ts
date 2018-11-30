import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { Observable, timer } from 'rxjs';
import { Team } from '../models/team';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TeamFormComponent } from '../team-form/team-form.component';
import { AudioService } from '../services/audio.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomId: string;
  room$: Observable<Room>;
  room: Room;

  teams$: Observable<Team[]>;
  teamCount: number;

  disableButton: boolean;
  constructor(
    private route: ActivatedRoute,
    private audioService: AudioService,
    private toast: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.route.params
      .pipe(first())
      .subscribe(params => {
        // Get objtype
        this.roomId = params['id'];

        this.room$ = this.db.collection('rooms').doc<Room>(this.roomId)
          .valueChanges()
          .pipe(tap(r => this.room = r));

        this.teams$ = this.db.collection<Team>('teams', ref => ref.where('roomId', '==', this.roomId))
          .valueChanges()
          .pipe(tap(x => this.teamCount = x.length));
      });

    // We subscribe in this component so that not each team component needs to listen for the same event
    this.db.collection<any>('latestPlayed').doc<any>('team')
      .valueChanges()
      .subscribe(t => {
        this.disableButton = true;
        timer(3000).subscribe(_ => {
          this.disableButton = false;
        });
      });
  }

  public createTeam(): void {
    this.dialog.open(TeamFormComponent)
      .afterClosed().subscribe((team: Team) => {
        if (team) {
          this.db.collection<Team>('teams').add({
            roomId: this.roomId,
            ...team
          });

          const snack = this.toast.open(`Lag ${team.name} har skapats. Lycka till!`);
          setTimeout(_ => {
            snack.dismiss();
          }, 3000)
        }
      });
  }
}
