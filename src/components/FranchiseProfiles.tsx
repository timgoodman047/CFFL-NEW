import Link from "next/link";

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

<Link
href={`/franchise/${franchise.slug}`}
key={franchise.slug}
style={{
textDecoration: "none",
color: "inherit",
displayginBottom: "10px",
}}
>
<strong>{franchise.owner}</strong>
 
<br />
 
Record: {franchise.overallRecord}
 
<br />
 
Championships: {franchise.championships}
 
<br />
 
Playoff Trips: {franchise.playoffTrips}
 
<br />
 
URL:
{" "}
/franchise/{franchise.slug}
{franchises.map((franchise) => (
<Link
href={`/franchise/${franchise.slug}`}
key={franchise</Link>
))}
</div>
);
}
