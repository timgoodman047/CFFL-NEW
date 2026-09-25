import { franchises } from "../../../data/franchises";
 
export default function FranchisePage() {
const franchise = franchises[0];
 
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
Championships: {franchise.championships}
 
<br />
 
Playoff Trips: {franchise.playoffTrips}
 
<br />
 
Record: {franchise.overallRecord}
</div>
</main>
);
}
