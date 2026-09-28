import { franchises } from "../../../data/franchises";
import { franchiseTimelines } from "../../../data/franchiseTimelines";
 
export default async function FranchisePage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const resolvedParams = await params;
 
const franchise = franchises.find(
(f) => f.slug === resolvedParams.slug
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
<h1
style={{
color: "#22c55e",
}}
>
Franchise Not Found
</h1>
</main>
);
}
 
const timeline =
franchiseTimelines[
franchise.slug as keyof typeof franchiseTimelines
] || [];
 
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
Franchise Hall of Fame Profile
</p>
 
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
title="📋 Career Record"
value={franchise.overallRecord}
/>
</div>
 
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
 
<RecordRow
label="Highest Weekly Score"
value={franchise.highestScore}
/>
 
<RecordRow
label="Highest Playoff Score"
value={franchise.highestPlayoffScore}
/>
</div>
 
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
👤 Franchise Summary
</h2>
 
<RecordRow
label="Years Active"
value={franchise.yearsActive}
/>
 
<RecordRow
label="Best Finish"
value={franchise.bestFinish}
/>
 
<RecordRow
label="Career Earnings"
value={franchise.moneyWon}
/>
</div>
 
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
📅 Career Timeline
</h2>
 
{timeline.length === 0 ? (
<div
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
}}
>
Timeline coming soon.
</div>
) : (
timeline.map((season) => (
<div
key={season.year}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>{season.year}</strong>
 
<br />
 
Finish: {season.finish}
</div>
))
)}
</div>
 
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
🏅 Trophy Case
</h2>
 
<RecordRow
label="Championships Won"
value={franchise.championships}
/>
 
<RecordRow
label="Playoff Appearances"
value={franchise.playoffTrips}
/>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "24px",
marginBottom: "40px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
📝 Notes
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
 
function RecordRow({
label,
value,
}: {
label: string;
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
<strong>{label}:</strong> {value}
</div>
);
}
