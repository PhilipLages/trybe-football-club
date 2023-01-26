import { IMatchesByTeam } from '../modules/interfaces/matchProps';

export default class Leaderboard {
  private _matches;
  private _where;

  constructor(matches: IMatchesByTeam[], where: string) {
    this._matches = matches;
    this._where = where;
  }

  private _calculateHomeTeamPoints = ({ homeMatches }: IMatchesByTeam) => homeMatches
    .map(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) return 3;

      return homeTeamGoals === awayTeamGoals ? 1 : 0;
    }).reduce((acc: number, curr: number) => acc + curr, 0);

  private _calculateAwayTeamPoints = ({ awayMatches }: IMatchesByTeam) => awayMatches
    .map(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals < awayTeamGoals) return 3;

      return homeTeamGoals === awayTeamGoals ? 1 : 0;
    }).reduce((acc: number, curr: number) => acc + curr, 0);

  private _getPoints = (match: IMatchesByTeam) => {
    if (this._where === 'home') {
      return this._calculateHomeTeamPoints(match);
    } if (this._where === 'away') {
      return this._calculateAwayTeamPoints(match);
    }
  };

  private _getGames = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.length;
    } if (this._where === 'away') {
      return awayMatches.length;
    }
  };

  private _getVictories = ({ homeMatches, awayMatches }: IMatchesByTeam) => {
    if (this._where === 'home') {
      return homeMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    } if (this._where === 'away') {
      return awayMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
    }
  };

  public createLeaderboard = () => this._matches.map((match) => (
    {
      name: match.teamName,
      totalPoints: this._getPoints(match),
      totalGames: this._getGames(match),
      totalVictories: this._getVictories(match),
    }
  ));
}
