import { Injectable } from '@angular/core';
import { SoundSource } from '../models/sound-list';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }


  public play(sound: SoundSource) {
    const audio = new Audio(sound.path);
    audio.play();

    let playLimit = sound.seconds || 5; // Don't allow sounds to play for more than 5 seconds
    if (playLimit > 5) {
      playLimit = 5;
    }
    timer(playLimit * 1000).subscribe(_ => {
      audio.pause();
    });
  }
}
