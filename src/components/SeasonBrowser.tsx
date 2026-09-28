"use client";
 
import { useState } from "react";
import { history } from "../data/history";
 
export default function SeasonBrowser() {
const [selectedYear, setSelectedYear] =
useState(history[0].year);
 
const season =
history.find(
(s) => s.year === selectedYear
);
 
if (!season) {
return null;
}
 
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
📚 Historical Season Browser
</h2>
 
<select
value={selectedYear}
onChange={(e) =>
setSelectedYear(
Number(e.target.value)
)
}
style={{
width: "100%",
padding: "10px",
borderRadius: "8px",
marginBottom: "15px",
background: "#1b2a40",
color: "white",
border: "none",
}}
>
{history.map((season) => (
<option
key={season.year}
value={season.year}
>
{season.year}
</option>
))}
</select>
 
<Section title="🏆 Champion">
{season.champion}
</Section>
 
<Section title="🏈 Team Name">
{season.team}
</Section>
 
<Section title="🥈 Runner-Up">
{season.runnerUp}
</Section>
 
<Section title="🔥 Highest Weekly Score">
{season.highestScore}
</Section>
 
<Section title="🏅 MVP">
{season.mvp}
</Section>
 
<Section title="🎯 Most Points For">
{season.pointsLeader}
</Section>
 
<Section title="💀 Sacko">
{season.sacko}
</Section>
 
<Section title="🏆 Championship Game">
{season.championship}
</Section>
 
<Section title="🥉 Third Place Game">
{season.thirdPlaceGame}
</Section>
 
<Section title="🏈 Semifinal Results">
{season.semifinals.map((game) => (
<div key={game}>{game}</div>
))}
</Section>
 
<Section title="🏅 Season Awards">
{season.awards.map((award) => (
<div key={award}>{award}</div>
))}
</Section>
 
<Section title="📊 Final Standings">
{season.standings.map((team) => (
<div key={team}>{team}</div>
))}
</Section>
 
<Section title="📈 Season Records">
{season.records.map((record) => (
<div key={record}>{record}</div>
))}
</Section>
 
<Section title="📖 Historical Summary">
{season.notes}
</Section>
</div>
);
}
 
function Section({
title,
children,
}: {
title: string;
children: React.ReactNode;
}) {
return (
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>{title}</strong>
 
<br />
<br />
 
{children}
</div>
);
}
