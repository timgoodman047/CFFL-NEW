import { franchises } from "../../../data/franchises";
 
export default async function FranchisePage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
 
const resolvedParams =
await params;
 
const franchise =
franchises.find(
(f) =>
f.slug ===
resolvedParams.slug
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
 
<p>
Slug:
{" "}
{resolvedParams.slug}
</p>
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
}}
>
Franchise Profile
</p>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "20px",
}}
>
Record:
{" "}
{franchise.overallRecord}
 
<br />
 
Championships:
{" "}
{franchise.championships}
 
<br />
 
Playoff Trips:
{" "}
{franchise.playoffTrips}
 
<br />
 
Win %:
{" "}
{(franchise.winningPct * 100).toFixed(1)}%
</div>
</main>
);
}
