import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamFormComponent } from '../team-form/team-form.component';
import { AudioService } from '../services/audio.service';
import { TeamService } from '../services/team.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  roomId: string;
  room$ = this.roomService.activeRoom$;
  teams$ = this.roomService.activeTeams$.pipe(
    tap(teams => (this.teamCount = teams.length))
  );

  teamCount: number;

  disableButton: boolean;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private toast: MatSnackBar,
    private dialog: MatDialog,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params => {
      // Get objtype
      this.roomId = params['id'];

      /** If a user successfully joins a room, update its date to last another 24 hours */
      this.roomService.update(this.roomId, { updated: new Date() });
      this.roomService.setActiveRoom(this.roomId);
    });
  }

  public createTeam(): void {
    this.dialog
      .open(TeamFormComponent)
      .afterClosed()
      .subscribe((team: Team) => {
        if (team) {
          this.teamService.add(this.roomId, team);

          const snack = this.toast.open(
            `Lag ${team.name} har skapats. Lycka till!`
          );
          setTimeout(_ => {
            snack.dismiss();
          }, 3000);
        }
      });
  }
}
