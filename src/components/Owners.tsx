import {
getUsers,
} from "../lib/sleeper";

import { franchises } from "../data/franchises";
 
export default async function Owners() {
 
const users = await getUsers();
 
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
👤 Owners
</h2>
 
{users.map((user:any) => {
const slugMap: Record<string, string> = {
"Red Kingdom": "tim",
"WHO DEY": "brian",
"Orangeman": "nick",
"Fuck You FantasyFootball": "matt",
"The Locked Room": "danny",
"Taka Taka Tires": "tom",
"Bills Mafia": "jason",
"Scheduled dress year": "spencer",
"Short Board Champ": "chris",
"Dirty Mike": "jeff",
};
 
const slug =
slugMap[user?.metadata?.team_name];
 
return (
 
<div
key={user.user_id}
style={{
background:"#1b2a40",
padding:"10px",
borderRadius:"8px",
marginBottom:"8px",
cursor:"pointer"
}}
>
 
{user.display_name}
 
<br />
 
<strong>
{user?.metadata?.team_name}
</strong>
 
<br />
 
Slug: {slug}
 
</div>
);
})}
 
</div>
 
);
}
``
