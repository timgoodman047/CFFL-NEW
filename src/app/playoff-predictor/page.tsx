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

        return (
          <div
            key={weekData.week}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">
              Week {weekData.week}
            </h2>

            {Object.values(matchups).map(
              (
                matchup: any,
                index
              ) => {
                if (
                  matchup.length !== 2
                )
                  return null;

                return (
                  <div
                    key={index}
                    className="border border-gray-700 rounded p-4 mb-2"
                  >
                    <div>
                      {getTeamName(
                        matchup[0]
                          .roster_id
                      )}
                    </div>

                    <div className="text-gray-500 my-1">
                      vs
                    </div>

                    <div>
                      {getTeamName(
                        matchup[1]
                          .roster_id
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
}
