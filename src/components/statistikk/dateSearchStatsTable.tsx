"use client";

import * as React from "react";

type NewDeletedRes =
  | {
      from: string | Date;
      to: string | Date;
      newCount: number;
      deletedCount: number;
      newByBladeType: Record<string, number>; // NY
      deletedByBladeType: Record<string, number>; // NY
    }
  | undefined;

type ServiceRes =
  | {
      from: string | Date;
      to: string | Date;
      total: number;
      reparasjon: number;
      omlodding: number;
      reklamasjon: number;
      bladeTypesOmlodding: Record<string, number>;
      bladeTypesReparasjon: Record<string, number>;
      bladeTypesReklamasjon: Record<string, number>;
    }
  | undefined;

function fmtDate(d?: string | Date) {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("nb-NO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function DateSearchCustomerTables({
  dateSearchNewDeletedCustomer,
  dateSearchServiceCustomer,
  isLoadingNewDeleted,
  isLoadingService,
  theme,
}: {
  dateSearchNewDeletedCustomer: NewDeletedRes;
  dateSearchServiceCustomer: ServiceRes;
  isLoadingNewDeleted?: boolean;
  isLoadingService?: boolean;
  theme: string; // Added theme property
}) {
  const periodFrom =
    dateSearchNewDeletedCustomer?.from ?? dateSearchServiceCustomer?.from;
  const periodTo =
    dateSearchNewDeletedCustomer?.to ?? dateSearchServiceCustomer?.to;

  const anyLoading = isLoadingNewDeleted || isLoadingService;

  const totalRow = {
    label: "Totalt",
    nye: dateSearchNewDeletedCustomer?.newCount ?? 0,
    slettede: dateSearchNewDeletedCustomer?.deletedCount ?? 0,
    omlodding: dateSearchServiceCustomer?.omlodding ?? 0,
    reparasjon: dateSearchServiceCustomer?.reparasjon ?? 0,
    reklamasjon: dateSearchServiceCustomer?.reklamasjon ?? 0,
  };

  // Lag komplett nøkkel-sett fra ALLE buckets (nye/slettede + service-fordelinger)
  const bladeKeys = React.useMemo(() => {
    const kO = Object.keys(
      dateSearchServiceCustomer?.bladeTypesOmlodding ?? {},
    );
    const kR = Object.keys(
      dateSearchServiceCustomer?.bladeTypesReparasjon ?? {},
    );
    const kK = Object.keys(
      dateSearchServiceCustomer?.bladeTypesReklamasjon ?? {},
    );
    const kN = Object.keys(dateSearchNewDeletedCustomer?.newByBladeType ?? {});
    const kS = Object.keys(
      dateSearchNewDeletedCustomer?.deletedByBladeType ?? {},
    );
    return Array.from(new Set([...kO, ...kR, ...kK, ...kN, ...kS]));
  }, [dateSearchServiceCustomer, dateSearchNewDeletedCustomer]);

  // Bygg rader per bladtype/side
  const bladeRows = React.useMemo(() => {
    const o = dateSearchServiceCustomer?.bladeTypesOmlodding ?? {};
    const r = dateSearchServiceCustomer?.bladeTypesReparasjon ?? {};
    const k = dateSearchServiceCustomer?.bladeTypesReklamasjon ?? {};
    const n = dateSearchNewDeletedCustomer?.newByBladeType ?? {};
    const s = dateSearchNewDeletedCustomer?.deletedByBladeType ?? {};

    const rows = bladeKeys.map((key) => {
      const oml = o[key] ?? 0;
      const rep = r[key] ?? 0;
      const rek = k[key] ?? 0;
      const nye = n[key] ?? 0;
      const sle = s[key] ?? 0;
      return {
        label: key || "—",
        nye,
        slettede: sle,
        omlodding: oml,
        reparasjon: rep,
        reklamasjon: rek,
        sortKey: nye + sle + oml + rep + rek, // sorter på total aktivitet
      };
    });

    rows.sort((a, b) => b.sortKey - a.sortKey);
    return rows;
  }, [bladeKeys, dateSearchServiceCustomer, dateSearchNewDeletedCustomer]);

  const noData =
    !anyLoading &&
    totalRow.nye === 0 &&
    totalRow.slettede === 0 &&
    totalRow.omlodding === 0 &&
    totalRow.reparasjon === 0 &&
    totalRow.reklamasjon === 0;

  return (
    <section className={`mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-24 `}>
      <div className="space-y-6">
        {/* Periode */}
        <div
          className={`rounded-2xl border ${theme === "darkmode" ? "primary" : "neutral"} p-5 shadow-sm`}
        >
          <h2 className="mb-1 text-lg font-semibold sm:text-xl">Periode</h2>
          <p className="text-sm text-gray-600">
            {fmtDate(periodFrom)} – {fmtDate(periodTo)}
          </p>
        </div>

        {/* Én samlet tabell */}
        <div
          className={`rounded-2xl border  shadow-sm ${theme === "darkmode" ? "primary" : "neutral"}`}
        >
          <div className="flex flex-col gap-1 border-b p-4 sm:p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold sm:text-xl">Oppsummering</h2>
              {typeof dateSearchServiceCustomer?.total === "number" && (
                <span className="text-xs text-gray-500 sm:text-sm">
                  Totalt (service): {dateSearchServiceCustomer.total}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Tall per kategori og per bladtype/side. Rull horisontalt på mobil.
            </p>
          </div>

          {anyLoading ? (
            <div className="p-5 text-sm text-gray-500">Laster …</div>
          ) : noData ? (
            <div className="p-5 text-sm text-gray-500">
              Ingen data i valgt periode.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-xs sm:text-sm">
                <thead className="sticky top-0 z-10 bg-white">
                  <tr className="border-b">
                    <th className="p-3 text-left font-medium text-gray-600">
                      Kategori
                    </th>
                    <th className="p-3 text-left font-medium text-gray-600">
                      Nye
                    </th>
                    <th className="p-3 text-left font-medium text-gray-600">
                      Slettede
                    </th>
                    <th className="p-3 text-left font-medium text-gray-600">
                      Omlodding
                    </th>
                    <th className="p-3 text-left font-medium text-gray-600">
                      Reparasjon
                    </th>
                    <th className="p-3 text-left font-medium text-gray-600">
                      Reklamasjon
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {/* Totalt-rad */}
                  <tr className="bg-gray-50/60">
                    <td className="p-3 font-medium">Totalt</td>
                    <td className="p-3">{totalRow.nye}</td>
                    <td className="p-3">{totalRow.slettede}</td>
                    <td className="p-3">{totalRow.omlodding}</td>
                    <td className="p-3">{totalRow.reparasjon}</td>
                    <td className="p-3">{totalRow.reklamasjon}</td>
                  </tr>

                  {/* Rader per bladtype/side */}
                  {bladeRows.map((r) => (
                    <tr key={r.label} className="hover:bg-gray-50">
                      <td className="p-3">{r.label}</td>
                      <td className="p-3">{r.nye}</td>
                      <td className="p-3">{r.slettede}</td>
                      <td className="p-3">{r.omlodding}</td>
                      <td className="p-3">{r.reparasjon}</td>
                      <td className="p-3">{r.reklamasjon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
