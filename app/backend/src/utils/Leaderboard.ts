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
    const goalsFavor = this.getGoalsFavor(match);
    const goalsOwn = this.getGoalsOwn(match);

    if (!goalsFavor || !goalsOwn) return undefined;

    return goalsFavor - goalsOwn;
  };

  private getEfficiency = (game: IMatchesByTeam) => {
    const points = this.getPoints(game);
    const games = this.getGames(game);

    if (!points || !games) return undefined;

    const efficiency = ((points / (games * 3)) * 100).toFixed(2);

    return efficiency;
  };

  public createLeaderboard = () => this._matches.map((match) => (
    {
      name: match.teamName,
      totalPoints: this.getPoints(match),
      totalGames: this.getGames(match),
      totalVictories: this.getVictories(match),
      totalDraws: this.getDraws(match),
      totalLosses: this.getLosses(match),
      goalsFavor: this.getGoalsFavor(match),
      goalsOwn: this.getGoalsOwn(match),
      goalsBalance: this.getBalance(match),
      efficiency: this.getEfficiency(match),
    }
  ));
}
