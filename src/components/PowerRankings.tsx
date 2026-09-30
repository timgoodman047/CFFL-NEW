import { getLeagueTeams } from "../lib/sleeper";
 
export default async function PowerRankings() {
const teams =
await getLeagueTeams();
 
const rankings = teams
.map((team: any) => {
const gamesPlayed =
Math.max(
team.wins +
team.losses,
1
);
 
const winPct =
team.wins /
gamesPlayed;
 
const powerScore =
winPct * 100 +
team.avgPPG * 0.5;
 
return {
team: team.team,
powerScore:
Number(
powerScore.toFixed(
1
)
),
};
})
.sort(
(a, b) =>
b.powerScore -
a.powerScore
);
 
return (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2
style={{
color: "#22c55e",
marginBottom: "16px",
}}
>
📈 Power Rankings 2.0
</h2>
 
{rankings.map(
(team, index) => (
<div
key={team.team}
style={{
display: "flex",
justifyContent:
"space-between",
padding: "10px 0",
borderBottom:
"1px solid #1f2937",
}}
>
<span>
#{index + 1}{" "}
{team.team}
</span>
 
<strong
style={{
color:
"#22c55e",
}}
>
{
team.powerScore
}
</strong>
</div>
)
)}
</div>
);
}
