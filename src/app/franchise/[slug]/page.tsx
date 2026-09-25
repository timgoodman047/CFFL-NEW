import { franchises }
from "../../../data/franchises";
 
export default async function FranchisePage({
params,
}: {
params: Promise<{
slug: string;
}>;
}) {
 
const { slug } =
await params;
 
const franchise =
franchises.find(
f =>
f.slug === slug
);
 
if (!franchise) {
 
return (
<div>
Franchise not found.
</div>
);
 
}
 
return (
 
<main
style={{
maxWidth:"1200px",
margin:"0 auto",
padding:"24px"
}}
>
 
<h1
style={{
color:"#22c55e"
}}
>
{franchise.owner}
</h1>
 
<p>
Franchise Profile
</p>
 
<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginTop:"20px"
}}
>
 
<StatCard
title="🏆 Championships"
value={franchise.championships}
/>
 
<StatCard
title="🎯 Playoff Trips"
value={franchise.playoffTrips}
/>
 
<StatCard
title="📈 Win %"
value={
(
franchise.winningPct * 100
).toFixed(1) + "%"
}
/>
 
<StatCard
title="📋 Record"
value={franchise.record}
/>
 
</div>
 
<div
style={{
marginTop:"24px",
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
📊 Records
</h2>
 
<p>
Highest Score:
{" "}
{franchise.highestScore}
</p>
 
<p>
Highest Playoff Score:
{" "}
{franchise.highestPlayoffScore}
</p>
 
</div>
 
<div
style={{
marginTop:"24px",
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
📝 Notes
</h2>
 
<p>
{franchise.notes}
</p>
 
</div>
 
</main>
 
);
 
}
 
function StatCard({
title,
value
}: {
title: string;
value: string | number;
}) {
 
return (
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
 
<div
style={{
color:"#94a3b8"
}}
>
{title}
</div>
 
<div
style={{
color:"#22c55e",
fontSize:"32px",
fontWeight:"bold",
marginTop:"10px"
}}
>
{value}
</div>
 
</div>
 
);
 
}
