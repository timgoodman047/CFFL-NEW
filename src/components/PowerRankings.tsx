import { getAllRatings } from "@/data/teamRatings";
 
export default function PowerRankings() {
const rankings = getAllRatings();
 
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
📈 Power Rankings
</h2>
 
{rankings.map((team, index) => (
<div
key={team.team}
style={{
display: "flex",
justifyContent: "space-between",
padding: "10px 0",
borderBottom: "1px solid #1f2937",
}}
>
<span>
#{index + 1} {team.team}
</span>
 
<strong
style={{
color: "#22c55e",
}}
>
{team.rating}
</strong>
</div>
))}
</div>
);
}
