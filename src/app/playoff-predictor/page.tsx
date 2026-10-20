import {
  getRemainingSchedule,
  getLeagueTeams,
} from "../../lib/sleeper";

export default async function PlayoffPredictorPage() {
  const schedule =
    await getRemainingSchedule();

  const teams =
    await getLeagueTeams();

  const getTeamName = (
    rosterId: number
  ) =>
    teams.find(
      (t) => t.rosterId === rosterId
    )?.team ?? "Unknown";

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-8">
        🧮 Playoff Predictor
      </h1>

      {schedule.map((weekData) => {
        const matchups = {};

weekData.matchups.forEach(
  (team: any) => {
    const id = team.matchup_id;

    if (!matchups[id]) {
      matchups[id] = [];
    }

    matchups[id].push(team);
  }
);

const formattedMatchups = Object.values(
  matchups
)
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

        return (
          <div
            key={weekData.week}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">
              Week {weekData.week}
            </h2>

{formattedMatchups.map(
  (matchup: any) => (
    <div
      key={matchup.matchupId}
      className="border border-gray-700 rounded p-4 mb-2"
    >
      <div>
        {matchup.team1.team}
      </div>

      <div className="text-gray-500 my-1">
        vs
      </div>

      <div>
        {matchup.team2.team}
      </div>
    </div>
  )
)}
          </div>
        );
      })}
    </div>
  );
}
