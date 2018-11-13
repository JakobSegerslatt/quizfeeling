import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rooms$: Observable<Room[]>;
  roomCount = 0;

  createForm: FormGroup;

  constructor(
    public db: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private toast: MatSnackBar,
  ) { }

  ngOnInit() {
    this.rooms$ = this.db.collection<Room>('rooms').snapshotChanges()
      .pipe(
        map(rooms => rooms.map(r => {
          const data = r.payload.doc.data() as Room;
          const id = r.payload.doc.id;
          return { id, ...data };
        })),
        tap(rooms => {
          this.roomCount = rooms.length;
        })
      );

    this.createForm = this.fb.group({
      name: ['', [Validators.minLength(2), Validators.required]],
      password: ['', [Validators.minLength(2), Validators.required]],
    });
  }


  public create(): void {
    this.db.collection<Room>('rooms').add(this.createForm.value);
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
