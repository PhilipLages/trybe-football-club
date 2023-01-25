import { IMatchesByTeam, INewMatch } from '../modules/interfaces/matchProps';

const getPoints = (matches: INewMatch[]) => matches
  .map(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) return 3;

    return homeTeamGoals === awayTeamGoals ? 1 : 0;
  }).reduce((acc: number, curr: number) => acc + curr, 0);

const createLeaderboard = (matches: IMatchesByTeam[]) => matches.map((match) => (
  {
    name: match.teamName,
    totalPoints: getPoints(match.homeMatches),
  }
));

export default createLeaderboard;
