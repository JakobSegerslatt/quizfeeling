import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SoundSource, MOVIESOUNDS } from '../models/sound-list';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AudioService } from '../services/audio.service';
import { contains } from '../hepler-functions';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  form: FormGroup;

  soundSources = [...MOVIESOUNDS];
  filteredSounds: Observable<SoundSource[]>;

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
