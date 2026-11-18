export default function MuseumPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          CFFL Museum
        </h1>

        <p className="text-gray-500 mb-8">
          Preserving the history of the Cosines Fantasy Football League
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">

          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">League Founded</h3>
            <p className="text-3xl font-bold">2006</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Seasons</h3>
            <p className="text-3xl font-bold">20</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Championships</h3>
            <p className="text-3xl font-bold">20</p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Current Champion</h3>
            <p className="text-3xl font-bold">TBD</p>
          </div>

        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            League Champions
          </h2>

          <div className="border rounded-lg p-6">
            Champion history will go here.
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            League Records
          </h2>

          <div className="border rounded-lg p-6">
            League records will go here.
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Hall of Fame
          </h2>

          <div className="border rounded-lg p-6">
            Hall of Fame members will go here.
          </div>
        </section>

      </div>
    </main>
  );
}
