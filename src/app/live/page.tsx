"use client";
 
import { useEffect, useState } from "react";

import {
  getCurrentWeek,
  getMatchups,
  getLeagueTeams,
  getPlayers,
} from "../../lib/sleeper";
 
export default function LivePage() {
  const [expandedMatchup, setExpandedMatchup] =
    useState<number | null>(null);

  const [currentWeek, setCurrentWeek] = useState(0);
  const [teams, setTeams] = useState<any[]>([]);
  const [matchups, setMatchups] = useState<any[]>([]);
  const [players, setPlayers] = useState<any>({});

  useEffect(() => {
    async function loadData() {
      const week = await getCurrentWeek();
      const leagueTeams = await getLeagueTeams();
      const leagueMatchups = await getMatchups(week);
      const playerData = await getPlayers();

      setCurrentWeek(week);
      setTeams(leagueTeams);
      setMatchups(leagueMatchups);
      setPlayers(playerData);
    }

    loadData();
  }, []);

  console.log("LivePage rendered");
  console.log("expandedMatchup =", expandedMatchup);

  const rosterMap = new Map<number, any>(
    teams.map((team) => [
      team.rosterId,
      team,
    ])
  );
 
const matchupGroups =
new Map<number, any[]>();
 
for (const matchup of matchups) {
if (
!matchupGroups.has(
matchup.matchup_id
)
) {
matchupGroups.set(
matchup.matchup_id,
[]
);
}
 
matchupGroups
.get(matchup.matchup_id)!
.push(matchup);
}
 
const games = Array.from(
matchupGroups.values()
);

const gameSummaries = games
.filter(
(game) => game.length === 2
)
.map((game) => {
const teamA =
rosterMap.get(
game[0].roster_id
) as any;
 
const teamB =
rosterMap.get(
game[1].roster_id
) as any;
 
const scoreA =
game[0].points ?? 0;
 
const scoreB =
game[1].points ?? 0;

const totalPoints =
scoreA + scoreB;
 
const winPctA =
teamA.wins /
Math.max(
teamA.wins +
teamA.losses,
1
);
 
const winPctB =
teamB.wins /
Math.max(
teamB.wins +
teamB.losses,
1
);
 
const strengthA =
winPctA * 100 +
teamA.avgPPG * 0.4;
 
const strengthB =
winPctB * 100 +
teamB.avgPPG * 0.4;
 
const strengthDiff =
strengthA - strengthB;
 
const scoreDiff =
scoreA - scoreB;
 
const probabilityA =
Math.max(
5,
Math.min(
95,
50 + 
scoreDiff * 1.5 +
strengthDiff * 0.4
)
);
 
const probabilityB =
100 - probabilityA;

const projectedA = teamA.avgPPG;
const projectedB = teamB.avgPPG;
 
return {
teamA,
teamB,
scoreA,
scoreB,
projectedA,
projectedB,
margin: Math.abs(
projectedA - projectedB
),
winner:
projectedA >= projectedB
? teamA
: teamB,
};
});

const highestScore =
gameSummaries.length === 0
? null
: gameSummaries.reduce((best, game) => {
const bestScore = Math.max(
best.projectedA,
best.projectedB
);
 
const currentScore = Math.max(
game.projectedA,
game.projectedB
);
 
return currentScore > bestScore
? game
: best;
});
 
const closestMatchup =
gameSummaries.length === 0
? null
: [...gameSummaries].sort(
(a, b) => a.margin - b.margin
)[0];
 
const biggestBlowout =
gameSummaries.length === 0
? null
: [...gameSummaries].sort(
(a, b) => b.margin - a.margin
)[0];
 
return (
<main
style={{
maxWidth: "1200px",
margin: "0 auto",
padding: "24px",
}}
>
<h1
style={{
color: "#22c55e",
marginBottom: "8px",
}}
>
📺 Live Game Center
</h1>

<pre style={{ color: "white" }}>
{JSON.stringify({
currentWeek,
matchupCount: matchups?.length,
teamCount: teams?.length,
gameSummaryCount: gameSummaries?.length,
}, null, 2)}
</pre>
 
<p
style={{
color: "#94a3b8",
marginBottom: "24px",
}}
>
Week {currentWeek} live matchup tracker.
</p>
  
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "16px",
marginBottom: "24px",
}}
>
<div
style={{
background: "#111c2d",
padding: "18px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#22c55e",
marginBottom: "8px",
fontWeight: "bold",
}}
>
🔥 Highest Score
</div>
 
<div>
{highestScore?.winner?.team ?? "N/A"}
</div>
 
<div
style={{
fontSize: "24px",
fontWeight: "bold",
}}
>
{highestScore
? Math.max(
highestScore?.projectedA,
highestScore?.projectedB
).toFixed(1)
: "0.0"}
</div>
</div>
 
<div
style={{
background: "#111c2d",
padding: "18px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#22c55e",
marginBottom: "8px",
fontWeight: "bold",
}}
>
⚔️ Closest Matchup
</div>
 
<div>
{
closestMatchup?.teamA
.team
}
</div>
 
<div>
vs
</div>
 
<div>
{
closestMatchup?.teamB
.team
}
</div>
 
<div
style={{
marginTop: "8px",
}}
>
Margin:{" "}
{closestMatchup?.margin.toFixed(
2
)}
</div>
</div>
 
<div
style={{
background: "#111c2d",
padding: "18px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#22c55e",
marginBottom: "8px",
fontWeight: "bold",
}}
>
💥 Biggest Blowout
</div>
 
<div>
{
biggestBlowout?.winner
.team
}
</div>
 
<div
style={{
marginTop: "8px",
}}
>
Margin:{" "}
{biggestBlowout?.margin.toFixed(
2
)}
</div>
</div>
</div>
 
{games.map((game, index) => {
if (game.length !== 2) {
return null;
}
 
const teamA =
rosterMap.get(game[0].roster_id);
 
const teamB =
rosterMap.get(game[1].roster_id);
 
if (!teamA || !teamB) {
return null;
}
 
const scoreA =
game[0].points ?? 0;
 
const scoreB =
game[1].points ?? 0;
 
const startersA =
game[0].starters ?? [];
 
const startersB =
game[1].starters ?? [];
 
const starterPointsA =
game[0].starters_points ?? [];
 
const starterPointsB =
game[1].starters_points ?? [];

const playedA =
starterPointsA.filter(
(p: number) => p > 0
).length;
 
const playedB =
starterPointsB.filter(
(p: number) => p > 0
).length;
 
const remainingA =
startersA.length - playedA;
 
const remainingB =
startersB.length - playedB;
 
const avgPlayerA =
teamA.avgPPG / Math.max(startersA.length, 1);
 
const avgPlayerB =
teamB.avgPPG / Math.max(startersB.length, 1);

const projectedA =
scoreA + remainingA * avgPlayerA;
 
const projectedB =
scoreB + remainingB * avgPlayerB;

const strengthA =
(teamA.avgPPG * 0.7) +
(teamA.wins * 10);
 
const strengthB =
(teamB.avgPPG * 0.7) +
(teamB.wins * 10);

const projectedWinner =
projectedA >= projectedB
? teamA.team
: teamB.team;

const projectedMargin =
Math.abs(projectedA - projectedB);

const gameOfWeek =
projectedMargin <= 5;
 
const blowoutWatch =
projectedMargin >= 20;

const upsetAlert =
(projectedWinner === teamA.team &&
strengthA < strengthB) ||
(projectedWinner === teamB.team &&
strengthB < strengthA);
 
const projectedDiff =
projectedA - projectedB;
 
const strengthDiff =
strengthA - strengthB;
 
const probabilityA =
Math.max(
5,
Math.min(
95,
50 +
projectedDiff * 1.2 +
strengthDiff * 0.3
)
);
 
const probabilityB =
100 - probabilityA;
 
const leader =
scoreA > scoreB
? teamA.team
: scoreB > scoreA
? teamB.team
: "Tied";

console.log("matchups", matchups);
console.log("teams", teams);
console.log("gameSummaries", gameSummaries);
 
return (
  <div
    key={index}
    onClick={() => {
      setExpandedMatchup(
        expandedMatchup === index ? null : index
      );
    }}
    style={{
      background: "#111c2d",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "16px",
      cursor: "pointer",
    }}
  >
<div
style={{
display: "flex",
justifyContent: "space-between",
fontSize: "20px",
fontWeight: "bold",
}}
>
<span>{teamA.team}</span>
  
<div style={{ color: "yellow", fontSize: "12px" }}>
</div>
<div>{scoreA.toFixed(2)}</div>
</div>
 
<div
style={{
textAlign: "center",
margin: "12px 0",
color: "#94a3b8",
}}
>
VS
</div>
 
<div
style={{
display: "flex",
justifyContent: "space-between",
fontSize: "20px",
fontWeight: "bold",
}}
>
<span>{teamB.team}</span>
<div>{scoreB.toFixed(2)}</div>
</div>
 
<div
style={{
marginTop: "16px",
color: "#22c55e",
fontWeight: "bold",
}}
>
{gameOfWeek && (
<div
style={{
color: "#f59e0b",
fontWeight: "bold",
marginBottom: "8px",
}}
>
🔥 GAME OF THE WEEK
</div>
)}
 
{blowoutWatch && (
<div
style={{
color: "#ef4444",
fontWeight: "bold",
marginBottom: "8px",
}}
>
💥 BLOWOUT WATCH
</div>
)}

Leader: {leader}
</div>
 
<div
style={{
marginTop: "12px",
padding: "12px",
background: "#1b2a40",
borderRadius: "8px",
}}
>
<div
style={{
marginBottom: "8px",
fontWeight: "bold",
}}
>
📈 Smart Win Probability
</div>
 
<div>
{teamA.team}: {probabilityA.toFixed(0)}%
</div>
 
<div>
{teamB.team}: {probabilityB.toFixed(0)}%
</div>

<div
style={{
marginTop: "8px",
color: "#94a3b8",
fontSize: "12px",
}}
>
Remaining: {remainingA} - {remainingB}
</div>
 
<div
style={{
marginTop: "8px",
color: "#22c55e",
fontSize: "14px",
fontWeight: "bold",
}}
>
Expected Final:{" "}
{projectedA.toFixed(1)}
{" - "}
{projectedB.toFixed(1)}
</div>

<div
style={{
marginTop: "4px",
color: "#94a3b8",
fontSize: "12px",
}}
>
Projected Winner: {projectedWinner}
<div
style={{
color: "#94a3b8",
fontSize: "12px",
}}
>
Projected Margin: {projectedMargin.toFixed(1)}
</div>
 
{upsetAlert && (
<div
style={{
marginTop: "6px",
color: "#f59e0b",
fontWeight: "bold",
}}
>
🚨 Upset Alert
</div>
)}
 
</div>
 
<div
style={{
marginTop: "8px",
height: "10px",
background: "#334155",
borderRadius: "999px",
overflow: "hidden",
}}
>
<div
style={{
width: `${probabilityA}%`,
height: "100%",
background: "#22c55e",
}}
/>
</div>
 
<div
style={{
marginTop: "8px",
color: "#94a3b8",
fontSize: "12px",
}}
>
Based on current score, record, and scoring strength.
</div>
 
{expandedMatchup === index && (
  <div
    style={{
      marginTop: "16px",
      padding: "12px",
      background: "#1a2940",
      borderRadius: "8px",
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "bold",
            color: "#22c55e",
            marginBottom: "8px",
          }}
        >
          {teamA.team}
        </div>

       {startersA.map((playerId, idx) => (
  <div
    key={playerId}
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 0",
      borderBottom: "1px solid #243447",
      fontSize: "14px",
    }}
  >
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }}
>
  <div>
    <span>
      {players[playerId]?.position || "?"}
    </span>
    {" "}

    <span>
      {players[playerId]?.full_name || playerId}
    </span>

    <span
      style={{
        color: "#94a3b8",
        fontSize: "12px",
        marginLeft: "6px",
      }}
    >
      {players[playerId]?.team || ""}
    </span>

    {players[playerId]?.status &&
      !["Active", "ACT"].includes(
        players[playerId]?.status
      ) && (
        <span
          style={{
            marginLeft: "8px",
            color: "#f59e0b",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {players[playerId]?.status}
        </span>
      )}
  </div>

  <div
    style={{
      fontWeight: "bold",
    }}
  >
    {(starterPointsA[idx] ?? 0).toFixed(2)}
  </div>
</div>

    <span style={{ fontWeight: "bold" }}>
      {(starterPointsA[idx] ?? 0).toFixed(2)}
    </span>
  </div>
))}
      </div>

      <div>
        <div
          style={{
            fontWeight: "bold",
            color: "#22c55e",
            marginBottom: "8px",
          }}
        >
          {teamB.team}
        </div>

       {startersB.map((playerId, idx) => (
  <div
    key={playerId}
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "6px 0",
      borderBottom: "1px solid #243447",
      fontSize: "14px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div>
        <span>
          {players[playerId]?.position || "?"}
        </span>
        {" "}

        <span>
          {players[playerId]?.full_name || playerId}
        </span>

        <span
          style={{
            color: "#94a3b8",
            fontSize: "12px",
            marginLeft: "6px",
          }}
        >
          {players[playerId]?.team || ""}
        </span>

        {players[playerId]?.status &&
          !["Active", "ACT"].includes(
            players[playerId]?.status
          ) && (
            <span
              style={{
                marginLeft: "8px",
                color: "#f59e0b",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {players[playerId]?.status}
            </span>
          )}
      </div>

      <div
        style={{
          fontWeight: "bold",
        }}
      >
        {(starterPointsB[idx] ?? 0).toFixed(2)}
      </div>
    </div>
  </div>
))}
      </div>
    </div>
  </div>
)}
 
</div>
</div>

);
})}

</main>
);
}
