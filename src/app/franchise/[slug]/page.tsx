import { franchises }
from "@/data/franchises";
 
export default function FranchisePage({
params
}: {
params: {
slug: string
}
}) {
 
const franchise =
franchises.find(
f =>
f.slug ===
params.slug
);
 
if(!franchise){
 
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
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
 
Championships:
{" "}
{franchise.championships}
 
<br />
 
Playoff Trips:
{" "}
{franchise.playoffTrips}
 
<br />
 
Winning %:
{" "}
{(franchise.winningPct * 100)
.toFixed(1)}%
 
<br />
 
Highest Score:
{" "}
{franchise.highestScore ?? "—"}
 
</div>
 
<div
style={{
marginTop:"20px",
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
 
{franchise.notes}
 
</div>
 
</main>
 
);
 
}
