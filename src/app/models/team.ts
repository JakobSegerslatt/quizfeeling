import { SoundSource } from './sound-list';

export class Team {
    id?: string; // Added by snapshot changes
    roomId?: string;
    name: string;
    sound: SoundSource;
    audio?: HTMLAudioElement;
}
