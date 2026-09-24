export default function Hero() {
return (
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",
gap: "20px",
marginBottom: "24px",
}}
>
<HeroCard
value="$1,100"
label="Champion Prize"
/>
 
<HeroCard
value="$222"
label="League Buy-In"
/>
 
<HeroCard
value="10"
label="Teams"
/>
 
<HeroCard
value="🏆"
label="League Trophy"
/>
</div>
);
}
 
function HeroCard({
value,
label,
}: {
value: string;
label: string;
}) {
return (
<div
style={{
background: "#111c2d",
padding: "24px",
borderRadius: "12px",
}}
>
<div
style={{
color: "#22c55e",
fontSize: "30px",
fontWeight: "bold",
}}
>
{value}
</div>
 
<div
style={{
marginTop: "8px",
color: "#94a3b8",
}}
>
{label}
</div>
</div>
);
}
