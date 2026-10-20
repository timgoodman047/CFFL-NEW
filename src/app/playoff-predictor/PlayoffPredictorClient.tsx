"use client";

export default function PlayoffPredictorClient({
  schedule,
}: {
  schedule: any[];
}) {
  return (
    <div>
      {schedule.map((weekData) => (
        <div
          key={weekData.week}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">
            Week {weekData.week}
          </h2>

          {weekData.matchups.map(
            (matchup: any) => (
              <div
                key={matchup.matchupId}
                className="border border-gray-700 rounded p-4 mb-2"
              >
                <button className="w-full text-left p-2 rounded bg-gray-800 hover:bg-gray-700">
                  {matchup.team1.team}
                </button>

                <div className="text-gray-500 my-2 text-center">
                  vs
                </div>

                <button className="w-full text-left p-2 rounded bg-gray-800 hover:bg-gray-700">
                  {matchup.team2.team}
                </button>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
