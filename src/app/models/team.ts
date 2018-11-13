import { SoundSource } from './sound-list';

export class Team {
    roomId?: string;
    name: string;
    sound: SoundSource;
    
    // Added by snapshot changes
    id?: string; 
    
    // Added in client
    audio?: HTMLAudioElement;
}
