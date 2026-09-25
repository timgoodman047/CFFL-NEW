JSX
export default async function FranchisePage({
params,
}: {
params: Promise<{ slug: string }>;
}) {
 
const { slug } = await params;
 
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
Franchise: {slug}
</h1>
 
<div
style={{
background: "#111c2d",
padding: "20px",
borderRadius: "12px",
marginTop: "20px",
}}
>
Franchise page is working.
</div>
</main>
);
}
