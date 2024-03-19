
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";
export const statistikkBladeDataRouter = createTRPCRouter({
 

   
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
         })
      }),


      getAllToothCount: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string()}))
          .query(({ ctx, input }) => {
           return ctx.db.bandhistorikk.aggregate({
            where: {
            
                createdAt: {
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
                  createdAt: {
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
              }]
            },
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
             })
          }),

     reklamasjonTypesCustomer: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.bandhistorikk.groupBy({
          by: ['feilkode'],
          where: {
            AND: [{
              createdAt: {
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


 
