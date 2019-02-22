import { SoundSource } from './sound-list';

export class Team {
    roomId?: string;
    name: string;
    sound: SoundSource;

    /** String arrays of emojis */
    members: string[];

    // Used when saved on latestPlayed in room objects
    updated?: Date;

    // Added by snapshot changes
    id?: string;

    // Added in client
    audio?: HTMLAudioElement;
}
