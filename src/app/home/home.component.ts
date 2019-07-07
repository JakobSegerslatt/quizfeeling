import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LineToLineMappedSource } from 'webpack-sources';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms$: Observable<Room[]>;
  roomCount = 0;

  /** New room form */
  createForm: FormGroup;

  loading$ = this.roomService.loading$;

  constructor(
    public roomService: RoomService,
    private fb: FormBuilder,
    private router: Router,
    private toast: MatSnackBar
  ) {}

  ngOnInit() {
    this.rooms$ = this.roomService.rooms$.pipe(
      map(rooms =>
        rooms.map(r => {
          const room = {
            ...r,
            created: this.convertDate(r.created),
            updated: this.convertDate(r.updated)
          };
          return room;
        })
      ),
      // Delete rooms which hasn't been updated in 24 hours
      map(rooms => {
        const roomsToDelete = rooms.filter(r => !lessThan24HoursAgo(r.updated));
        roomsToDelete.forEach(r => {
          this.deleteRoom(r);
        });

        return rooms.filter(r => lessThan24HoursAgo(r.updated));
      }),
      tap(rooms => {
        this.roomCount = rooms.length;
      })
    );

    this.createForm = this.fb.group({
      name: ['', [Validators.minLength(2), Validators.required]],
      password: ['', [Validators.minLength(2), Validators.required]],
      created: new Date(),
      updated: new Date()
    });
  }

  /**
   * Remove a room and all it's connections,
   * since teams are stored as a sub collection to the room,
   * they are removed automatically
   */
  deleteRoom(room: Room): any {
    this.roomService.remove(room.id);
  }

  /** Tries to convert a date stored in firestore */
  convertDate(date: Date): Date {
    let converted: Date;
    if (date && (date as any).toDate) {
      converted = (date as any).toDate();
    }
    return converted;
  }

  public create(): void {
    this.roomService.add(this.createForm.value);
    this.createForm.reset();
  }

  public join(room: Room, password: string): void {
    if (password === room.password) {
      this.router.navigate(['room', room.id]);
    } else {
      this.toast.open('Fel lösen!');
    }
  }
}

function lessThan24HoursAgo(date: Date): boolean {
  if (!date) {
    return false;
  }
  const twentyFourHours = 1000 * 60 * 60 * 24;
  const yesterday = Date.now() - twentyFourHours;
  return (date as any) > yesterday;
}
