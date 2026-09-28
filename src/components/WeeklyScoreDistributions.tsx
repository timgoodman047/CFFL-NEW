import { getLeagueTeams } from "../lib/sleeper";
import { teamProfiles } from "../data/teamProfiles";
 
export default async function WeeklyScoreDistributions() {
const teams = await getLeagueTeams();
 
const projections = teams
.map((team) => {
const profile =
teamProfiles[
team.owner as keyof typeof teamProfiles
] || {
consistency: 75,
ceiling: 40,
};
 
const expected = team.avgPPG;
 
const floor =
expected -
(100 - profile.consistency);
 
const ceiling =
expected + profile.ceiling;
 
return {
team: team.team,
expected: expected.toFixed(1),
floor: floor.toFixed(1),
ceiling: ceiling.toFixed(1),
};
})
.sort(
(a, b) =>
Number(b.expected) -
Number(a.expected)
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
}}
>
📈 Weekly Score Distributions
</h2>
 
{projections.map((team) => (
<div
key={team.team}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>{team.team}</strong>
 
<br />
 
Expected: {team.expected}
 
<br />
 
Floor: {team.floor}
 
<br />
 
Ceiling: {team.ceiling}
</div>
))}
</div>
);
}
