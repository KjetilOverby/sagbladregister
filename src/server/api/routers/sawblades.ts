// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
export const sawbladesRouter = createTRPCRouter({






  getRetipStats: protectedProcedure
  .query(async ({ ctx }) => {
    try {
      // Hent alle blader som ikke er slettet (deleted: false), og inkluder bladType og service fra bandhistorikk
      const activeBlader = await ctx.db.sawblades.findMany({
        where: {
          deleted: false,  // Filtrering for å hente blader som ikke er slettet
        },
        include: {
          bandhistorikk: {
            select: {
              service: true,  // Hent kun service fra bandhistorikk
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
          IdNummer: {startsWith: input.init} 
        },
        include: {
          bandhistorikk: {
            select: {
              service: true,  // Hent kun service fra bandhistorikk
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
  .input(z.object({
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
    orderBy: z.object({
      field: z.string(),
      direction: z.enum(['asc', 'desc']),
    }).optional(),
  }))
  .query(async ({ ctx, input }) => {
   

    // Define default orderBy if not provided
    const orderBy = input.orderBy
      ? { [input.orderBy.field]: input.orderBy.direction }
      : { deleteReason: 'asc' };

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
      orderBy,
    });
    
    return total;
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
          createdAt: 'desc'
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
                  createdAt: 'desc'
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
                                service: true,
                                feilkode: true
                              },
                              orderBy: {
                                updatedAt: 'desc'
                              },
                              take: 15
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
            updatedAt: 'desc'
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
              updatedAt: 'desc'
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


        getAllCreateCustomer: protectedProcedure
  .input(z.object({date: z.string(), date2: z.string(), IdNummer: z.string(), init: z.string()}))
  .query(({ ctx, input }) => {
    return ctx.db.sawblades.findMany({
      where: {
        AND: [{
          createdAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          },
          IdNummer: {
            startsWith: input.init,
            contains: input.IdNummer,
          }
        }]
      },
      orderBy: {
       createdAt: 'desc'
      },
    })
  }),

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
            updatedAt: 'desc'
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
                                createdAt: 'desc'
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
            updatedAt: 'desc'
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


     editSawblade: protectedProcedure
      .input(z.object({id: z.string(), IdNummer: z.string(), type: z.string(), deleted: z.boolean(), note: z.string(), kunde: z.string(), side: z.string(), active: z.boolean(), deleteReason: z.string(), produsent: z.string(), artikkel: z.string() }))
      .mutation(({ ctx, input }) => {
        const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
    
     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
     return ctx.db.sawblades.update({
      where: {
        id: input.id
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


