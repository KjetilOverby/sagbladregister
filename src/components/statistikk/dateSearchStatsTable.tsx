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

  const anyLoading = isLoadingNewDeleted ?? isLoadingService;

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

  function formatDiff(from?: string | Date, to?: string | Date) {
    if (!from || !to) return "";
    const start = new Date(from);
    const end = new Date(to);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return "";

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(
        end.getFullYear(),
        end.getMonth(),
        0,
      ).getDate();
      days += prevMonth;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const parts = [];
    if (years) parts.push(`${years} år`);
    if (months) parts.push(`${months} mnd`);
    if (days) parts.push(`${days} dager`);

    return parts.join(" ");
  }

  return (
    <section
      className="mx-auto  px-[14vw] 
  py-6 pb-[10rem] [@media(min-width:1800px)]:max-w-[1600px] [@media(min-width:2560px)]:max-w-[2400px]"
    >
      <div className="space-y-6">
        <p className="text-neutral">
          Oversikt over nye og slettede sagblad, samt service-aktivitet for
          valgt periode.
        </p>
        {/* Periode */}
        <div
          className={`rounded-2xl border border-primary ${theme === "darkmode" ? "primary" : "neutral"} p-5 shadow-sm`}
        >
          <h2 className="mb-1 text-lg font-semibold text-neutral sm:text-xl">
            Periode
          </h2>
          <p className="text-sm text-neutral">
            {fmtDate(periodFrom)} – {fmtDate(periodTo)}
          </p>
          <p className="text-xs text-neutral">
            ({formatDiff(periodFrom, periodTo)})
          </p>
        </div>
        {/* Én samlet tabell */}
        <div
          className={`rounded-2xl border border-primary  shadow-sm ${theme === "darkmode" ? "primary" : "neutral"}`}
        >
          <div className="flex flex-col gap-1 border-b p-4 sm:p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-neutral sm:text-xl">
                Oppsummering
              </h2>
              {typeof dateSearchServiceCustomer?.total === "number" && (
                <span className="text-xs  text-neutral sm:text-sm">
                  Totalt (service): {dateSearchServiceCustomer.total}
                </span>
              )}
            </div>
          </div>

          {anyLoading ? (
            <div className="p-5 text-sm text-gray-500">Laster …</div>
          ) : noData ? (
            <div className="p-5 text-sm text-gray-500">
              Ingen data i valgt periode.
            </div>
          ) : (
            <div className="overflow-x-auto p-5">
              <table className="w-full min-w-[720px] table-auto text-xs sm:text-sm">
                <thead className="sticky top-0 z-10 bg-base-100/95 backdrop-blur">
                  <tr>
                    <th className="p-3 text-left font-medium text-neutral">
                      Kategori
                    </th>
                    <th className="p-3 text-right font-medium text-neutral">
                      Nye
                    </th>
                    <th className="p-3 text-right font-medium text-neutral">
                      Slettede
                    </th>
                    <th className="p-3 text-right font-medium text-neutral">
                      Omlodding
                    </th>
                    <th className="p-3 text-right font-medium text-neutral">
                      Reparasjon
                    </th>
                    <th className="p-3 text-right font-medium text-neutral">
                      Reklamasjon
                    </th>
                  </tr>
                </thead>

                <tbody className="align-middle">
                  {/* Totalt-rad */}
                  <tr className="bg-base-100/80">
                    <td className="p-2 text-xs font-bold text-neutral">
                      Totalt
                    </td>
                    <td className="p-2 text-right text-xs font-bold tabular-nums text-neutral">
                      {totalRow.nye}
                    </td>
                    <td className="p-2 text-right text-xs font-bold tabular-nums text-neutral">
                      {totalRow.slettede}
                    </td>
                    <td className="p-2 text-right text-xs font-bold tabular-nums text-neutral">
                      {totalRow.omlodding}
                    </td>
                    <td className="p-2 text-right text-xs font-bold tabular-nums text-neutral">
                      {totalRow.reparasjon}
                    </td>
                    <td className="p-2 text-right text-xs font-bold tabular-nums text-neutral">
                      {totalRow.reklamasjon}
                    </td>
                  </tr>
                  {/* Inset-divider etter totalt-rad */}
                  <tr aria-hidden className="h-[1px]">
                    <td colSpan={6}>
                      <div className="mx-3 h-px bg-neutral/20" />
                    </td>
                  </tr>

                  {/* Rader per bladtype/side m/ innrykket skillelinje */}
                  {bladeRows.map((r, i) => (
                    <React.Fragment key={r.label}>
                      <tr className="transition-colors hover:bg-primary/50">
                        <td className="p-2 text-xs text-neutral">{r.label}</td>
                        <td className="p-2 text-right text-xs tabular-nums text-neutral">
                          {r.nye}
                        </td>
                        <td className="p-2 text-right text-xs tabular-nums text-neutral">
                          {r.slettede}
                        </td>
                        <td className="p-2 text-right text-xs tabular-nums text-neutral">
                          {r.omlodding}
                        </td>
                        <td className="p-2 text-right text-xs tabular-nums text-neutral">
                          {r.reparasjon}
                        </td>
                        <td className="p-2 text-right text-xs tabular-nums text-neutral">
                          {r.reklamasjon}
                        </td>
                      </tr>
                      {i < bladeRows.length - 1 && (
                        <tr aria-hidden className="h-[1px]">
                          <td colSpan={6}>
                            <div className="mx-3 h-px bg-neutral/20" />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
