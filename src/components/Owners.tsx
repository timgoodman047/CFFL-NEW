import {
getUsers,
} from "../lib/sleeper";
 
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
 
{users.map((user:any)=>(
 
<div
key={user.user_id}
style={{
background:"#1b2a40",
padding:"10px",
borderRadius:"8px",
marginBottom:"8px"
}}
>
 
{user.display_name}
 
<br />
 
<strong>
{user?.metadata
?.team_name}
</strong>
 
</div>
 
))}
 
</div>
 
);
}
``
