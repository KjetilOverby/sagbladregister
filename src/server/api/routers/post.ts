// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getTableSizes: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.$queryRaw`
      SELECT 
          table_schema AS database_name,
          table_name,
          ROUND(data_length / 1024 / 1024, 2) AS data_size_mb,
          ROUND(index_length / 1024 / 1024, 2) AS index_size_mb,
          ROUND((data_length + index_length) / 1024 / 1024, 2) AS total_size_mb
      FROM information_schema.tables
      WHERE table_schema = DATABASE()
      ORDER BY total_size_mb DESC;
    `;
  }),
});
