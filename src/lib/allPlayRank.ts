export function getAllPlayRanks(
  totals: Map<number, number>
) {
  const sorted = Array.from(
    totals.entries()
  )
    .sort(
      (a, b) => b[1] - a[1]
    );

  const ranks =
    new Map<number, number>();

  sorted.forEach(
    ([rosterId], index) => {
      ranks.set(
        rosterId,
        index + 1
      );
    }
  );

  return ranks;
}
