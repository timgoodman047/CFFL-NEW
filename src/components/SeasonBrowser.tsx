"use client";
 
import { useState } from "react";
import { history } from "../data/history";
 
export default function SeasonBrowser() {
 
const [year, setYear] =
useState(history[0].year);
 
const season =
history.find(
s => s.year === year
);
 
if (!season) {
return null;
}
 
return (
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
 
<h2
style={{
color:"#22c55e"
}}
>
📚 Season Browser
</h2>
 
<select
value={year}
onChange={(e)=>
setYear(
Number(
e.target.value
)
)
}
style={{
width:"100%",
padding:"10px",
borderRadius:"8px",
marginBottom:"15px"
}}
>
 
{history.map(
season => (
 
<option
key={season.year}
value={season.year}
>
{season.year}
</option>
 
)
)}
 
</select>
 
<div
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
🏆 Champion
</strong>
 
<br />
 
{season.champion}
 
</div>
 
<div
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
🏈 Team
</strong>
 
<br />
 
{season.team}
 
</div>
 
<div
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
🔥 Highest Score
</strong>
 
<br />
 
{season.highestScore}
 
</div>
 
<div
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px"
}}
>
 
<strong>
📝 Season Notes
</strong>
 
<br />
 
{season.notes}
 
</div>
 
</div>
 
);
 
}
