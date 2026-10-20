import PlayoffPredictorClient from "./PlayoffPredictorClient";

import {
  getRemainingSchedule,
  getLeagueTeams,
  getTeamScoringHistory,
} from "../../lib/sleeper";

export default async function PlayoffPredictorPage() {
  const schedule =
    await getRemainingSchedule();

  const teams =
    await getLeagueTeams();

  const standings =
    await getLeagueTeams();

  const scoringHistory =
    await getTeamScoringHistory();

  const getTeamName = (
    rosterId: number
  ) =>
    teams.find(
      (t) => t.rosterId === rosterId
    )?.team ?? "Unknown";

  const predictorData = schedule.map(
    (weekData) => {
      const matchups: Record<
        string,
        any[]
      > = {};

      weekData.matchups.forEach(
        (team: any) => {
          const id = team.matchup_id;

          if (!matchups[id]) {
            matchups[id] = [];
          }

          matchups[id].push(team);
        }
      );

      const formattedMatchups =
        Object.values(matchups)
          .filter(
            (matchup: any) =>
              matchup.length === 2
          )
          .map((matchup: any) => ({
            matchupId:
              matchup[0].matchup_id,

            team1: {
              rosterId:
                matchup[0].roster_id,
              team: getTeamName(
                matchup[0].roster_id
              ),
            },

            team2: {
              rosterId:
                matchup[1].roster_id,
              team: getTeamName(
                matchup[1].roster_id
              ),
            },
          }));

      return {
        week: weekData.week,
        matchups:
          formattedMatchups,
      };
    }
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        🧮 Playoff Predictor
      </h1>

      <PlayoffPredictorClient
  schedule={predictorData}
  standings={standings}
  scoringHistory={scoringHistory}
/>
    </div>
  );
}
