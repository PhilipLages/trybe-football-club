import ILeaderboard from '../modules/interfaces/leaderboard';

const createFullLeaderboard = (homeL: ILeaderboard[], awayL: ILeaderboard[]) => (
  homeL.map((homeTeam) => {
    const awayTeam = awayL.find((awayT) => awayT.name === homeTeam.name);

    const getTotalPoints = () => {
      const homePoints = homeTeam.totalPoints as number;
      const awayPoints = awayTeam?.totalPoints as number;

      return homePoints + awayPoints;
    };

    return {
      name: homeTeam.name,
      totalPoints: getTotalPoints(),
    };
  }));

export default createFullLeaderboard;
