import IStatus from './statusProps';

export default interface ILeaderboard {
  name: string;
  totalPoints: number,
  totalGames: number
  totalVictories: number,
  totalDraws: number
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export interface LeaderboardReturn extends IStatus {
  data: ILeaderboard[]
}
