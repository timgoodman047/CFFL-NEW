import Link from "next/link";
 
export default function NavBar() {
return (
<nav
style={{
background: "#111c2d",
padding: "16px 24px",
borderRadius: "12px",
marginBottom: "24px",
}}
>
<div
style={{
display: "flex",
gap: "24px",
flexWrap: "wrap",
alignItems: "center",
}}
>
/
🏠 Home
</Link>
 
/live
📺 Live
</Link>
 
<Link href="/team- ⚔️ Compare
</Link>
</div>
</nav>
);
}
