import Link from "next/link";
import { getAllRatings } from "@/lib/teamRatings";
 
export default function PowerRankings() {
const rankings =
getAllRatings();
 
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
marginBottom: "16px",
}}
>
📈 Franchise Power Ratings
</h2>
 
{rankings.map(
(team, index) => (
<div
key={team.owner}
style={{
display: "flex",
justifyContent:
"space-between",
padding: "10px 0",
borderBottom:
"1px solid #1f2937",
}}
>
{`/franchise/${team.owner.toLowerCase()}`}
#{index + 1}{" "}
{team.owner}
</Link>
 
<strong
style={{
color: "#22c55e",
}}
>
{team.rating}
</strong>
</div>
)
)}
</div>
);
}
