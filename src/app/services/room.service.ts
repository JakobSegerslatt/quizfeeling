import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { Team } from '../models/team';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoomService {
  private _rooms$ = new BehaviorSubject<Array<Room>>([]);
  private _activeRoom$ = new BehaviorSubject<Room>(null);
  private _activeTeams$ = new BehaviorSubject<Array<Team>>([]);
  private _latestPlayed$ = new BehaviorSubject<Team>(null);
  private _loading$ = new BehaviorSubject<boolean>(true);

  public rooms$ = this._rooms$.asObservable();
  public activeRoom$ = this._activeRoom$.asObservable();
  public activeTeams$ = this._activeTeams$.asObservable();
  public latestPlayed$ = this._latestPlayed$.asObservable();
  public loading$ = this._loading$.asObservable();

  private activeRoomId: string;
  private roomSub: Subscription;
  private teamSub: Subscription;
  private latestPlayedSub: Subscription;
  private collection$ = this.db.collection<Room>('rooms');

  constructor(private db: AngularFirestore) {
    this.collection$
      .valueChanges()
      .pipe(
        tap(rooms => this._rooms$.next(rooms)),
        tap(rooms => this._loading$.next(false))
      )
      .subscribe();
  }

  setActiveRoom(roomId: string) {
    if (roomId === this.activeRoomId) {
      return;
    }

    this.activeRoomId = roomId;
    this._activeRoom$.next({} as any);

    if (this.roomSub) {
      this.roomSub.unsubscribe();
    }
    this.roomSub = this.collection$
      .doc<Room>(roomId)
      .valueChanges()
      .pipe(
        tap(room => {
          this._activeRoom$.next(room);
        })
      )
      .subscribe();

    if (this.teamSub) {
      this.teamSub.unsubscribe();
    }
    this.teamSub = this.collection$
      .doc<Room>(roomId)
      .collection<Team>('teams')
      .valueChanges()
      .pipe(
        tap(teams => {
          this._activeTeams$.next(teams);
        })
      )
      .subscribe();
    if (this.latestPlayedSub) {
      this.latestPlayedSub.unsubscribe();
    }
    this.latestPlayedSub = this.db
      .collection('latestPlayed')
      .doc<Team>(roomId)
      .valueChanges()
      .pipe(
        tap(team => {
          this._latestPlayed$.next(team);
        })
      )
      .subscribe();
  }

  add(room: Room) {
    const id = this.db.createId();

    room = {
      id,
      ...room
    };
    return this.collection$
      .doc(id)
      .set(room)
      .then(success => {
        // Create an antry in latestPlayed Collection
        this.db
          .collection('latestPlayed')
          .doc(id)
          .set({});

        return success;
      });
  }

  update(id, room: Partial<Room>) {
    return this.collection$.doc(id).update(room);
  }

  remove(id: string) {
    this.db
      .collection('latestPlayed')
      .doc(id)
      .delete();

    return this.collection$.doc(id).delete();
  }
}
