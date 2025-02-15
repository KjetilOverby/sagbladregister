// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
export const sawbladesRouter = createTRPCRouter({
  getMonthlyCount: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Hent alle poster med både createdAt og updatedAt
      const allBlader = await ctx.db.sawblades.findMany({
        select: {
          createdAt: true,
          updatedAt: true,
          deleted: true,
        },
      });

      // Funksjon for å gruppere og telle poster etter år og måned
      const groupByMonth = (
        blader: { createdAt: Date; updatedAt: Date; deleted: boolean }[],
        dateField: "createdAt" | "updatedAt",
        filterDeleted?: boolean,
      ) => {
        return blader.reduce(
          (acc, blade) => {
            // Bruker riktig dato-felt for tellingen (createdAt eller updatedAt)
            const date = blade[dateField];
            const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

            // Filtrerer etter `deleted` hvis spesifisert
            if (
              filterDeleted === undefined ||
              blade.deleted === filterDeleted
            ) {
              acc[yearMonth] = (acc[yearMonth] ?? 0) + 1;
            }
            return acc;
          },
          {} as Record<string, number>,
        );
      };

      // Teller nye poster per måned (basert på createdAt)
      const newMonthlyStats = groupByMonth(allBlader, "createdAt");

      // Teller slettede poster per måned (basert på updatedAt og kun når deleted: true)
      const deletedMonthlyStats = groupByMonth(allBlader, "updatedAt", true);

      // Kombinerer de månedlige resultatene i ønsket format
      const allMonths = new Set([
        ...Object.keys(newMonthlyStats),
        ...Object.keys(deletedMonthlyStats),
      ]);

      const monthlyStats = Array.from(allMonths).map((yearMonth) => ({
        yearMonth,
        newCount: newMonthlyStats[yearMonth] ?? 0,
        deletedCount: deletedMonthlyStats[yearMonth] ?? 0,
      }));

      return monthlyStats;
    } catch (error) {
      console.error("Feil ved henting av månedlige statistikker:", error);
      throw new Error("Kunne ikke hente månedlige statistikker");
    }
  }),

  getMonthlyCountCustomer: protectedProcedure
    .input(z.object({ init: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        // Hent alle poster med både createdAt og updatedAt
        const allBlader = await ctx.db.sawblades.findMany({
          where: {
            IdNummer: { startsWith: input.init },
          },
          select: {
            createdAt: true,
            updatedAt: true,
            deleted: true,
          },
        });

        // Funksjon for å gruppere og telle poster etter år og måned
        const groupByMonth = (
          blader: { createdAt: Date; updatedAt: Date; deleted: boolean }[],
          dateField: "createdAt" | "updatedAt",
          filterDeleted?: boolean,
        ) => {
          return blader.reduce(
            (acc, blade) => {
              // Bruker riktig dato-felt for tellingen (createdAt eller updatedAt)
              const date = blade[dateField];
              const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;

              // Filtrerer etter `deleted` hvis spesifisert
              if (
                filterDeleted === undefined ||
                blade.deleted === filterDeleted
              ) {
                acc[yearMonth] = (acc[yearMonth] ?? 0) + 1;
              }
              return acc;
            },
            {} as Record<string, number>,
          );
        };

        // Teller nye poster per måned (basert på createdAt)
        const newMonthlyStats = groupByMonth(allBlader, "createdAt");

        // Teller slettede poster per måned (basert på updatedAt og kun når deleted: true)
        const deletedMonthlyStats = groupByMonth(allBlader, "updatedAt", true);

        // Kombinerer de månedlige resultatene i ønsket format
        const allMonths = new Set([
          ...Object.keys(newMonthlyStats),
          ...Object.keys(deletedMonthlyStats),
        ]);

        const monthlyStats = Array.from(allMonths).map((yearMonth) => ({
          yearMonth,
          newCount: newMonthlyStats[yearMonth] ?? 0,
          deletedCount: deletedMonthlyStats[yearMonth] ?? 0,
        }));

        return monthlyStats;
      } catch (error) {
        console.error("Feil ved henting av månedlige statistikker:", error);
        throw new Error("Kunne ikke hente månedlige statistikker");
      }
    }),

  getRetipStats: protectedProcedure.query(async ({ ctx }) => {
    try {
      // Hent alle blader som ikke er slettet (deleted: false), og inkluder bladType og service fra bandhistorikk
      const activeBlader = await ctx.db.sawblades.findMany({
        where: {
          deleted: false, // Filtrering for å hente blader som ikke er slettet
        },
        include: {
          bandhistorikk: {
            select: {
              service: true, // Hent kun service fra bandhistorikk
            },
          },
        },
      });

      return activeBlader;
    } catch (error) {
      console.error("Feil ved henting av aktive blader:", error);
      throw new Error("Kunne ikke hente aktive blader");
    }
  }),

  getRetipStatsCustomer: protectedProcedure
    .input(z.object({ init: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        // Hent alle blader som ikke er slettet (deleted: false), og inkluder bladType og service fra bandhistorikk
        const activeBlader = await ctx.db.sawblades.findMany({
          where: {
            deleted: false,
            IdNummer: { startsWith: input.init },
          },
          include: {
            bandhistorikk: {
              select: {
                service: true, // Hent kun service fra bandhistorikk
              },
            },
          },
        });

        return activeBlader;
      } catch (error) {
        console.error("Feil ved henting av aktive blader:", error);
        throw new Error("Kunne ikke hente aktive blader");
      }
    }),

  columns: protectedProcedure
    .input(
      z.object({
        type: z.boolean(),
        id: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
        kunde: z.boolean(),
        IdNummer: z.boolean(),
        creator: z.boolean(),
        side: z.boolean(),
        note: z.boolean(),
        active: z.boolean(),
        deleted: z.boolean(),
        deleteReason: z.boolean(),
        produsent: z.boolean(),
        deleter: z.boolean(),
        deleterImg: z.boolean(),
        creatorImg: z.boolean(),
        createdById: z.boolean(),
        userId: z.boolean(),
        date: z.string(),
        date2: z.string(),
        artikkel: z.boolean(),
        orderBy: z
          .object({
            field: z.string(),
            direction: z.enum(["asc", "desc"]),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Define default orderBy if not provided
      const orderBy = input.orderBy
        ? { [input.orderBy.field]: input.orderBy.direction }
        : { deleteReason: "asc" };

      const total = await ctx.db.sawblades.findMany({
        where: {
          createdAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        },
        select: {
          id: input.id,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
          kunde: input.kunde,
          type: input.type,
          IdNummer: input.IdNummer,
          createdById: input.createdById,
          userId: input.userId,
          creator: input.creator,
          creatorImg: input.creatorImg,
          deleted: input.deleted,
          note: input.note,
          side: input.side,
          active: input.active,
          deleteReason: input.deleteReason,
          produsent: input.produsent,
          deleter: input.deleter,
          deleterImg: input.deleterImg,
          artikkel: input.artikkel,
        },
        orderBy,
      });

      return total;
    }),

  columnsCustomer: protectedProcedure
    .input(
      z.object({
        type: z.boolean(),
        id: z.boolean(),
        createdAt: z.boolean(),
        updatedAt: z.boolean(),
        kunde: z.boolean(),
        IdNummer: z.boolean(),
        creator: z.boolean(),
        side: z.boolean(),
        note: z.boolean(),
        active: z.boolean(),
        deleted: z.boolean(),
        deleteReason: z.boolean(),
        produsent: z.boolean(),
        deleter: z.boolean(),
        deleterImg: z.boolean(),
        creatorImg: z.boolean(),
        createdById: z.boolean(),
        userId: z.boolean(),
        date: z.string(),
        date2: z.string(),
        artikkel: z.boolean(),
        init: z.string(),
        orderBy: z
          .object({
            field: z.string(),
            direction: z.enum(["asc", "desc"]),
          })
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Define default orderBy if not provided
      const orderBy = input.orderBy
        ? { [input.orderBy.field]: input.orderBy.direction }
        : { deleteReason: "asc" };

      const total = await ctx.db.sawblades.findMany({
        where: {
          createdAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
          IdNummer: { startsWith: input.init },
        },
        select: {
          id: input.id,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
          kunde: input.kunde,
          type: input.type,
          IdNummer: input.IdNummer,
          createdById: input.createdById,
          userId: input.userId,
          creator: input.creator,
          creatorImg: input.creatorImg,
          deleted: input.deleted,
          note: input.note,
          side: input.side,
          active: input.active,
          deleteReason: input.deleteReason,
          produsent: input.produsent,
          deleter: input.deleter,
          deleterImg: input.deleterImg,
          artikkel: input.artikkel,
        },
        orderBy,
      });

      return total;
    }),

  countSawblades: protectedProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.sawblades.groupBy({
      by: ["deleted", "side", "type"],
      _count: true,
    });

    return count;
  }),

  getAllCreate: protectedProcedure
    .input(
      z.object({ date: z.string(), date2: z.string(), IdNummer: z.string() }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.sawblades.findMany({
        where: {
          AND: [
            {
              createdAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              IdNummer: {
                contains: input.IdNummer ? input.IdNummer : undefined,
              },
            },
          ],
        },
        include: {
          bandhistorikk: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  getAll: protectedProcedure
    .input(z.object({ IdNummer: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.sawblades.findMany({
        take: 5,
        where: {
          AND: [
            {
              IdNummer: input.IdNummer,
            },
          ],
        },
        orderBy: {
          IdNummer: "desc",
        },
        include: {
          _count: {
            select: {
              bandhistorikk: true,
            },
          },
          bandhistorikk: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
    }),

  getAllService: protectedProcedure.query(({ ctx }) => {
    return ctx.db.sawblades.findMany({
      where: {
        active: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        _count: {
          select: {
            bandhistorikk: true,
          },
        },
        bandhistorikk: {
          select: {
            service: true,
            feilkode: true,
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: 15,
        },
      },
    });
  }),

  getAllDeleted: protectedProcedure
    .input(z.object({ date2: z.string(), date: z.string() }))
    .query(({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.findMany({
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              deleted: true,
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          _count: {
            select: {
              bandhistorikk: true,
            },
          },
          bandhistorikk: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }),

  getActive: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        date2: z.string(),
        IdNummer: z.string(),
        init: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.findMany({
        where: {
          AND: [
            {
              active: true,
              IdNummer: { startsWith: input.init },
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          _count: {
            select: {
              bandhistorikk: true,
            },
          },
          bandhistorikk: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }),

  newDeletedYearly: protectedProcedure.query(async ({ ctx }) => {
    const sawblades = await ctx.db.sawblades.findMany({
      select: {
        type: true,
        side: true, // Legg til side hvis den finnes
        createdAt: true,
        updatedAt: true,
        deleted: true,
      },
    });

    // Funksjon for å gruppere etter år, type og side
    type Blade = {
      type: string;
      side?: string; // Side kan være valgfritt
      createdAt?: Date;
      updatedAt?: Date;
      deleted?: boolean;
    };

    const groupByYear = (blades: Blade[], key: keyof Blade) => {
      return blades.reduce<Record<number, Record<string, number>>>(
        (acc, blade) => {
          const date = blade[key];
          if (!date || !(date instanceof Date)) return acc; // Sikre at nøkkelen finnes og er en dato

          const year = date.getFullYear();
          const type = blade.type || "Ukjent";
          const side = blade.side ? `${blade.side}` : ""; // Håndter side, hvis den finnes

          const typeKey = `${type}  ${side}`; // Kombiner type og side til en unik nøkkel

          if (!acc[year]) acc[year] = {}; // Initierer året hvis det ikke finnes
          acc[year][typeKey] = (acc[year][typeKey] ?? 0) + 1; // Teller opp for riktig type og side

          return acc;
        },
        {},
      );
    };

    // Filtrer aktive og slettede sagblad
    const activeBlades = sawblades;
    const deletedBlades = sawblades.filter((blade) => blade.deleted);

    // Gruppér etter år og kombiner type og side
    const createdByYear = groupByYear(activeBlades, "createdAt");
    const deletedByYear = groupByYear(deletedBlades, "updatedAt");

    return {
      createdByYear,
      deletedByYear,
    };
  }),

  // ************************* CUSTOMERS *****************************////////

  newDeletedYearlyCustomer: protectedProcedure
    .input(z.object({ init: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        // Hent alle sagblader som starter med input.init i IdNumber
        const sawblades = await ctx.db.sawblades.findMany({
          where: {
            IdNummer: {
              startsWith: input.init, // Filter by IdNumber starting with input.init
            },
          },
          select: {
            type: true,
            side: true, // Legg til side hvis den finnes
            createdAt: true,
            updatedAt: true,
            deleted: true,
          },
        });

        // Funksjon for å gruppere etter år, type og side
        type Blade = {
          type: string;
          side?: string; // Side kan være valgfritt
          createdAt?: Date;
          updatedAt?: Date;
          deleted?: boolean;
        };

        const groupByYear = (blades: Blade[], key: keyof Blade) => {
          return blades.reduce<Record<number, Record<string, number>>>(
            (acc, blade) => {
              const date = blade[key];
              if (!date || !(date instanceof Date)) return acc; // Sikre at nøkkelen finnes og er en dato

              const year = date.getFullYear();
              const type = blade.type || "Ukjent";
              const side = blade.side ? `${blade.side}` : ""; // Håndter side, hvis den finnes

              const typeKey = `${type}  ${side}`; // Kombiner type og side til en unik nøkkel

              if (!acc[year]) acc[year] = {}; // Initierer året hvis det ikke finnes
              acc[year][typeKey] = (acc[year][typeKey] ?? 0) + 1; // Teller opp for riktig type og side

              return acc;
            },
            {},
          );
        };

        // Filtrer aktive og slettede sagblad
        const activeBlades = sawblades;
        const deletedBlades = sawblades.filter((blade) => blade.deleted);

        // Gruppér etter år og kombiner type og side
        const createdByYear = groupByYear(activeBlades, "createdAt");
        const deletedByYear = groupByYear(deletedBlades, "updatedAt");

        return {
          createdByYear,
          deletedByYear,
        };
      } catch (error) {
        console.error("Error fetching sawblades: ", error);
        throw new Error("Unable to fetch sawblades data.");
      }
    }),

  getAllCreateCustomer: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        date2: z.string(),
        IdNummer: z.string(),
        init: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.sawblades.findMany({
        where: {
          AND: [
            {
              createdAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              IdNummer: {
                startsWith: input.init,
                contains: input.IdNummer,
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  countSawbladesCustomer: protectedProcedure
    .input(z.object({ init: z.string() }))
    .query(async ({ ctx, input }) => {
      const count = await ctx.db.sawblades.groupBy({
        by: ["deleted", "side", "type"],
        _count: true,
        where: {
          IdNummer: {
            startsWith: input.init,
          },
        },
      });

      return count;
    }),

  countAllBladesCustomer: protectedProcedure
    .input(z.object({ init: z.string() }))
    .query(async ({ ctx, input }) => {
      const total = await ctx.db.sawblades.count({
        where: { IdNummer: { startsWith: input.init } },
      });
      const deleted = await ctx.db.sawblades.count({
        where: { IdNummer: { startsWith: input.init }, deleted: true },
      });
      const notDeleted = await ctx.db.sawblades.count({
        where: { IdNummer: { startsWith: input.init }, deleted: false },
      });

      return { total, deleted, notDeleted };
    }),

  countAllBlades: protectedProcedure.query(async ({ ctx }) => {
    const total = await ctx.db.sawblades.count();
    const deleted = await ctx.db.sawblades.count({ where: { deleted: true } });
    const notDeleted = await ctx.db.sawblades.count({
      where: { deleted: false },
    });

    return { total, deleted, notDeleted };
  }),

  getCustomerAllDeleted: protectedProcedure
    .input(z.object({ date: z.string(), date2: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.findMany({
        where: {
          AND: [
            {
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
              },
              deleted: true,
              IdNummer: { startsWith: input.init },
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          _count: {
            select: {
              bandhistorikk: true,
            },
          },
          bandhistorikk: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }),

  getCustomer: protectedProcedure
    .input(z.object({ IdNummer: z.string(), init: z.string() }))
    .query(({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.findMany({
        where: {
          AND: [
            {
              IdNummer: {
                startsWith: input.init,
                equals: `${input.init}${input.IdNummer}`,
              },
            },
          ],
        },
        orderBy: {
          IdNummer: "desc",
        },
        include: {
          _count: {
            select: {
              bandhistorikk: true,
            },
          },
          bandhistorikk: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
    }),

  getCustomerActive: protectedProcedure
    .input(z.object({ init: z.string() }))
    .query(({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.findMany({
        where: {
          AND: [
            {
              active: true,
              IdNummer: { startsWith: input.init },
            },
          ],
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          _count: {
            select: {
              bandhistorikk: true,
            },
          },
          bandhistorikk: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.delete({
        where: {
          id: input.id,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        IdNummer: z.string(),
        type: z.string(),
        deleted: z.boolean(),
        note: z.string(),
        kunde: z.string(),
        side: z.string(),
        active: z.boolean(),
        deleteReason: z.string(),
        produsent: z.string(),
        creatorImg: z.string(),
        deleter: z.string(),
        deleterImg: z.string(),
        artikkel: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
      const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.create({
        data: {
          IdNummer: input.IdNummer,
          type: input.type,
          deleted: false,
          note: input.note,
          userId: ctx.session.user.id,
          creator: creatorName,
          creatorImg: creatorImg,
          kunde: input.kunde,
          createdBy: { connect: { id: ctx.session.user.id } },
          side: input.side,
          active: input.active,
          deleteReason: input.deleteReason,
          produsent: input.produsent,
          deleter: "",
          deleterImg: "",
          artikkel: input.artikkel,
        },
      });
    }),

  editSawblade: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        IdNummer: z.string(),
        type: z.string(),
        deleted: z.boolean(),
        note: z.string(),
        kunde: z.string(),
        side: z.string(),
        active: z.boolean(),
        deleteReason: z.string(),
        produsent: z.string(),
        artikkel: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
      const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.update({
        where: {
          id: input.id,
        },
        data: {
          IdNummer: input.IdNummer,
          type: input.type,
          deleted: input.deleted,
          note: input.note,
          kunde: input.kunde,
          side: input.side,
          active: input.active,
          deleteReason: input.deleteReason,
          produsent: input.produsent,

          artikkel: input.artikkel,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        deleted: z.boolean(),
        id: z.string(),
        deleteReason: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deleterName: string = ctx.session.user.name ?? "DefaultCreator";
      const deleterImg: string = ctx.session.user.image ?? "DefaultCreator";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.update({
        where: {
          id: input.id,
        },
        data: {
          deleted: input.deleted,
          deleteReason: input.deleteReason,
          deleter: deleterName,
          deleterImg: deleterImg,
        },
      });
    }),

  updateStatus: protectedProcedure
    .input(z.object({ active: z.boolean(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.update({
        where: {
          id: input.id,
        },
        data: {
          active: input.active,
        },
      });
    }),
});

// export const postRouter = createTRPCRouter({
//     hello: publicProcedure
//       .input(z.object({ text: z.string() }))
//       .query(({ input }) => {
//         return {
//           greeting: `Hello ${input.text}`,
//         };
//       }),

//      create: protectedProcedure
//      .input(z.object({ serial: z.string(), type: z.string() }))
//      .mutation(({ ctx, input }) => {

//     return ctx.db.sawblades.create({
//         data: {
//             serial: input.serial,
//             type: input.type,
//             userId: ctx.session.user.id,
//         }
//     })

//  })
//  })
