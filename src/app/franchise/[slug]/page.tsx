import { franchises } from "@/data/franchises";
 
export default async function FranchisePage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
const { slug } = await params;
 
const franchise = franchises.find(
(f) => f.slug === slug
);
 
if (!franchise) {
return (
<main style={{ padding: "24px" }}>
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
}}
>
{franchise.owner}
</h1>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "20px",
}}
>
<p>
Championships: {franchise.championships}
</p>
 
<p>
Playoff Trips: {franchise.playoffTrips}
</p>
 
<p>
Win %: {franchise.winningPct}
</p>
 
<p>
Highest Score: {franchise.highestScore ?? "—"}
</p>
</div>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "20px",
}}
>
{franchise.notes}
</div>
</main>
);
}
``
