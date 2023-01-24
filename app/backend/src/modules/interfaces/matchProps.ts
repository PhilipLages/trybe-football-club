import Match from '../../database/models/Match';
import IStatus from './statusProps';

export interface AllMatches extends IStatus {
  data: Match[]
}

export interface IMatch extends IStatus {
  data: Match;
}

export interface INewMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}
