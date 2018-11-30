import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, Observable } from 'rxjs';
import { map, skip, tap } from 'rxjs/operators';
import { Team } from '../models/team';
import { AudioService } from '../services/audio.service';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { Room } from '../models/room';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit, OnDestroy {
  @Input() listen: boolean = true;
  @Input() room: Room;
  @Input() roomId: string;
  
  team$: Observable<Team>;
  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    private audioService: AudioService,
    private router: Router,
  ) { }

  ngOnInit() {
    let iterations = 0;
    this.team$ = this.db.collection<Team>('latestPlayed').doc<Team>('team')
      .valueChanges()
      .pipe(
        map(team => {
          // Skip the first load
          if (iterations > 0) {
            if (this.listen) {
              this.audioService.play(team.sound);
            }
            return team;
          }
          return {} as Team;
        }),
        tap(_ => iterations++)
      );
  }

  ngOnDestroy() {
  }

  public deleteRoom(): void {
    const instance = this.dialog.open(ConfirmDeleteComponent);
    instance.componentInstance.room = this.room;

    instance.afterClosed().subscribe(del => {
      if (del) {
        this.db.collection<Room>('rooms')
          .doc(this.roomId)
          .delete()
          .then(_ => this.router.navigateByUrl('home'));
      }
    })
  }

}
