import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { Observable, timer } from 'rxjs';
import { Team } from '../models/team';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TeamFormComponent } from '../team-form/team-form.component';
import { AudioService } from '../services/audio.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { addDocumentIds, addDocumentIds2 } from '../map-id-firestore';

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

        this.teams$ = this.db
          .collection('rooms').doc<Room>(this.roomId)
          .collection<Team>('teams')
          .valueChanges()
          .pipe(tap(teams => this.teamCount = teams.length));
      });
  }

  public createTeam(): void {
    this.dialog.open(TeamFormComponent)
      .afterClosed().subscribe((team: Team) => {
        if (team) {
          this.db
            .collection('rooms').doc(this.roomId)
            .collection<Team>('teams')
            .add(team)
            .then(success => {
              team.uid = success.id;
              return success.update({ ...team });
            });

          const snack = this.toast.open(`Lag ${team.name} har skapats. Lycka till!`);
          setTimeout(_ => {
            snack.dismiss();
          }, 3000);
        }
      });
  }
}
