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
 
{/* Career Overview */}
 
<div
style={{
* display: "grid",
*gridTemplateColumns:
"*epeat(auto-fit,minmax(250px,1fr))*,
gap: "20px",
}*
>
<StatCard
* title="🏆 Championships"
* value={franchise.championships}
* />
 
<StatCard
* title="🎯 Playoff Trips"
* value={franchise.playoffTrips}* />
 
<Stat*ard
* title="📈 Win %"
* value={`${(
franchise*winningPct * 100
).toFix*d(1)}%`}
/>
 
<Stat*ard
title="📋 Career Rec*rd"
value={franchise.overallRecord}
/>
</div>
 
{/* Records */}
 
<div
style={{
* background: "#111c2d",
* padding: "20px",
bo*derRadius: "12px",
margi*Top: "24px",
}}
>
* <h2
style={{
* color: "#22c55e",
*}}
>
* 📊 Franchise Records
* </*2>
 
<RecordRow
l*bel="Highest Weekly Score"
* value={franchise.highestScore}
* />
 
<RecordRow
* label="Highest Playoff Score"
* value={franchise.highestP*ayoffScore}
/>
</div>
 
{/* Franchise Summary */}
 
<div
style={{
* background: "#111c2d",
* padding: "20px",
bo*derRadius: "12px",
margi*Top: "24px",
}}
>
* <h2
style={{
* color: "#22c55e",
}*
>
👤 Franchise *ummary
</h2>
 
<Rec*rdRow
label="Years Activ*"
value*{franchise.yearsActive}
/>*
<Record*ow
label="Best Finish"
* value={franchise.bestFinis*}
/>
 
<RecordRow
* label="Career Earnings"
* value={franchise.moneyWon}
/>
</div>
 
{/* Timeline */}
 
<div
s*yle={{
background: "#111*2d",
padding: "20px",
* borderRadius: "12px",
* marginTop: "24px",
}}
* >
<h2
style*{{
color: "#22c55e",
* }}
>
* 📅 Career Timeline
* </*2>
 
{timeline.length === 0*? (
<div
sty*e={{
background: "#1*2a40",
padding: "12p*",
borderRadius: "8p*",
}}
>
* Timeline coming soon.
* </div>
) : (
*timeline.map((season) => (
* <div
key={season*year}
style={{
* background: "#1b2a40",
* padding: "12px",
* borderRadius: "8px",
* marginBottom: "10px"*
}}
>
* <strong>{season.year}</*trong>
 
<br />
 
Finish: {season.finish}
</div>
))
)}
</div>
 
{/* Trophy Case */}
 
<div
style={{
* background: "#111c2d",
* padding: "20px",
bo*derRadius: "12px",
margi*Top: "24px",
}}
>
* <h2
style={{
* color: "#22c55e",
}*
>
🏅 Trophy Cas*
</h2>
 
<div
* style={{
backgroun*: "#1b2a40",
padding* "12px",
border*adius: "8px",
* marginBottom: "10px",
* }}
>
* *Championships Won: {franchise.cham*ionships}
</div>
 
*div
style={{
*background: "#1b2a40",
*padding: "12px",
borde*Radius: "8px",
}}
* >
Play*ff Appearances: {franchise.playoff*rips}
</*iv>
</div>
 
{/* Notes */}
 
<div
style={{
* background: "#111c2d",
* padding: "20px",
bo*derRadius: "12px",
margi*Top: "24px",
marginBotto*: "40px",
}}
>
* <h2
style={{
* color: "#22c55e",
}}
* >
📝 Notes
*</h2>
 
<p>{franchise.notes*</p>
</div>
</main>
);*}
 
function StatCard({
title,
*alue,
}: {
title: string;
valu*: string | number;
}) {
return (* <div
style={{
ba*kground: "#111c2d",
paddin*: "20px",
borderRadius: "1*px",
}}
>
<div
* style={{
color: "#94*3b8",
}}
>
{*itle}
</div>
 
<div
* style={{
color: "#22*55e",
fontSize: "32px",
* fontWeight: "bold",
* marginTop: "10px",
}}
* >
{value}
</div*
</div>
);
}
 
function Recor*Row({
label,
value,
}: {
lab*l: string;
value: string | numbe*;
}) {
return (
<div
s*yle={{
background: "#1b2a4*",
padding: "12px",
* borderRadius: "8px",
marg*nBottom: "10px",
}}
>
* <strong>{label}:</strong>{" "}
* {value}
</div>
);
}
```*
