import { IMatchesByTeam } from '../modules/interfaces/matchProps';

export default class Leaderboard {
  private _matches;
  private _where;

  constructor(matches: IMatchesByTeam[], where: string) {
    this._matches = matches;
    this._where = where;
  }

  private calculateHomeTeamPoints = ({ homeMatches }: IMatchesByTeam) => homeMatches
    .map(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) return 3;

      return homeTeamGoals === awayTeamGoals ? 1 : 0;
    }).reduce((acc: number, curr: number) => acc + curr, 0);

  private calculateAwayTeamPoints = ({ awayMatches }: IMatchesByTeam) => awayMatches
    .map(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) return 3;

      return homeTeamGoals === awayTeamGoals ? 1 : 0;
    }).reduce((acc: number, curr: number) => acc + curr, 0);

  private getPoints = (match: IMatchesByTeam) => {
    if (this._where === 'home') {
      return this.calculateHomeTeamPoints(match);
    } if (this._where === 'away') {
      return this.calculateAwayTeamPoints(match);
    }
  };

  private getGames = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.length;
    } if (this._where === 'away') {
      return awayMatches.length;
    }
  };

  private getVictories = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    } if (this._where === 'away') {
      return awayMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
    }
  };

  private getDraws = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    } if (this._where === 'away') {
      return awayMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
    }
  };

  private getLosses = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    } if (this._where === 'away') {
      return awayMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    }
  };

  private getGoalsFavor = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.map(({ homeTeamGoals }) => homeTeamGoals)
        .reduce((acc: number, curr: number) => acc + curr, 0);
    } if (this._where === 'away') {
      return awayMatches.map(({ awayTeamGoals }) => awayTeamGoals)
        .reduce((acc: number, curr: number) => acc + curr, 0);
    }
  };

  private getGoalsOwn = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.map(({ awayTeamGoals }) => awayTeamGoals)
        .reduce((acc: number, curr: number) => acc + curr, 0);
    } if (this._where === 'away') {
      return awayMatches.map(({ homeTeamGoals }) => homeTeamGoals)
        .reduce((acc: number, curr: number) => acc + curr, 0);
    }
  };

  private getBalance = (match: IMatchesByTeam) => {
    const goalsFavor = this.getGoalsFavor(match) as number;
    const goalsOwn = this.getGoalsOwn(match) as number;

    return (goalsFavor - goalsOwn);
  };

  private getEfficiency = (match: IMatchesByTeam) => {
    const points = this.getPoints(match) as number;
    const games = this.getGames(match) as number;

    const efficiency = ((points / (games * 3)) * 100).toFixed(2);

    return efficiency;
  };

  public createLeaderboard = () => this._matches.map((match) => ({
    name: match.teamName,
    totalPoints: this.getPoints(match) as unknown as number,
    totalGames: this.getGames(match) as unknown as number,
    totalVictories: this.getVictories(match) as unknown as number,
    totalDraws: this.getDraws(match) as unknown as number,
    totalLosses: this.getLosses(match) as unknown as number,
    goalsFavor: this.getGoalsFavor(match) as unknown as number,
    goalsOwn: this.getGoalsOwn(match) as unknown as number,
    goalsBalance: this.getBalance(match) as unknown as number,
    efficiency: this.getEfficiency(match) as unknown as string,
  })).sort((a, b) => b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.goalsOwn - a.goalsOwn);
}
