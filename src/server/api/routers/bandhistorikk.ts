// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
export const bandhistorikkRouter = createTRPCRouter({


    

    columns: protectedProcedure
    .input(z.object({ id: z.boolean(), historikkId: z.boolean(), createdAt: z.boolean(), updatedAt: z.boolean(), userId: z.boolean(),service: z.boolean(), datoInn: z.boolean(), klInn: z.boolean(), datoUt: z.boolean(), klUt: z.boolean(), sagtid: z.boolean(), feilkode: z.boolean(), temperatur: z.boolean(), sideklaring: z.boolean(), ampere: z.boolean(), stokkAnt: z.boolean(), anmSag: z.boolean(), creator: z.boolean(), creatorImg: z.boolean(), anmKS: z.boolean(), sgSag: z.boolean(), sgKS: z.boolean(), handling: z.boolean(), side: z.boolean(), bladType: z.boolean(), datoSrv: z.boolean(), activePost: z.boolean(), bladeRelationId: z.boolean(), alt: z.boolean(), creator2: z.boolean(), creatorImg2: z.boolean(), creator3: z.boolean(), creatorImg3: z.boolean(), date: z.string(), date2: z.string(), antRep: z.boolean(), antTannslipp: z.boolean()}))
    .query(async ({ ctx, input }) => {
      const total = await ctx.db.bandhistorikk.findMany({
        where: {
          createdAt: {
            lte: new Date(input.date),
            gte: new Date(input.date2),
          }
        },
        select: {
            id: input.id,
            historikkId: input.historikkId,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            userId: input.userId,
            service: input.service,
            datoInn: input.datoInn,
            klInn: input.klInn,
            klUt: input.klUt,
            datoUt: input.datoUt,
            ampere: input.ampere,
            feilkode: input.feilkode,
            sideklaring: input.sideklaring,
            anmSag: input.anmSag,
            temperatur: input.temperatur,
            creator: input.creator,
            userId: input.userId,
            sagtid: input.sagtid,
            sgSag: input.sgSag,
            anmKS: input.anmKS,
            handling: input.handling,
            datoSrv: input.datoSrv,
            sgKS: input.sgKS,
            creatorImg: input.creatorImg,
            side: input.side,
            bladType: input.bladType,
            activePost: input.activePost,
            bladeRelationId: input.bladeRelationId,
            alt: input.alt,
            creator2: input.creator2,
            creatorImg2: input.creatorImg2,
            creator3: input.creator3,
            creatorImg3: input.creatorImg3,
            stokkAnt: input.stokkAnt,
            antRep: input.antRep,
            antTannslipp: input.antTannslipp,
          
        },
      });
  
  
      return total;
    }),

    
      create: protectedProcedure
      .input(z.object({ service: z.string(), datoInn: z.date(), klInn: z.date(), klUt: z.date(), datoUt: z.date(),ampere: z.number(), feilkode: z.string(), anmSag: z.string(), temperatur: z.number(), userId: z.string(),  handling: z.string(), sideklaring: z.number(), sgSag: z.string(), datoSrv: z.date(),createdById: z.string(), bladedata: z.string(), anmKS: z.string(), createdBy: z.string(), sagtid:z.number(), sgKS: z.string(), creatorImg: z.string(), side: z.string(), bladType: z.string(), activePost: z.boolean(), bladeRelationId: z.string(), alt: z.string(), creator: z.string(), creator2: z.string(), creatorImg2: z.string(), creator3: z.string(), creatorImg3: z.string(), antRep: z.number(), antTannslipp: z.number(), stokkAnt: z.number()}))
      .mutation(({ ctx, input }) => {
        const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";

        
    
     return ctx.db.bandhistorikk.create({
         data: {
             service: input.service,
             datoInn: input.datoInn,
             datoUt: input.datoUt,
             klInn: input.klInn,
             klUt: input.klUt,
             ampere: input.ampere,
             feilkode: input.feilkode,
             sideklaring: input.sideklaring,
             anmSag: input.anmSag,
             temperatur: input.temperatur,
             creator: creatorName,
             userId: '',
             sagtid: input.sagtid,
             sgSag: input.sgSag,
             anmKS: input.anmKS,
             handling: input.handling,
             datoSrv: input.datoSrv,
             sgKS: input.sgKS,
             createdBy: { connect: { id: ctx.session.user.id} },
             bladedata: { connect: { id: input.bladedata} },
             creatorImg: creatorImg,
             side: input.side,
             bladType: input.bladType,
             activePost: input.activePost,
             bladeRelationId: input.bladeRelationId,
             alt: input.alt,
             creator2: '',
             creatorImg2: '',
             creator3: '',
             creatorImg3: '',
             stokkAnt: 0,
             antRep: 0,
             antTannslipp: 0,
             updatedAt: new Date(0),

             

         },
       
     })

     
 
  }),
  delete: protectedProcedure.input(z.object({id: z.string()}))
  .mutation(async ({ctx, input}) => {
      return ctx.db.bandhistorikk.delete({
          
          where: {
              id: input.id
          },
      });
  }),
  update: protectedProcedure.input(z.object({ id: z.string(), activePost: z.boolean(), datoInn: z.date(), klInn: z.date(), klUt: z.date(), datoUt: z.date(), feilkode: z.string(), temperatur: z.number(), anmSag: z.string(), sgSag: z.string(), sagtid: z.number(), service: z.string(), creator2: z.string(), creatorImg2: z.string(), ampere: z.number()}))
  .mutation(async ({ctx, input}) => {
    const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
    const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
      return ctx.db.bandhistorikk.update({
          where: {
              id: input.id
          },
          data: {
             
              activePost: input.activePost,
              datoInn: input.datoInn,
              klInn: input.klInn,
              klUt: input.klUt,
              datoUt: input.datoUt,
              feilkode: input.feilkode,
              temperatur: input.temperatur,
              anmSag: input.anmSag,
              sgSag: input.sgSag,
              sagtid: input.sagtid,
              service: input.service,
              creator2: creatorName,
              creatorImg2: creatorImg,
              ampere: input.ampere,
              updatedAt: new Date(),
            
            
            
          
          }
      });
  }),
 

  updateKS: protectedProcedure.input(z.object({anmKS: z.string(), id: z.string(), handling: z.string(), sgKS: z.string(), datoSrv: z.date(), sideklaring: z.number(), creator3: z.string(), creatorImg3: z.string(), activePost: z.boolean(), antRep: z.number(), antTannslipp: z.number()}))
  .mutation(async ({ctx, input}) => {
    const creatorName: string = ctx.session.user.name ?? "DefaultCreator";
        const creatorImg: string = ctx.session.user.image ?? "DefaultCreator";
      return ctx.db.bandhistorikk.update({
          where: {
              id: input.id
          },
          data: {
              anmKS: input.anmKS,
              handling: input.handling,
              sgKS: input.sgKS,
              datoSrv: input.datoSrv,
              sideklaring: input.sideklaring,
              creator3: creatorName,
              creatorImg3: creatorImg,
              activePost: false,
              antRep: input.antRep,
              antTannslipp: input.antTannslipp,
            
            
          
          }
      });
  }),



 
})




 

 


