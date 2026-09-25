const franchises = [
{
owner: "Tim",
championships: 5,
playoffTrips: 16,
winPct: ".577",
notes: "Original member and multiple-time champion."
},
{
owner: "Danny",
championships: 4,
playoffTrips: 15,
winPct: ".581",
notes: "Original member and former commissioner."
},
{
owner: "Tom",
championships: 3,
playoffTrips: 15,
winPct: ".515",
notes: "Multiple championship appearances."
},
{
owner: "Brian",
championships: 2,
playoffTrips: 12,
winPct: ".520",
notes: "Consistent playoff contender."
},
{
owner: "Nick",
championships: 2,
playoffTrips: 10,
winPct: ".509",
notes: "Strong recent era performance."
}
];
 
export default function FranchiseProfiles() {
 
return (
 
<div
style={{
background:"#111c2d",
padding:"20px",
borderRadius:"12px"
}}
>
 
<h2
style={{
color:"#22c55e"
}}
>
👤 Franchise Profiles
</h2>
 
{franchises.map(franchise => (
 
<div
key={franchise.owner}
style={{
background:"#1b2a40",
padding:"12px",
borderRadius:"8px",
marginBottom:"10px"
}}
>
 
<strong>
{franchise.owner}
</strong>
 
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
{franchise.winPct}
 
<br />
 
<span
style={{
color:"#94a3b8",
fontSize:"14px"
}}
>
{franchise.notes}
</span>
 
</div>
 
))}
 
</div>
 
);
 
}
