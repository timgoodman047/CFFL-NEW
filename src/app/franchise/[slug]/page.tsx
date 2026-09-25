export default function FranchisePage({
params,
}: {
params: { slug: string };
}) {
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
Franchise Debug
</h1>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "20px",
}}
>
Slug received:
<br />
<strong>{params.slug}</strong>
</div>
</main>
);
}
