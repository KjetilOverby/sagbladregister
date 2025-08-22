// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
export const statistikkBladeDataRouter = createTRPCRouter({
  getMonthlyHistoryStats: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Hent alle historikkposter (inkludert slettede og aktive)
      const history = await ctx.db.bandhistorikk.findMany({
        select: {
          createdAt: true,
          service: true, // Hent service for å gruppere etter
        },
      });

      // Funksjon for å gruppere data etter år og måned
      const groupByMonthAndService = (
        history: { createdAt: Date; service: string }[],
      ) => {
        return history.reduce(
          (acc, entry) => {
            const yearMonth = `${entry.createdAt.getFullYear()}-${entry.createdAt.getMonth() + 1}`;

            // Initialiser månedlig objekt hvis det ikke eksisterer
            if (!acc[yearMonth]) {
              acc[yearMonth] = { reparasjon: 0, omlodding: 0, reklamasjon: 0 };
            }

            // Legg til debugging log for å sjekke hva 'service' inneholder

            // Øk telleren for servicekategori
            if (entry.service === "Reparasjon") {
              acc[yearMonth].reparasjon += 1;
            } else if (entry.service === "Omlodding") {
              acc[yearMonth].omlodding += 1;
            } else if (entry.service === "Reklamasjon") {
              acc[yearMonth].reklamasjon += 1;
            } else {
              // Hvis service ikke matcher, kan du logge uventede verdier
            }

            return acc;
          },
          {} as Record<
            string,
            { reparasjon: number; omlodding: number; reklamasjon: number }
          >,
        );
      };

      // Gruppér og tell månedlige service-statistikker
      const monthlyHistoryStats = groupByMonthAndService(history);

      // Omformater til en liste for enklere håndtering i frontend
      const monthlyStats = Object.keys(monthlyHistoryStats).map(
        (yearMonth) => ({
          yearMonth,
          ...monthlyHistoryStats[yearMonth],
        }),
      );

      return monthlyStats;
    } catch (error) {
      console.error("Feil ved henting av historikk-statistikk:", error);
      throw new Error("Kunne ikke hente historikk-statistikk");
    }
  }),

  getMonthlyHistoryStatsCustomer: protectedProcedure
    .input(z.object({ init: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        // Hent alle historikkposter (inkludert slettede og aktive)
        const history = await ctx.db.bandhistorikk.findMany({
          where: {
            bladeRelationId: { startsWith: input.init },
          },
          select: {
            createdAt: true,
            service: true, // Hent service for å gruppere etter
          },
        });

        // Funksjon for å gruppere data etter år og måned
        const groupByMonthAndService = (
          history: { createdAt: Date; service: string }[],
        ) => {
          return history.reduce(
            (acc, entry) => {
              const yearMonth = `${entry.createdAt.getFullYear()}-${entry.createdAt.getMonth() + 1}`;

              // Initialiser månedlig objekt hvis det ikke eksisterer
              if (!acc[yearMonth]) {
                acc[yearMonth] = {
                  reparasjon: 0,
                  omlodding: 0,
                  reklamasjon: 0,
                };
              }

              // Legg til debugging log for å sjekke hva 'service' inneholder

              // Øk telleren for servicekategori
              if (entry.service === "Reparasjon") {
                acc[yearMonth].reparasjon += 1;
              } else if (entry.service === "Omlodding") {
                acc[yearMonth].omlodding += 1;
              } else if (entry.service === "Reklamasjon") {
                acc[yearMonth].reklamasjon += 1;
              } else {
                // Hvis service ikke matcher, kan du logge uventede verdier
              }

              return acc;
            },
            {} as Record<
              string,
              { reparasjon: number; omlodding: number; reklamasjon: number }
            >,
          );
        };

        // Gruppér og tell månedlige service-statistikker
        const monthlyHistoryStats = groupByMonthAndService(history);

        // Omformater til en liste for enklere håndtering i frontend
        const monthlyStats = Object.keys(monthlyHistoryStats).map(
          (yearMonth) => ({
            yearMonth,
            ...monthlyHistoryStats[yearMonth],
          }),
        );

        return monthlyStats;
      } catch (error) {
        console.error("Feil ved henting av historikk-statistikk:", error);
        throw new Error("Kunne ikke hente historikk-statistikk");
      }
    }),

  getAllHistorikk: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.findMany({
        where: {
          createdAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  getAllHistorikkUpdate: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.findMany({
        where: {
          updatedAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),
  getAllHistorikkKS: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.findMany({
        where: {
          datoSrv: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
        orderBy: {
          datoSrv: "desc",
        },
      });
    }),

  getAllToothCount: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.aggregate({
        where: {
          updatedAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
        _sum: {
          antRep: true,
          antTannslipp: true,
        },
      });
    }),

  reklamasjonTypes: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.groupBy({
        by: ["feilkode"],
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
            },
          ],
        },
        _count: {
          feilkode: true,
        },
      });
    }),

  serviceTypesCount: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.groupBy({
        by: ["service"],
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
            },
          ],
        },
        _count: {
          service: true,
        },
      });
    }),
  serviceTypesCountCustomer: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.groupBy({
        by: ["service"],
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init },
            },
          ],
        },
        _count: {
          service: true,
        },
      });
    }),

  handlingServiceData: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string() }))
    .query(async ({ ctx, input }) => {
      const handlingData = await ctx.db.bandhistorikk.findMany({
        select: {
          handling: true,
        },
        where: {
          updatedAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
      });

      const handlingCounts = {};

      handlingData.forEach((data) => {
        const handlings = data.handling.split(", ");
        handlings.forEach((handling) => {
          if (handling in handlingCounts) {
            handlingCounts[handling]++;
          } else {
            handlingCounts[handling] = 1;
          }
        });
      });

      return handlingCounts;
    }),

  historyCountYearly: protectedProcedure.query(async ({ ctx }) => {
    const history = await ctx.db.bandhistorikk.findMany({
      select: {
        createdAt: true,
        service: true,
        bladType: true, // Viktig! Det heter bladType
        side: true, // Legger til side hvis den finnes
      },
    });

    // Sjekk om vi faktisk fikk data
    if (!history || history.length === 0) {
      console.log("Ingen data funnet i bandhistorikk-tabellen.");
      return {};
    }

    // Gruppering av tellinger
    const yearlyCount = history.reduce(
      (acc, entry) => {
        const year = entry.createdAt
          ? new Date(entry.createdAt).getFullYear()
          : "Ukjent";
        const serviceType = entry.service || "Ukjent"; // Håndterer null-verdier
        const bladType = entry.bladType || "Ukjent"; // Håndterer null-verdier
        const side = entry.side ? `${entry.side}` : ""; // Håndterer side

        const bladeKey = `${bladType}  ${side}`; // Kombiner bladType og side til en unik nøkkel

        // Initialiser året hvis det ikke finnes
        if (!acc[year]) {
          acc[year] = {
            total: 0,
            reparasjon: 0,
            omlodding: 0,
            reklamasjon: 0,
            bladeTypesOmlodding: {}, // Telling av bladType for omlodding
            bladeTypesReparasjon: {}, // Telling av bladType for reparasjon
            bladeTypesReklamasjon: {}, // Telling av bladType for reklamasjon
          };
        }

        // Øk total teller
        acc[year].total += 1;

        // Øk teller basert på service-type og tell bladTyper med side
        if (serviceType === "Reparasjon") {
          acc[year].reparasjon += 1;

          // Tell bladType for Reparasjon med side
          if (!acc[year].bladeTypesReparasjon[bladeKey]) {
            acc[year].bladeTypesReparasjon[bladeKey] = 0;
          }
          acc[year].bladeTypesReparasjon[bladeKey] += 1;
        } else if (serviceType === "Omlodding") {
          acc[year].omlodding += 1;

          // Tell bladType for Omlodding med side
          if (!acc[year].bladeTypesOmlodding[bladeKey]) {
            acc[year].bladeTypesOmlodding[bladeKey] = 0;
          }
          acc[year].bladeTypesOmlodding[bladeKey] += 1;
        } else if (serviceType === "Reklamasjon") {
          acc[year].reklamasjon += 1;

          // Tell bladType for Reklamasjon med side
          if (!acc[year].bladeTypesReklamasjon[bladeKey]) {
            acc[year].bladeTypesReklamasjon[bladeKey] = 0;
          }
          acc[year].bladeTypesReklamasjon[bladeKey] += 1;
        }

        return acc;
      },
      {} as Record<
        number | string,
        {
          total: number;
          reparasjon: number;
          omlodding: number;
          reklamasjon: number;
          bladeTypesOmlodding: Record<string, number>;
          bladeTypesReparasjon: Record<string, number>;
          bladeTypesReklamasjon: Record<string, number>;
        }
      >,
    );

    return yearlyCount;
  }),

  // ****************** CUSTOMERS ****************** //

  getAllCustomerHistorikk: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.findMany({
        where: {
          createdAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
          bladeRelationId: { startsWith: input.init },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  historyCountYearlyCustomer: protectedProcedure
    .input(z.object({ init: z.string() })) // Legger til input for init
    .query(async ({ ctx, input }) => {
      const history = await ctx.db.bandhistorikk.findMany({
        where: {
          bladeRelationId: {
            startsWith: input.init, // Filter for bladeRelationId som starter med input.init
          },
        },
        select: {
          createdAt: true,
          service: true,
          bladType: true,
          side: true, // Legger til side hvis den finnes
        },
      });

      // Sjekk om vi faktisk fikk data
      if (!history || history.length === 0) {
        console.log("Ingen data funnet i bandhistorikk-tabellen.");
        return {};
      }

      // Gruppering av tellinger
      const yearlyCount = history.reduce(
        (acc, entry) => {
          const year = entry.createdAt
            ? new Date(entry.createdAt).getFullYear()
            : "Ukjent";
          const serviceType = entry.service || "Ukjent"; // Håndterer null-verdier
          const bladType = entry.bladType || "Ukjent"; // Håndterer null-verdier
          const side = entry.side ? `${entry.side}` : ""; // Håndterer side

          const bladeKey = `${bladType}  ${side}`; // Kombiner bladType og side til en unik nøkkel

          // Initialiser året hvis det ikke finnes
          if (!acc[year]) {
            acc[year] = {
              total: 0,
              reparasjon: 0,
              omlodding: 0,
              reklamasjon: 0,
              bladeTypesOmlodding: {}, // Telling av bladType for omlodding
              bladeTypesReparasjon: {}, // Telling av bladType for reparasjon
              bladeTypesReklamasjon: {}, // Telling av bladType for reklamasjon
            };
          }

          // Øk total teller
          acc[year].total += 1;

          // Øk teller basert på service-type og tell bladTyper med side
          if (serviceType === "Reparasjon") {
            acc[year].reparasjon += 1;

            // Tell bladType for Reparasjon med side
            if (!acc[year].bladeTypesReparasjon[bladeKey]) {
              acc[year].bladeTypesReparasjon[bladeKey] = 0;
            }
            acc[year].bladeTypesReparasjon[bladeKey] += 1;
          } else if (serviceType === "Omlodding") {
            acc[year].omlodding += 1;

            // Tell bladType for Omlodding med side
            if (!acc[year].bladeTypesOmlodding[bladeKey]) {
              acc[year].bladeTypesOmlodding[bladeKey] = 0;
            }
            acc[year].bladeTypesOmlodding[bladeKey] += 1;
          } else if (serviceType === "Reklamasjon") {
            acc[year].reklamasjon += 1;

            // Tell bladType for Reklamasjon med side
            if (!acc[year].bladeTypesReklamasjon[bladeKey]) {
              acc[year].bladeTypesReklamasjon[bladeKey] = 0;
            }
            acc[year].bladeTypesReklamasjon[bladeKey] += 1;
          }

          return acc;
        },
        {} as Record<
          number | string,
          {
            total: number;
            reparasjon: number;
            omlodding: number;
            reklamasjon: number;
            bladeTypesOmlodding: Record<string, number>;
            bladeTypesReparasjon: Record<string, number>;
            bladeTypesReklamasjon: Record<string, number>;
          }
        >,
      );

      return yearlyCount;
    }),

  getAllHistorikkUpdateCustomer: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.findMany({
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init },
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  getAllHistorikkKSCustomer: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.findMany({
        where: {
          AND: [
            {
              datoSrv: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init },
            },
          ],
        },
        orderBy: {
          datoSrv: "desc",
        },
      });
    }),

  reklamasjonTypesCustomer: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.groupBy({
        by: ["feilkode"],
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init },
            },
          ],
        },
        _count: {
          feilkode: true,
        },
      });
    }),

  getAllCustomerToothCount: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.bandhistorikk.aggregate({
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init },
            },
          ],
        },
        _sum: {
          antRep: true,
          antTannslipp: true,
        },
      });
    }),

  handlingServiceDataCustomer: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(async ({ ctx, input }) => {
      const handlingData = await ctx.db.bandhistorikk.findMany({
        select: {
          handling: true,
        },
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init },
            },
          ],
        },
      });

      const handlingCounts = {};

      handlingData.forEach((data) => {
        const handlings = data.handling.split(", ");
        handlings.forEach((handling) => {
          if (handling in handlingCounts) {
            handlingCounts[handling]++;
          } else {
            handlingCounts[handling] = 1;
          }
        });
      });

      return handlingCounts;
    }),





//********************** DATE SEARCH STATS *****************************/

dateSearchHistoryCountCustomer: protectedProcedure
  .input(
    z.object({
      init: z.string(),
      from: z.coerce.date(), // aksepterer ISO-string/number/Date
      to: z.coerce.date(),
    }),
  )
  .query(async ({ ctx, input }) => {
    try {
      // 1) Riktig rekkefølge + inklusiv sluttdøgn
      let { from, to, init } = input;
      if (from > to) [from, to] = [to, from];
      to = new Date(to);
      to.setHours(23, 59, 59, 999);

      // 2) Hent historikk i perioden
      const history = await ctx.db.bandhistorikk.findMany({
        where: {
          bladeRelationId: { startsWith: init },
          createdAt: { gte: from, lte: to },
        },
        select: {
          createdAt: true,
          service: true,
          bladType: true,
          side: true,
        },
      });

      // 3) Aggreger for valgt periode (ikke per år)
      const acc = {
        total: 0,
        reparasjon: 0,
        omlodding: 0,
        reklamasjon: 0,
        bladeTypesOmlodding: {} as Record<string, number>,
        bladeTypesReparasjon: {} as Record<string, number>,
        bladeTypesReklamasjon: {} as Record<string, number>,
      };

      for (const entry of history) {
        acc.total += 1;

        const serviceType = entry.service ?? "Ukjent";
        const bladType = entry.bladType ?? "Ukjent";
        const side = entry.side ? String(entry.side) : "";
        const bladeKey = `${bladType}  ${side}`.trimEnd(); // bladType + side

        if (serviceType === "Reparasjon") {
          acc.reparasjon += 1;
          acc.bladeTypesReparasjon[bladeKey] =
            (acc.bladeTypesReparasjon[bladeKey] ?? 0) + 1;
        } else if (serviceType === "Omlodding") {
          acc.omlodding += 1;
          acc.bladeTypesOmlodding[bladeKey] =
            (acc.bladeTypesOmlodding[bladeKey] ?? 0) + 1;
        } else if (serviceType === "Reklamasjon") {
          acc.reklamasjon += 1;
          acc.bladeTypesReklamasjon[bladeKey] =
            (acc.bladeTypesReklamasjon[bladeKey] ?? 0) + 1;
        }
        // Hvis du vil telle andre/ukjente service-typer, kan du legge til en egen bucket her.
      }

      // 4) Returnér én blokk for perioden
      return {
        from,
        to,
        ...acc,
      };
    } catch (error) {
      console.error("Feil ved henting av historikk-telling i periode:", error);
      throw new Error("Kunne ikke hente historikk-telling for perioden");
    }
  })



});
