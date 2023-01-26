import Match from '../../database/models/Match';
import IStatus from './statusProps';

export interface AllMatches extends IStatus {
  data: Match[]
}

export interface IMatch extends IStatus {
  data: Match | { message?: string };
}

export interface INewMatch {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IFInishMatch extends IStatus {
  data: { message: string }
}

export interface IUpdateMatch {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface IMatchesByTeam {
  id?: number;
  teamName: string;
  homeMatches: {
    homeTeamGoals: number,
    awayTeamGoals: number,
  }[]
  awayMatches: {
    homeTeamGoals: number,
    awayTeamGoals: number,
  }[]
}
