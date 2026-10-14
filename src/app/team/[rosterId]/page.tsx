interface TeamPageProps {
  params: {
    rosterId: string;
  };
}

export default function TeamPage({ params }: TeamPageProps) {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">
        Team {params.rosterId}
      </h1>

      <div className="mt-4">
        Team details coming soon...
      </div>
    </main>
  );
}
