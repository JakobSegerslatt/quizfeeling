import { Team } from './team';

export interface Room {
    uid?: string; // Added by snapshot changes
    name: string;
    password: string;
    created: Date;
    updated: Date;
}
