import { franchises } from "../../../data/franchises";
 
export default async function FranchisePage({
params,
}: {
params: Promise<{
slug: string;
}>;
}) {
 
const { slug } = await params;
 
const franchise =
franchises.find(
f => f.slug === slug
);
 
if (!franchise) {
 
return (
<main
style={{
padding: "24px"
}}
>
Franchise Not Found
</main>
);
 
}
 
return (
 
<main
style={{
maxWidth: "1400px",
margin: "0 auto",
padding: "24px",
}}
>
 
<h1
style={{
color: "#22c55e",
fontSize: "48px",
marginBottom: "10px",
}}
>
{franchise.owner}
</h1>
 
<p
style={{
color: "#94a3b8",
marginBottom: "24px",
}}
>
Franchise Profile
</p>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "20px",
}}
>
 
<Stat
title="🏆 Championships"
value={franchise.championships}
/>
 
<Stat
title="🎯 Playoff Trips"
value={franchise.playoffTrips}
/>
 
<Stat
title="📈 Win %"
value={
`${(
franchise.winningPct * 100
).toFixed(1)}%`
}
/>
 
<Stat
title="📋 Record"
value={franchise.overallRecord}
/>
 
</div>
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px",
marginTop:"24px",
}}
>
 
<h2
style={{
color:"#22c55e",
}}
>
📊 Career Records
</h2>
 
<p>
Highest Weekly Score:
{" "}
{franchise.highestScore}
</p>
 
<p>
Highest Playoff Score:
{" "}
{franchise.highestPlayoffScore}
</p>
 
<p>
Years Active:
{" "}
{franchise.yearsActive}
</p>
 
<p>
Best Finish:
{" "}
{franchise.bestFinish}
</p>
 
<p>
Money Won:
{" "}
{franchise.moneyWon}
</p>
 
</div>
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px",
marginTop:"24px",
}}
>
 
<h2
style={{
color:"#22c55e",
}}
>
📝 Franchise Notes
</h2>
 
<p>
{franchise.notes}
</p>
 
</div>
 
</main>
 
);
 
}
 
function Stat({
title,
value
}:{
title:string;
value:string|number;
}){
 
return(
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px",
}}
>
 
<div
style={{
color:"#94a3b8",
}}
>
{title}
</div>
 
<div
style={{
color:"#22c55e",
fontSize:"32px",
fontWeight:"bold",
marginTop:"10px",
}}
>
{value}
</div>
 
</div>
 
);
 
}
