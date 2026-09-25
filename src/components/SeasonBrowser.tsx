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
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>🏆 Champion</strong>
 
<br />
 
{season.champion}
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>🏈 Team Name</strong>
 
<br />
 
{season.team}
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>🔥 Highest Score</strong>
 
<br />
 
{season.highestScore ?? "N/A"}
</div>
 
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
}}
>
<strong>📝 Notes</strong>
 
<br />
 
{season.notes ?? "No notes available."}
</div>
</div>
);
}
