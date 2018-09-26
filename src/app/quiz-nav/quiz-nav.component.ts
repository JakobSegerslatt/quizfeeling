import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

import { map, tap } from 'rxjs/operators';
import { Team } from '../team.model';


@Component({
  selector: 'app-quiz-nav',
  templateUrl: './quiz-nav.component.html',
  styleUrls: ['./quiz-nav.component.scss']
})
export class QuizNavComponent implements OnInit {
  teams$: Observable<Team[]>;
  disable: boolean;
  teams: Team[] = [
    {
      name: 'Lag 1',
      musicPath: '',
    },
    {
      name: 'Lag 2',
      musicPath: '',
    },
    {
      name: 'Lag 2',
      musicPath: '',
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private db: AngularFirestore,
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.loadTeams();
    // this.loadAudio();
    this.db.collection<any>('latestPlayed').doc<any>('team')
    .valueChanges()
    .subscribe(t => {
 this.disable = true;
 setInterval(_ => {
   this.disable = false;
 }, 3000);
    });
  }

  loadTeams() {
    this.teams$ = this.db.collection<Team>('teams').valueChanges()
      .pipe(
        tap(teams => this.teams = teams)
      );
  }

  loadAudio() {
    this.teams.forEach(t => {
      const audio = new Audio(t.musicPath);
      t.audio = audio;
      t.audio.load();
      t.audio.play();
    });
  }

  raiseHand(t: Team) {
    // Play audio
    const audio = new Audio(t.musicPath);
    audio.play();

    // Update latest played audio in the db
    this.db.collection('latestPlayed').doc('team').update({ team: t })
      .then(value => {
        console.log(value);
      });
  }
}
