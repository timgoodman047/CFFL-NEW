"use client";

function getAverage(scores: number[]) {
  return (
    scores.reduce(
      (sum, score) => sum + score,
      0
    ) / scores.length
  );
}

function getStdDev(scores: number[]) {
  const avg = getAverage(scores);

  const variance =
    scores.reduce(
      (sum, score) =>
        sum +
        Math.pow(score - avg, 2),
      0
    ) / scores.length;

  return Math.sqrt(variance);
}

import { useState } from "react";


export default function PlayoffPredictorClient({
  schedule,
  standings,
  scoringHistory,
}: {
  schedule: any[];
  standings: any[];
  scoringHistory: Record<number, number[]>;
}) {
  
  const [picks, setPicks] = useState<
    Record<string, number>
  >({});
console.log(
  standings.map((team) => ({
    team: team.team,
    avg: getAverage(
      scoringHistory[team.rosterId]
    ).toFixed(1),
    stdDev: getStdDev(
      scoringHistory[team.rosterId]
    ).toFixed(1),
  }))
);

  function selectWinner(
    week: number,
    matchupId: number,
    rosterId: number
  ) {
    setPicks((prev) => ({
      ...prev,
      [`${week}-${matchupId}`]: rosterId,
    }));
  }


  const projectedStandings = standings.map(
  (team) => {
    const scores =
      scoringHistory[team.rosterId] || [];

    return {
      ...team,
      projectedWins: team.wins,
      projectedLosses: team.losses,
      projectedPF: team.pf,

      avgPPG:
        scores.length > 0
          ? getAverage(scores)
          : 0,

      stdDev:
        scores.length > 0
          ? getStdDev(scores)
          : 0,
    };
  }
);

function autoPickByRecord() {
  const newPicks: Record<
    string,
    number
  > = {};

  schedule.forEach((weekData) => {
    weekData.matchups.forEach(
      (matchup: any) => {
        const team1 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team1.rosterId
          );

        const team2 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team2.rosterId
          );

        if (!team1 || !team2) return;

        const winner =
          team1.wins >= team2.wins
            ? matchup.team1.rosterId
            : matchup.team2.rosterId;

        newPicks[
          `${weekData.week}-${matchup.matchupId}`
        ] = winner;
      }
    );
  });

  setPicks(newPicks);
}
  
function autoPickByPF() {
  const newPicks: Record<
    string,
    number
  > = {};

  schedule.forEach((weekData) => {
    weekData.matchups.forEach(
      (matchup: any) => {
        const team1 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team1.rosterId
          );

        const team2 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team2.rosterId
          );

        if (!team1 || !team2) return;

        const winner =
          team1.pf >= team2.pf
            ? matchup.team1.rosterId
            : matchup.team2.rosterId;

        newPicks[
          `${weekData.week}-${matchup.matchupId}`
        ] = winner;
      }
    );
  });

  setPicks(newPicks);
}


function autoPickProjectedWinner() {
  const newPicks: Record<
    string,
    number
  > = {};


  schedule.forEach((weekData) => {
    weekData.matchups.forEach(
      (matchup: any) => {
        const team1 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team1.rosterId
          );


        const team2 =
          standings.find(
            (t) =>
              t.rosterId ===
              matchup.team2.rosterId
          );


        if (!team1 || !team2) return;


        const team1Score =
          team1.wins * 2 +
          team1.pf / 100;


        const team2Score =
          team2.wins * 2 +
          team2.pf / 100;


        const winner =
          team1Score >= team2Score
            ? matchup.team1.rosterId
            : matchup.team2.rosterId;


        newPicks[
          `${weekData.week}-${matchup.matchupId}`
        ] = winner;
      }
    );
  });
  
  setPicks(newPicks);
}


schedule.forEach((weekData) => {
  weekData.matchups.forEach(
    (matchup: any) => {
      const winner =
        picks[
          `${weekData.week}-${matchup.matchupId}`
        ];


      if (!winner) return;


      const loser =
        winner ===
        matchup.team1.rosterId
          ? matchup.team2.rosterId
          : matchup.team1.rosterId;


      const winnerTeam =
        projectedStandings.find(
          (t) =>
            t.rosterId === winner
        );


      const loserTeam =
        projectedStandings.find(
          (t) =>
            t.rosterId === loser
        );


      if (winnerTeam) {
  winnerTeam.projectedWins++;

  const winnerProjection =
    winnerTeam.avgPPG +
    winnerTeam.stdDev * 0.25;

  winnerTeam.projectedPF += winnerProjection;
}

if (loserTeam) {
  loserTeam.projectedLosses++;

  const loserProjection =
    loserTeam.avgPPG -
    loserTeam.stdDev * 0.25;

  loserTeam.projectedPF += loserProjection;
}
  }
  );
});

projectedStandings.sort(
  (a, b) => {
    if (
      b.projectedWins !==
      a.projectedWins
    ) {
      return (
        b.projectedWins -
        a.projectedWins
      );
    }

    return b.projectedPF - a.projectedPF;
  }
);

const topFive = [...projectedStandings]
  .slice(0, 5);

const wildcard = projectedStandings
  .slice(5)
  .sort(
    (a, b) =>
      b.projectedPF -
      a.projectedPF
  )[0];

const projectedPlayoffTeams = [
  ...topFive,
  wildcard,
].filter(Boolean);
  
  return (
  <div>
    <div className="mb-6 flex gap-3 flex-wrap">
  <button
    onClick={() => setPicks({})}
    className="px-4 py-2 rounded bg-red-600 text-white"
  >
    Reset Scenario
  </button>


  <button
    onClick={autoPickByRecord}
    className="px-4 py-2 rounded bg-blue-600 text-white"
  >
    Auto Pick By Record
  </button>


  <button
    onClick={autoPickByPF}
    className="px-4 py-2 rounded bg-green-600 text-white"
  >
    Auto Pick By PF
  </button>


  <button
    onClick={autoPickProjectedWinner}
    className="px-4 py-2 rounded bg-purple-600 text-white"
  >
    Auto Pick Projected Winner
  </button>
</div>
      
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
                <button
  style={{
    backgroundColor:
      String(
        picks[
          `${weekData.week}-${matchup.matchupId}`
        ]
      ) === String(matchup.team1.rosterId)
        ? "green"
        : "#1f2937",
    color: "white",
  }}
  className="w-full text-left p-2 rounded"
  onClick={() =>
    selectWinner(
      weekData.week,
      matchup.matchupId,
      matchup.team1.rosterId
    )
  }
>
  {matchup.team1.team}
</button>   


<div className="text-gray-500 my-2 text-center">
  vs
</div>


<button
  style={{
    backgroundColor:
      String(
        picks[
          `${weekData.week}-${matchup.matchupId}`
        ]
      ) === String(matchup.team2.rosterId)
        ? "green"
        : "#1f2937",
    color: "white",
  }}
  className="w-full text-left p-2 rounded"
  onClick={() =>
    selectWinner(
      weekData.week,
      matchup.matchupId,
      matchup.team2.rosterId
    )
  }
>
  {matchup.team2.team}
</button>
              </div>
            )
          )}
        </div>
      ))}
<div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Projected Standings
        </h2>


        <div className="space-y-2">
          {projectedStandings.map(
            (team, index) => (
              <div
                key={team.rosterId}
                className="border border-gray-700 rounded p-2"
              >
               {index + 1}. {team.team}
({" "}
{team.projectedWins}-
{team.projectedLosses}
{" • PF "}
{team.projectedPF.toFixed(1)}
)
              </div>
            )
          )}
        </div>
      </div>
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Projected Playoff Teams
  </h2>


  {projectedPlayoffTeams.map(
    (team, index) => (
      <div
        key={team.rosterId}
        className="border border-gray-700 rounded p-3 mb-2"
      >
        {index < 5
          ? `#${index + 1}`
          : "⭐ Wildcard"}{" "}
        {team.team}
        {" "}
        ({team.projectedWins}-
        {team.projectedLosses})
      </div>
    )
  )}
</div>    
    </div>
  );
}
