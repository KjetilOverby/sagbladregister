
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
export const statistikkBladeDataRouter = createTRPCRouter({
 

  getMonthlyHistoryStats: protectedProcedure
  .query(async ({ ctx }) => {
    try {
      // Hent alle historikkposter (inkludert slettede og aktive)
      const history = await ctx.db.bandhistorikk.findMany({
        select: {
          createdAt: true,
          service: true,  // Hent service for å gruppere etter
        },
      });

      // Funksjon for å gruppere data etter år og måned
      const groupByMonthAndService = (history: { createdAt: Date; service: string }[]) => {
        return history.reduce((acc, entry) => {
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
        }, {} as Record<string, { reparasjon: number; omlodding: number; reklamasjon: number }>);
      };

      // Gruppér og tell månedlige service-statistikker
      const monthlyHistoryStats = groupByMonthAndService(history);

      // Omformater til en liste for enklere håndtering i frontend
      const monthlyStats = Object.keys(monthlyHistoryStats).map((yearMonth) => ({
        yearMonth,
        ...monthlyHistoryStats[yearMonth],
      }));

      return monthlyStats;
    } catch (error) {
      console.error("Feil ved henting av historikk-statistikk:", error);
      throw new Error("Kunne ikke hente historikk-statistikk");
    }
  }),


  getMonthlyHistoryStatsCustomer: protectedProcedure
  .input(z.object({init: z.string(),}))
  .query(async ({ input, ctx }) => {
    try {
      // Hent alle historikkposter (inkludert slettede og aktive)
      const history = await ctx.db.bandhistorikk.findMany({
        where: {
          bladeRelationId: { startsWith: input.init},
        },
        select: {
          createdAt: true,
          service: true,  // Hent service for å gruppere etter
        },
      });

      // Funksjon for å gruppere data etter år og måned
      const groupByMonthAndService = (history: { createdAt: Date; service: string }[]) => {
        return history.reduce((acc, entry) => {
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
        }, {} as Record<string, { reparasjon: number; omlodding: number; reklamasjon: number }>);
      };

      // Gruppér og tell månedlige service-statistikker
      const monthlyHistoryStats = groupByMonthAndService(history);

      // Omformater til en liste for enklere håndtering i frontend
      const monthlyStats = Object.keys(monthlyHistoryStats).map((yearMonth) => ({
        yearMonth,
        ...monthlyHistoryStats[yearMonth],
      }));

      return monthlyStats;
    } catch (error) {
      console.error("Feil ved henting av historikk-statistikk:", error);
      throw new Error("Kunne ikke hente historikk-statistikk");
    }
  }),



    getAllHistorikk: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.findMany({
          where: {
              createdAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
             
          },
          orderBy: {
            createdAt: 'desc'
                          }
         })
      }),
   
    getAllHistorikkUpdate: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.findMany({
          where: {
              updatedAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              
          },
          orderBy: {
            updatedAt: 'desc'
                          }
         })
      }),
    getAllHistorikkKS: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.findMany({
          where: {
              datoSrv: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
          },
          orderBy: {
            datoSrv: 'desc'
                          }
         })
      }),


      getAllToothCount: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string()}))
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
              antTannslipp: true
            }
           })
        }),

        reklamasjonTypes: protectedProcedure
        .input(z.object({date: z.string(), date2: z.string()}))
            .query(({ ctx, input }) => {
             return ctx.db.bandhistorikk.groupBy({
              by: ['feilkode'],
              where: {
                AND: [{
                  updatedAt: {
                   lte: new Date(input.date),
                   gte: new Date(input.date2),
                  },
               
                }]
              },
              _count: {
                feilkode: true,
              }
             })
          }),

          serviceTypesCount: protectedProcedure
  .input(z.object({date: z.string(), date2: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.bandhistorikk.groupBy({
      by: ['service'],
      where: {
        AND: [{
          updatedAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
        }]
      },
      _count: {
        service: true,
      }
    })
  }),
          serviceTypesCountCustomer: protectedProcedure
  .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.bandhistorikk.groupBy({
      by: ['service'],
      where: {
        AND: [{
          updatedAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
          bladeRelationId: { startsWith: input.init},
        }]
      },
      _count: {
        service: true,
      }
    })
  }),

          handlingServiceData: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string()}))
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
        }
      });
  
      const handlingCounts = {};
  
      handlingData.forEach(data => {
        const handlings = data.handling.split(', ');
        handlings.forEach(handling => {
          if (handling in handlingCounts) {
            handlingCounts[handling]++;
          } else {
            handlingCounts[handling] = 1;
          }
        });
      });
  
      return handlingCounts;
    }),

          

    
// ****************** CUSTOMERS ****************** //
      
    getAllCustomerHistorikk: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), bladeRelationId: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.findMany({
          where: {
            AND: [{
              createdAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init},
            }]
          },
          orderBy: {
            createdAt: 'desc'
                          }
         })
      }),

      getAllHistorikkUpdateCustomer: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.bandhistorikk.findMany({
            where: {
              AND: [{
                updatedAt: {
                 lte: new Date(input.date),
                 gte: new Date(input.date2),
                },
                bladeRelationId: { startsWith: input.init},
               
              }],
              
            },
            orderBy: {
              updatedAt: 'desc'
                            }
            
           })
        }),

        getAllHistorikkKSCustomer: protectedProcedure
        .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
            .query(({ ctx, input }) => {
             return ctx.db.bandhistorikk.findMany({
              where: {
                AND: [{
                  datoSrv: {
                   lte: new Date(input.date),
                   gte: new Date(input.date2),
                  },
                  bladeRelationId: { startsWith: input.init},
                }]
              },
              orderBy: {
                datoSrv: 'desc'
                              }
             })
          }),

     reklamasjonTypesCustomer: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.groupBy({
          by: ['feilkode'],
          where: {
            AND: [{
              updatedAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              bladeRelationId: { startsWith: input.init},
            }]
          },
          _count: {
            feilkode: true,
          }
         })
      }),
   
   

 


      getAllCustomerToothCount: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.bandhistorikk.aggregate({
            where: {
              AND: [{
                updatedAt: {
                 lte: new Date(input.date),
                 gte: new Date(input.date2),
                },
                bladeRelationId: { startsWith: input.init},
              }]
            },
            _sum: {
              antRep: true,
              antTannslipp: true
            }
           })
        }),

        handlingServiceDataCustomer: protectedProcedure
        .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
        .query(async ({ ctx, input }) => {
          const handlingData = await ctx.db.bandhistorikk.findMany({
            select: {
              handling: true,
            },
            where: {
              AND: [{
                updatedAt: {
                 lte: new Date(input.date),
                 gte: new Date(input.date2),
                },
                bladeRelationId: { startsWith: input.init},
              }]
            }
          });
      
          const handlingCounts = {};
      
          handlingData.forEach(data => {
            const handlings = data.handling.split(', ');
            handlings.forEach(handling => {
              if (handling in handlingCounts) {
                handlingCounts[handling]++;
              } else {
                handlingCounts[handling] = 1;
              }
            });
          });
      
          return handlingCounts;
        }),
    
    
 


})


 
