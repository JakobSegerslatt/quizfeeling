import { Team } from './team';

export interface Room {
    id?: string; // Added by snapshot changes
    name: string;
    password: string;
    latestPlayed?: Team;
    created: Date;
    updated: Date;
}
