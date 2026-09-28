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
 
<div
style={{
background: "#22c55e",
color: "#111827",
padding: "12px",
borderRadius: "8px",
fontWeight: "bold",
textAlign: "center",
marginBottom: "15px",
}}
>
Season Archive URL:
<br />
/season/{season.year}
</div>
 
<SeasonCard
title="🏆 Champion"
value={season.champion}
/>
 
<SeasonCard
title="🏈 Team Name"
value={season.team}
/>
 
<SeasonCard
title="🥈 Runner-Up"
value={season.runnerUp}
/>
 
<SeasonCard
title="🔥 Highest Weekly Score"
value={season.highestScore}
/>
 
<SeasonCard
title="🏅 MVP"
value={season.mvp}
/>
 
<SeasonCard
title="🏆 Championship Score"
value={season.championshipScore}
/>
 
<SeasonCard
title="🎯 Most Points For"
value={season.pointsLeader}
/>
 
<SeasonCard
title="💀 Sacko"
value={season.sacko}
/>
 
<SeasonCard
title="📖 Biggest Storyline"
value={season.storyline}
/>
 
<SeasonCard
title="📝 Notes"
value={season.notes}
/>
</div>
);
}
 
function SeasonCard({
title,
value,
}: {
title: string;
value: string | number;
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
 
{value}
</div>
);
}
