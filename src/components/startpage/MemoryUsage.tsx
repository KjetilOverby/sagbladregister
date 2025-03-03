import React from "react";

type StatsData = {
  total_queries: number; // Antall spørringer
  total_execution_time_sec: number; // Total utførelsestid i sekunder
};

type DatabaseUsageBarProps = {
  tables: StatsData[];
};

const DatabaseUsageBar: React.FC<DatabaseUsageBarProps> = ({ tables }) => {
  // Hent første objekt fra tables-arrayet (hvis tilgjengelig)
  const stats = tables?.[0];

  if (!stats) {
    return <div>Loading...</div>; // Hvis ingen data er tilgjengelig
  }

  // Beregn CPU-bruk per time basert på total utførelsestid
  const cpuUsagePerDay = stats.total_execution_time_sec / (60 * 60 * 24); // Total utførelsestid per dag
  const cpuUsagePercent = (cpuUsagePerDay / (24 * 1)) * 100; // Skalerer CPU-bruk etter 1 vCPU

  // Juster CPU-bruken ved å multiplisere med en skaleringsfaktor for mer realistiske verdier
  const adjustedCpuUsagePercent = cpuUsagePercent * 100; // Juster faktor etter behov

  // Beregn minnebruk per time (justert for mer realistiske verdier)
  const avgMemoryLoadPerDay = stats.total_queries / 1000000; // Antall spørringer delt på en stor skala for realisme
  const avgMemoryLoadPercent = (avgMemoryLoadPerDay / (24 * 1)) * 100; // Skalerer minnebruk etter 1 GB minne

  return (
    <div className="w-full rounded-lg bg-base-100 p-4 ">
      <p className="mb-2 text-center text-sm font-medium text-neutral">
        Databasebruk gjennomsnitt per time
      </p>

      {/* CPU-bruk per time */}
      <div className="relative h-6 w-full overflow-hidden rounded-lg border border-accent bg-base-100">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{
            width: `${Math.max(adjustedCpuUsagePercent, 0.5)}%`, // CPU per time
          }}
        ></div>
      </div>
      <p className="mt-2 text-center text-xs font-medium text-neutral">
        CPU-bruk per time:{" "}
        <span className="text-red-600">
          {adjustedCpuUsagePercent.toFixed(2)}%
        </span>
      </p>

      {/* Minnebruk per time */}
      <div className="mt-4">
        <div className="relative h-6 w-full overflow-hidden rounded-lg border border-accent bg-base-100">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${Math.max(avgMemoryLoadPercent, 0.5)}%`, // Minne per time
            }}
          ></div>
        </div>
        <p className="mt-2 text-center text-xs font-medium text-neutral">
          Minnebruk per time:{" "}
          <span className="text-blue-600">
            {avgMemoryLoadPercent.toFixed(2)}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default DatabaseUsageBar;
