import { getRemainingSchedule } from "../../lib/sleeper";

export default async function PlayoffMachinePage() {
  const schedule = await getRemainingSchedule();

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        Playoff Machine
      </h1>

      <pre>
        {JSON.stringify(schedule, null, 2)}
      </pre>
    </div>
  );
}
