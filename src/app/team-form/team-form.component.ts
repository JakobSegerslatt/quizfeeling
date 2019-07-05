import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { contains, getRandomEntry } from 'papilion';

import { SoundSource, MOVIESOUNDS } from '../models/sound-list';
import { BodyEmojis, FaceEmojis } from '../models/emojis';

import { AudioService } from '../services/audio.service';
import { Team } from '../models/team';
import { TeamNames } from '../models/team-names';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  /** Placeholder for the name input, mainly for inspiration of a team name */
  placeholder: string;
  placeholderIntervalId: any;

  soundSources = [...MOVIESOUNDS];
  filteredSounds: Observable<SoundSource[]>;

  members: string[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeamFormComponent>,
    public audioService: AudioService) { }

  ngOnInit() {
    this.form = this.createTeamForm();

    this.filteredSounds = this.form.get('sound').valueChanges
      .pipe(
        startWith(''),
        map(val => val ? this.filterSounds(val) : this.soundSources.slice())
      );

    this.members = this.getRandomEmojis(3, 'people');

    this.generateRandomPlaceholders();
  }

  ngOnDestroy() {
    clearInterval(this.placeholderIntervalId);
  }

  createTeamForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sound: ['', [Validators.required]]
    });
  }

  generateRandomPlaceholders(): any {
    this.placeholder = `Kanske '${getRandomEntry(TeamNames)}'?`;

    setInterval(() => {
      this.placeholder = `..eller '${getRandomEntry(TeamNames)}'?`;
    }, 3000);
  }

  getRandomEmojis(count: number, type: 'people' | 'faces'): string[] {
    const emojisToReturn: string[] = [];

    /** Determine which source array to use */
    let emojiList: string[] = [];
    if (type === 'people') {
      emojiList = BodyEmojis;
    } else if (type === 'faces') {
      emojiList = FaceEmojis;
    }

    // Push in a random emoji until we hit the count
    for (let index = 0; index < count; index++) {
      const randomEmoji = getRandomEntry(emojiList, emojisToReturn);
      emojisToReturn.push(randomEmoji);
    }

    return emojisToReturn;
  }

  public displayFn(s?: SoundSource): string | SoundSource {
    return s ? s.name : s;
  }

  public save() {
    const team: Team = {
      ...this.form.value,
      members: this.members,
    };
    this.dialogRef.close(team);
  }

  private filterSounds(value: string = ''): SoundSource[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      const results = this.soundSources
        .filter(sound => contains(sound.name, filterValue) || contains(sound.quote, filterValue));
      return results;
    }
  }
}
