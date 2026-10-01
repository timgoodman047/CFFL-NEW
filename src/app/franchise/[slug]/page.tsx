import { franchises } from "../../../data/franchises";
import { franchiseTimelines } from "../../../data/franchiseTimelines";
import { 
getUsers,
getRosters,
} from "../../../lib/sleeper";
 
export default async function FranchisePage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const resolvedParams = await params;
 
const franchise = franchises.find(
(f) => f.slug === resolvedParams.slug
);

const users = await getUsers();
const rosters = await getRosters();
 
if (!franchise) {
const owner = users.find(
(u: any) =>
u.metadata?.team_name ===
franchise.sleeperTeam
);
 
const roster = rosters.find(
(r: any) =>
r.owner_id ===
owner?.user_id
);
 
const currentWins =
roster?.settings?.wins || 0;
 
const currentLosses =
roster?.settings?.losses || 0;
 
const [
historicalWins,
historicalLosses,
historicalTies,
] = franchise.overallRecord
.split("-")
.map(Number);
 
const totalWins =
historicalWins + currentWins;
 
const totalLosses =
historicalLosses + currentLosses;
 
const totalTies =
historicalTies;
 
const totalGames =
totalWins +
totalLosses +
totalTies;
 
const updatedWinningPct =
totalGames > 0
? totalWins / totalGames
: 0;
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
updatedWinningPct * 100
).toFixed(1)}%`}
/>
 
<StatCard
title="📋 Career Record"
value={`${totalWins}-${totalLosses}-${totalTies}`}
/>
</div>
 
<Section title="📊 Franchise Records">
<RecordRow
label="Highest Weekly Score"
value={franchise.highestScore}
/>
 
<RecordRow
label="Highest Playoff Score"
value={franchise.highestPlayoffScore}
/>
</Section>
 
<Section title="👤 Franchise Summary">
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
</Section>
 
<Section title="📅 Career Timeline">
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
timeline.map((season) => {
let background = "#1b2a40";
 
if (
season.finish
.toLowerCase()
.includes("champion")
) {
background = "#854d0e";
}
 
if (
season.finish
.toLowerCase()
.includes("runner")
) {
background = "#6b7280";
}
 
return (
<div
key={season.year}
style={{
background,
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
color: "white",
}}
>
<strong>{season.year}</strong>
 
<br />
 
Finish: {season.finish}
 
<br />
 
Season Archive:
{" "}
/season/{season.year}
</div>
);
})
)}
</Section>
 
<Section title="🏅 Trophy Case">
<RecordRow
label="Championships Won"
value={franchise.championships}
/>
 
<RecordRow
label="Playoff Appearances"
value={franchise.playoffTrips}
/>
 
<RecordRow
label="Career Winning Percentage"
value={`${(
franchise.winningPct * 100
).toFixed(1)}%`}
/>
</Section>
 
<Section title="🔥 Best Season">
<RecordRow
label="Career Peak"
value={franchise.bestFinish}
/>
 
<RecordRow
label="Highest Weekly Score"
value={franchise.highestScore}
/>
</Section>
 
<Section title="💀 Toughest Season">
<RecordRow
label="Still Chasing Improvement"
value="Part of every championship journey."
/>
</Section>
 
<Section title="🎖 Hall of Fame Accolades">
<RecordRow
label="Championship Count"
value={franchise.championships}
/>
 
<RecordRow
label="Playoff Trips"
value={franchise.playoffTrips}
/>
 
<RecordRow
label="Career Earnings"
value={franchise.moneyWon}
/>
</Section>
 
<Section title="📝 Notes">
<p>{franchise.notes}</p>
</Section>
</main>
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
{title}
</h2>
 
{children}
</div>
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
