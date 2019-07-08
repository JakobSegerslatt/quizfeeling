import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map, skip, tap, first, throttleTime } from 'rxjs/operators';
import { Team } from '../models/team';
import { AudioService } from '../services/audio.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Room } from '../models/room';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit, OnDestroy {
  room: Room;
  roomId: string;

  team$: Observable<Team>;

  constructor(
    private dialog: MatDialog,
    private audioService: AudioService,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.pipe(first()).subscribe(params => {
      this.roomId = params['id'];

      this.roomService.setActiveRoom(this.roomId);

      this.listenForLatestTeam();
    });
  }

  ngOnDestroy() {}

  public deleteRoom(): void {
    const instance = this.dialog.open(ConfirmDeleteComponent);
    instance.componentInstance.room = this.room;

    instance.afterClosed().subscribe(del => {
      if (del) {
        this.roomService
          .remove(this.roomId)
          .then(_ => this.router.navigateByUrl('home'));
      }
    });
  }

  listenForLatestTeam(): any {
    let iterations = 0;
    this.team$ = this.roomService.latestPlayed$.pipe(
      throttleTime(1000),
      map(team => {
        // Skip the first load
        if (iterations > 0) {
          this.audioService.play(team.sound);
          return team;
        }
        return team || ({} as Team);
      }),
      tap(_ => iterations++)
    );
  }
}
