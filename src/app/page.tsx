import Hero from "../components/Hero";
import Standings from "../components/Standings";
import PowerRankings from "../components/PowerRankings";
import DressTracker from "../components/DressTracker";
import Matchups from "../components/Matchups";
import Owners from "../components/Owners";
import News from "../components/News";
 
export default function Home() {
return (
<main
style={{
maxWidth: "1600px",
margin: "0 auto",
padding: "24px",
}}
>
<h1
style={{
color: "#22c55e",
fontSize: "48px",
}}
>
Fantasy Football Network
</h1>
 
<Hero />
 
<div
style={{
display: "grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(500px,1fr))",
gap: "20px",
}}
>
<Standings />
<Matchups />
 
<PowerRankings />
<DressTracker />
 
<Owners />
<News />
</div>
</main>
);
}
