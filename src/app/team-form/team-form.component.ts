import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SoundSource, MOVIESOUNDS } from '../models/sound-list';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AudioService } from '../services/audio.service';
import { contains } from '../hepler-functions';
import { BodyEmojis, FaceEmojis } from './emojis';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  form: FormGroup;

  soundSources = [...MOVIESOUNDS];
  filteredSounds: Observable<SoundSource[]>;

  members: string[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TeamFormComponent>,
    public audioService: AudioService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      sound: ['', [Validators.required]]
    });

    this.filteredSounds = this.form.get('sound').valueChanges
      .pipe(
        startWith(''),
        map(val => val ? this.filterSounds(val) : this.soundSources.slice())
      );

    this.members = this.getRandomEmojis(3, 'people');
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
      const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
      emojisToReturn.push(randomEmoji);
    }

    return emojisToReturn;
  }

  public displayFn(s?: SoundSource): string | SoundSource {
    return s ? s.name : s;
  }

  public save() {
    this.dialogRef.close(this.form.value);
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
