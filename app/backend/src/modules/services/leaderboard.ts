import Match from '../../database/models/Match';
import Team from '../../database/models/Team';

export default class Leaderboard {
  private _modelTeam;
  private _modelMatch;

  constructor() {
    this._modelTeam = Team;
    this._modelMatch = Match;
  }
}
