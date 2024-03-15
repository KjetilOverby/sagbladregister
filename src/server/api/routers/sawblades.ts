// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
export const sawbladesRouter = createTRPCRouter({


  columns: protectedProcedure
  .input(z.object({ type: z.boolean(), id: z.boolean(), createdAt: z.boolean(), updatedAt: z.boolean(), kunde: z.boolean(), IdNummer: z.boolean(), creator: z.boolean(), side: z.boolean(), note: z.boolean(), active: z.boolean(), deleted: z.boolean(), deleteReason: z.boolean(), produsent: z.boolean(), deleter: z.boolean(), deleterImg: z.boolean(), creatorImg: z.boolean(), createdById: z.boolean(), userId: z.boolean(), userId: z.boolean(), date: z.string(), date2: z.string(), artikkel: z.boolean() }))
  .query(async ({ ctx, input }) => {
    console.log(input);
    const total = await ctx.db.sawblades.findMany({
      where: {
        createdAt: {
          lte: new Date(input.date),
          gte: new Date(input.date2),
        }
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
    });
    return total;
  }),

  countAllBlades: protectedProcedure
  .query(async ({ ctx }) => {
    const total = await ctx.db.sawblades.count({});
    const deleted = await ctx.db.sawblades.count({ where: { deleted: true } });
    const notDeleted = await ctx.db.sawblades.count({ where: { deleted: false } });

    return { total, deleted, notDeleted };
  }),

  
  countSawblades: protectedProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.sawblades.groupBy({
 by : ['deleted', 'side', 'type'],
 _count:  true,
    });
  
    return count;
  }),




  getAllCreate: protectedProcedure
  .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string()}))
      .query(({ ctx, input }) => {
       return ctx.db.sawblades.findMany({
    
        where: {
          AND: [{
            createdAt: {
             lte: new Date(input.date),
             gte: new Date(input.date2),
            },
            IdNummer: {contains: input.IdNummer ? input.IdNummer : undefined},
          }]
        },
        orderBy: {
          IdNummer: 'desc'
                        },
     
       })
    }),

    getAll: protectedProcedure
    .input(z.object({IdNummer: z.string()}))
        .query(({ ctx, input }) => {
         return ctx.db.sawblades.findMany({
          take: 5,
          where: {
            AND: [{
            
              IdNummer: input.IdNummer,
            }]
          },
          orderBy: {
            IdNummer: 'desc'
                          },
            include: {
              _count: {
                select: {
                  bandhistorikk: true,
                },
              },
              bandhistorikk: {
                orderBy: {
                  createdAt: 'asc'
                }
              },
            },
         })
      }),



    getAllService: protectedProcedure
   
        .query(({ ctx }) => {
         return ctx.db.sawblades.findMany({
          
          where: {
           active: true
          },
          orderBy: {
            updatedAt: 'desc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              select: {
                                service: true
                              },
                              orderBy: {
                                updatedAt: 'desc'
                              },
                              take: 1
                            },
                          },
         
         })
      }),


   

      
    getAllDeleted: protectedProcedure
    .input(z.object({ date2: z.string(), date: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          
          where: {
            AND: [{
              updatedAt: {
                lte: new Date(input.date),
                gte: new Date(input.date2),
               },
              deleted: true,
              
            }]
          },
          orderBy: {
            updatedAt: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),

      getActive: protectedProcedure
      .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(), init: z.string()}))
          .query(({ ctx, input }) => {
           // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
           return ctx.db.sawblades.findMany({
            where: {
              AND: [{
               
                active: true,
                 IdNummer: {startsWith: input.init},
              }]
            },
            orderBy: {
              IdNummer: 'asc'
                            },
                            include: {
                              _count: {
                                select: {
                                  bandhistorikk: true,
                                },
                              },
                              bandhistorikk: {
                                orderBy: {
                                  createdAt: 'asc'
                                }
                              },
                            },
           })
        }),


        // ************************* CUSTOMERS *****************************////////

        countSawbladesCustomer: protectedProcedure
        .input(z.object({ init: z.string()})).
        query(async ({ ctx, input }) => {
          const count = await ctx.db.sawblades
            .groupBy({
              by: ['deleted', 'side', 'type'],
              _count: true,
              where: {
                IdNummer: {
                  startsWith: input.init
                }
              }
            });
          
          return count;
        }),
        countAllBladesCustomer: protectedProcedure
        .input(z.object({ init: z.string()}))
        .query(async ({ ctx, input }) => {
          const total = await ctx.db.sawblades.count({ where: { IdNummer: { startsWith: input.init } } });
          const deleted = await ctx.db.sawblades.count({ where: { IdNummer: { startsWith: input.init }, deleted: true } });
          const notDeleted = await ctx.db.sawblades.count({ where: { IdNummer: { startsWith: input.init }, deleted: false } });
      
          return { total, deleted, notDeleted };
        }),

    getCustomerAllDeleted: protectedProcedure
    .input(z.object({date: z.string(), date2: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
              updatedAt: {
               lte: new Date(input.date),
               gte: new Date(input.date2),
              },
              deleted: true,
              IdNummer: {startsWith: input.init},
            }]
          },
          orderBy: {
            updatedAt: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),

  


   
    getCustomer: protectedProcedure
    .input(z.object({ IdNummer: z.string(), init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
            
              IdNummer: {
                startsWith: input.init,
                equals: `${input.init}${input.IdNummer}`
              
              }
            }]
          },
          orderBy: {
            IdNummer: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),
   
    getCustomerActive: protectedProcedure
    .input(z.object({ init: z.string()}))
        .query(({ ctx, input }) => {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
         return ctx.db.sawblades.findMany({
          where: {
            AND: [{
             
              active: true,
               IdNummer: {startsWith: input.init},
            }]
          },
          orderBy: {
            IdNummer: 'asc'
                          },
                          include: {
                            _count: {
                              select: {
                                bandhistorikk: true,
                              },
                            },
                            bandhistorikk: {
                              orderBy: {
                                createdAt: 'asc'
                              }
                            },
                          },
         })
      }),
 

   delete: protectedProcedure.input(z.object({id: z.string()}))
    .mutation(async ({ctx, input}) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        return ctx.db.sawblades.delete({
            where: {
                id: input.id
            },
        });
    }),

    
      create: protectedProcedure
      .input(z.object({ IdNummer: z.string(), type: z.string(), deleted: z.boolean(), note: z.string(), kunde: z.string(), side: z.string(), active: z.boolean(), deleteReason: z.string(), produsent: z.string(), creatorImg: z.string(), deleter: z.string(), deleterImg: z.string(), artikkel: z.string() }))
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
             createdBy: { connect: { id: ctx.session.user.id} },
             side: input.side,
             active: input.active,
             deleteReason: input.deleteReason,
             produsent: input.produsent,
             deleter: '',
             deleterImg: '',
             artikkel: input.artikkel
         },
     })
  }),

  
  update: protectedProcedure.input(z.object({deleted: z.boolean(), id: z.string(), deleteReason: z.string()}))
  .mutation(async ({ctx, input}) => {
    const deleterName: string = ctx.session.user.name ?? "DefaultCreator";
    const deleterImg: string = ctx.session.user.image ?? "DefaultCreator";
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.update({
          where: {
              id: input.id
          },
          data: {
              deleted: input.deleted,
              deleteReason: input.deleteReason,
              deleter: deleterName,
              deleterImg: deleterImg
          
          }
      });
  }),


  updateStatus: protectedProcedure.input(z.object({active: z.boolean(), id: z.string()}))
  .mutation(async ({ctx, input}) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.sawblades.update({
          where: {
              id: input.id
          },
          data: {
              active: input.active,
          
          }
      });
  }),


})


 

 

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


