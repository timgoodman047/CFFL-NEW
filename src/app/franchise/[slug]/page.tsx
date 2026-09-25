import { franchises } from "../../../data/franchises";
 
export default async function FranchisePage({
params,
}: {
params: Promise<{
slug: string;
}>;
}) {
const { slug } = await params;
 
const franchise = franchises.find(
(f) => f.slug === slug
);
 
if (!franchise) {
return (
<main
style={{
maxWidth: "1200px",
margin: "0 auto",
padding: "24px",
}}
>
<h1>Franchise Not Found</h1>
</main>
);
}
 
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
 
{/* Overview */}
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "20px",
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
value={`${(
franchise.winningPct * 100
).toFixed(1)}%`}
/>
 
<StatCard
title="📋 Record"
value={franchise.overallRecord}
/>
</div>
 
{/* Records */}
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "24px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
📊 Franchise Records
</h2>
 
<div style={recordCard}>
Highest Score:
{" "}
{franchise.highestScore}
</div>
 
<div style={recordCard}>
Highest Playoff Score:
{" "}
{franchise.highestPlayoffScore}
</div>
</div>
 
{/* Notes */}
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "24px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
📝 Franchise Notes
</h2>
 
<p>{franchise.notes}</p>
</div>
</main>
);
}
 
function StatCard({
title,
value,
}: {
title: string;
value: string | number;
}) {
return (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#94a3b8",
}}
>
{title}
</div>
 
<div
style={{
color: "#22c55e",
fontSize: "32px",
fontWeight: "bold",
marginTop: "10px",
}}
>
{value}
</div>
</div>
);
}
 
const recordCard = {
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
};
