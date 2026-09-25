import { franchises } from "../data/franchises";
 
export default function FranchiseProfiles() {
return (
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
}}
>
<h2
style={{
color: "#22c55e",
}}
>
👤 Franchise Profiles
</h2>
 
{franchises.map((franchise) => (
<div
key={franchise.slug}
style={{
background: "#1b2a40",
padding: "12px",
borderRadius: "8px",
marginBottom: "10px",
}}
>
<strong>{franchise.owner}</strong>
 
<br />
 
Record: {franchise.overallRecord}
 
<br />
 
Championships: {franchise.championships}
 
<br />
 
Playoff Trips: {franchise.playoffTrips}
</div>
))}
</div>
);
}
