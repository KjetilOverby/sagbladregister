import React from "react";

type TableData = {
  TABLE_NAME: string;
  total_size_mb: string;
};

type Props = {
  tables: TableData[];
};

const MAX_STORAGE_MB = 10 * 1024; // 10GB in MB

const DatabaseUsageBar: React.FC<Props> = ({ tables }) => {
  const totalUsed = tables?.reduce(
    (sum, table) => sum + parseFloat(table.total_size_mb),
    0,
  );
  const totalRemaining = MAX_STORAGE_MB - totalUsed;
  const usagePercentage = (totalUsed / MAX_STORAGE_MB) * 100;
  const minWidth = totalUsed > 0 ? "4px" : "0"; // Minimum width for visibility

  return (
    <div className="w-full rounded-lg bg-base-100 p-4">
      <p className="mb-2 text-center text-lg text-neutral">PlanetScale </p>
      <p className="text-center text-sm text-neutral">Lagring</p>
      <div className="relative h-6 w-full overflow-hidden rounded-lg border border-accent bg-base-100">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${Math.max(usagePercentage, 0.5)}%`, minWidth }}
        ></div>
      </div>
      <p className="mt-2 text-center text-xs font-medium text-neutral">
        Brukt: <span className="text-red-600">{totalUsed?.toFixed(2)} MB</span>{" "}
        • Ledig:{" "}
        <span className="text-blue-600">{totalRemaining?.toFixed(2)} MB</span> •
        Totalt: {MAX_STORAGE_MB} MB
      </p>
    </div>
  );
};

export default DatabaseUsageBar;
