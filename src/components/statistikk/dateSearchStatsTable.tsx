/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import * as React from "react";

type NewDeletedRes =
  | {
      from: string | Date;
      to: string | Date;
      newCount: number;
      deletedCount: number;
      newByBladeType: Record<string, number>;
      deletedByBladeType: Record<string, number>;
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

// ---- Helpers for å slå sammen nøkler ----
function normalizeSide(raw?: string | null): "høyre" | "venstre" | null {
  if (!raw) return null;
  const t = raw
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (/(^|\b)(hoyre|høyre|right|rh)(\b|$)/.test(t)) return "høyre";
  if (/(^|\b)(venstre|left|lh)(\b|$)/.test(t)) return "venstre";
  return null;
}

function parseKeyToCanonical(key: string) {
  const trimmed = (key ?? "").replace(/\s+/g, " ").trim();
  if (!trimmed) return { canonical: "—", type: "—", side: null };

  const m2 = trimmed.match(/^(.+?)\s{2,}(.+)$/);
  const m1 = m2 ? null : trimmed.match(/^(.+?)\s+(.+)$/);

  const type = (m2?.[1] ?? m1?.[1] ?? trimmed).trim();
  const sideRaw = (m2?.[2] ?? m1?.[2] ?? "").trim();
  const side = normalizeSide(sideRaw);

  const canonical = side ? `${type}  ${side}` : type; // alltid to mellomrom
  return { canonical, type, side };
}

function collapseBucket(bucket: Record<string, number> | undefined) {
  const map = new Map<string, number>();
  if (!bucket) return map;
  for (const [k, v] of Object.entries(bucket)) {
    const { canonical } = parseKeyToCanonical(k);
    map.set(canonical, (map.get(canonical) ?? 0) + (v ?? 0));
  }
  return map;
}

// ---- Komponent ----
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
  theme: string;
}) {
  const periodFrom =
    dateSearchNewDeletedCustomer?.from ?? dateSearchServiceCustomer?.from;
  const periodTo =
    dateSearchNewDeletedCustomer?.to ?? dateSearchServiceCustomer?.to;

  const anyLoading = Boolean(isLoadingNewDeleted) ?? Boolean(isLoadingService);

  const totalRow = {
    label: "Totalt",
    nye: dateSearchNewDeletedCustomer?.newCount ?? 0,
    slettede: dateSearchNewDeletedCustomer?.deletedCount ?? 0,
    omlodding: dateSearchServiceCustomer?.omlodding ?? 0,
    reparasjon: dateSearchServiceCustomer?.reparasjon ?? 0,
    reklamasjon: dateSearchServiceCustomer?.reklamasjon ?? 0,
  };

  // Slå sammen buckets med canonical keys
  const { nMap, sMap, omlMap, repMap, rekMap, bladeKeys } =
    React.useMemo(() => {
      const nMap = collapseBucket(dateSearchNewDeletedCustomer?.newByBladeType);
      const sMap = collapseBucket(
        dateSearchNewDeletedCustomer?.deletedByBladeType,
      );
      const omlMap = collapseBucket(
        dateSearchServiceCustomer?.bladeTypesOmlodding,
      );
      const repMap = collapseBucket(
        dateSearchServiceCustomer?.bladeTypesReparasjon,
      );
      const rekMap = collapseBucket(
        dateSearchServiceCustomer?.bladeTypesReklamasjon,
      );

      const keys = new Set<string>([
        ...nMap.keys(),
        ...sMap.keys(),
        ...omlMap.keys(),
        ...repMap.keys(),
        ...rekMap.keys(),
      ]);

      return {
        nMap,
        sMap,
        omlMap,
        repMap,
        rekMap,
        bladeKeys: Array.from(keys),
      };
    }, [dateSearchServiceCustomer, dateSearchNewDeletedCustomer]);

  // Bygg radene
  const bladeRows = React.useMemo(() => {
    const rows = bladeKeys.map((canonical) => {
      const nye = nMap.get(canonical) ?? 0;
      const sle = sMap.get(canonical) ?? 0;
      const oml = omlMap.get(canonical) ?? 0;
      const rep = repMap.get(canonical) ?? 0;
      const rek = rekMap.get(canonical) ?? 0;

      const { type, side } = parseKeyToCanonical(canonical);
      const label = side ? `${type} (${side})` : type;

      return {
        label,
        nye,
        slettede: sle,
        omlodding: oml,
        reparasjon: rep,
        reklamasjon: rek,
        sortKey: nye + sle + oml + rep + rek,
      };
    });

    rows.sort((a, b) => b.sortKey - a.sortKey);
    return rows;
  }, [bladeKeys, nMap, sMap, omlMap, repMap, rekMap]);

  const noData =
    !anyLoading &&
    totalRow.nye === 0 &&
    totalRow.slettede === 0 &&
    totalRow.omlodding === 0 &&
    totalRow.reparasjon === 0 &&
    totalRow.reklamasjon === 0;

  function formatDiff(from?: string | Date, to?: string | Date) {
    if (!from ?? !to) return "";
    const start = new Date(from);
    const end = new Date(to);
    if (isNaN(start.getTime()) ?? isNaN(end.getTime())) return "";

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
    <section className="mx-auto px-[14vw] py-6 pb-[10rem] [@media(min-width:1800px)]:max-w-[1600px] [@media(min-width:2560px)]:max-w-[2400px]">
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

        {/* Tabell */}
        <div
          className={`rounded-2xl border border-primary shadow-sm ${theme === "darkmode" ? "primary" : "neutral"}`}
        >
          <div className="flex flex-col gap-1 border-b p-4 sm:p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-neutral sm:text-xl">
                Oppsummering
              </h2>
              {typeof dateSearchServiceCustomer?.total === "number" && (
                <span className="text-xs text-neutral sm:text-sm">
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
                  {/* Totalt */}
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
                  <tr aria-hidden className="h-[1px]">
                    <td colSpan={6}>
                      <div className="mx-3 h-px bg-neutral/20" />
                    </td>
                  </tr>

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
