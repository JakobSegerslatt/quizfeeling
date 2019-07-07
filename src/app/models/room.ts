import { Team } from './team';

export interface Room {
  id?: string; // Added by snapshot changes
  name: string;
  password: string;
  created: Date;
  updated: Date;
  teams: Array<Team>;
}
