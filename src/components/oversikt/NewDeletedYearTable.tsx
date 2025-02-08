/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

type YearData = Record<string, Record<string, number>>;

interface NewDeletedYearTableProps {
  data: {
    createdByYear: YearData;
    deletedByYear: YearData;
  };
  theme: string;
}

const NewDeletedYearTable: React.FC<NewDeletedYearTableProps> = ({
  data,
  theme,
}) => {
  // Check if data exists, and if not, use empty objects as fallback
  const { createdByYear = {}, deletedByYear = {} } = data || {};

  // Extract all types from both created and deleted data
  const allTypes = Array.from(
    new Set([
      ...Object.values(createdByYear).flatMap((yearData) =>
        Object.keys(yearData),
      ),
      ...Object.values(deletedByYear).flatMap((yearData) =>
        Object.keys(yearData),
      ),
    ]),
  ).sort();

  // Extract all years from both created and deleted data
  const allYears = Array.from(
    new Set([...Object.keys(createdByYear), ...Object.keys(deletedByYear)]),
  ).sort();

  // Function to render rows for a table (for both created and deleted data)
  const renderRows = (data: YearData) => {
    return allTypes
      .map((type) => {
        // Calculate total for the type across all years
        const typeTotal = allYears.reduce(
          (sum, year) => sum + (data[year]?.[type] ?? 0),
          0,
        );

        // Check if the type has any non-zero data for any year
        const hasNonZeroData = allYears.some(
          (year) => data[year]?.[type] && data[year][type] > 0,
        );

        if (!hasNonZeroData) return null; // Skip rows with all zero values

        return (
          <tr
            key={type}
            className={`border-none ${
              theme === "darkmode" ? "odd:bg-gray-700" : "odd:bg-gray-200"
            }`}
          >
            <td className="md:text-md py-3 text-[.7rem] text-neutral ">
              {type}
            </td>
            {allYears.map((year) => (
              <td
                key={year}
                className="md:text-md py-3 text-[.7rem] text-neutral "
              >
                {data[year]?.[type] ?? 0} {/* Default to 0 if no data */}
              </td>
            ))}
            <td className="md:text-md py-3 text-[.7rem] text-neutral ">
              {typeTotal} {/* Display the total for this type */}
            </td>
          </tr>
        );
      })
      .filter((row) => row !== null); // Remove null rows (types with zero values)
  };

  // Function to calculate the total for each type across all years
  const calculateTotals = (data: YearData): Record<string, number> => {
    return allTypes.reduce((totals: Record<string, number>, type: string) => {
      const total = allYears.reduce((sum: number, year: string) => {
        return sum + (data[year]?.[type] ?? 0); // Sum for each type across all years
      }, 0);
      totals[type] = total; // Store total for each type
      return totals;
    }, {});
  };

  // Calculate totals for created and deleted data
  const createdTotals = calculateTotals(createdByYear);
  const deletedTotals = calculateTotals(deletedByYear);

  return (
    <div className="pb-10">
      {/* New Blades Table */}
      <h2 className="text-neutral">Nye Sagblad</h2>
      <table className="table table-xs mb-10 w-full overflow-x-auto">
        <thead>
          <tr
            className={`md:text-md border border-b-accent border-l-base-100 border-r-base-100 border-t-accent text-[.7rem] text-white ${
              theme === "darkmode" ? "bg-primary" : "bg-neutral"
            }`}
          >
            <th className="">Type</th>
            {allYears.map((year) => (
              <th key={year} className="">
                {year}
              </th>
            ))}
            <th className="">Total</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(createdByYear)}
          <tr className="font-bold">
            <td className="text-neutral">Total</td>
            {allYears.map((year) => (
              <td key={year} className="text-neutral">
                {allTypes.reduce(
                  (sum, type) => sum + (createdByYear[year]?.[type] ?? 0),
                  0,
                )}
              </td>
            ))}
            <td className="text-neutral">
              {Object.values(createdTotals).reduce((a, b) => a + b, 0)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Deleted Blades Table */}
      <h2 className="text-neutral">Slettede Sagblad</h2>
      <table className="table table-xs w-full overflow-x-auto ">
        <thead>
          <tr
            className={`md:text-md border border-b-accent border-l-base-100 border-r-base-100 border-t-accent text-[.7rem] text-white ${
              theme === "darkmode" ? "bg-primary" : "bg-neutral"
            }`}
          >
            <th className="">Type</th>
            {allYears.map((year) => (
              <th key={year} className="">
                {year}
              </th>
            ))}
            <th className="">Total</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(deletedByYear)}
          <tr className="font-bold">
            <td className="text-neutral">Total</td>
            {allYears.map((year) => (
              <td key={year} className="text-neutral">
                {allTypes.reduce(
                  (sum, type) => sum + (deletedByYear[year]?.[type] ?? 0),
                  0,
                )}
              </td>
            ))}
            <td className="text-neutral">
              {Object.values(deletedTotals).reduce((a, b) => a + b, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewDeletedYearTable;
