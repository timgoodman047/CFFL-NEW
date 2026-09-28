import { history } from "../../../data/history";
 
export default async function SeasonPage({
params,
}: {
params: Promise<{ year: string }>;
}) {
const resolvedParams = await params;
 
const season = history.find(
(s) =>
s.year === Number(resolvedParams.year)
);
 
if (!season) {
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
}}
>
Season Not Found
</h1>
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
{season.year} Season Archive
</h1>
 
<p
style={{
color: "#94a3b8",
marginBottom: "24px",
}}
>
Historical Season Profile
</p>
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(250px,1fr))",
gap: "20px",
}}
>
<Card
title="🏆 Champion"
value={season.champion}
/>
 
<Card
title="🥈 Runner-Up"
value={season.runnerUp}
/>
 
<Card
title="🏅 MVP"
value={season.mvp}
/>
 
<Card
title="💀 Sacko"
value={season.sacko}
/>
</div>
 
<Section title="🏈 Team Name">
{season.team}
</Section>
 
<Section title="🏆 Championship Game">
{season.championship}
</Section>
 
<Section title="🥉 Third Place Game">
{season.thirdPlaceGame}
</Section>
 
<Section title="🏈 Semifinal Results">
{season.semifinals.map((game) => (
<div key={game}>{game}</div>
))}
</Section>
 
<Section title="🏅 Season Awards">
{season.awards.map((award) => (
<div key={award}>{award}</div>
))}
</Section>
 
<Section title="📊 Regular Season Standings">
{season.standings.map((team) => (
<div key={team}>{team}</div>
))}
</Section>
 
<Section title="📈 Season Records">
{season.records.map((record) => (
<div key={record}>{record}</div>
))}
</Section>
 
<Section title="📖 Historical Summary">
{season.notes}
</Section>
</main>
);
}
 
function Card({
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
fontSize: "28px",
fontWeight: "bold",
marginTop: "10px",
}}
>
{value}
</div>
</div>
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
marginTop: "20px",
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
``
