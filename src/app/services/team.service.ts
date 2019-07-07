import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Team } from '../models/team';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from '../models/room';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TeamService {
  constructor(private db: AngularFirestore) {}

  add(roomId: string, team: Team) {
    const id = this.db.createId();

    team = {
      id,
      ...team
    };

    this.getTeamRef(roomId, team).set(team);
  }

  update(roomId: string, team: Team) {
    this.getTeamRef(roomId, team).update(team);
  }

  delete(roomId: string, team: Team) {
    this.getTeamRef(roomId, team).delete();
  }

  private getTeamRef(roomId: string, team: Team) {
    return this.db
      .collection<Room>('rooms')
      .doc(roomId)
      .collection<Team>('teams')
      .doc(team.id);
  }
}
