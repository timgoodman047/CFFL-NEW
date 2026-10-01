"use client";

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
TimGoodman: "tim",
Danny: "danny",
Brian: "brian",
Nick: "nick",
Chris: "chris",
Jason: "jason",
Jeff: "jeff",
Matt: "matt",
Tom: "tom",
Spencer: "spencer",
};
 
const slug =
slugMap[user.display_name];
 
return (
 
<div
key={user.user_id}
onClick={() => {
if (slug) {
window.location.href =
`/team/${slug}`;
}
}}
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
{user?.metadata
?.team_name}
</strong>
 
</div>
 
);
})}
 
</div>
 
);
}
``
