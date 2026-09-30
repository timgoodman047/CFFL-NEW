import { teamSlugMap } from "../data/teamSlugMap";
 
export function getTeamSlug(
teamName: string
): string {
return (
teamSlugMap[teamName] ||
""
);
}
