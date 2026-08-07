export default function ChallengeDayPage({ params }) {
  return (
    <main className="px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-[#ffb454]">
        Route /day/{params.day}
      </p>
      <h1 className="mt-3 font-display text-3xl font-extrabold">
        Challenge day
      </h1>
      <p className="mt-3 text-sm text-[#8e97ab]">
        Scaffold placeholder. Built in commit 6.
      </p>
    </main>
  );
}
