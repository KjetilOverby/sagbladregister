import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { sawbladesRouter } from "~/server/api/routers/sawblades";
import { bandhistorikkRouter } from "~/server/api/routers/bandhistorikk";
import { statistikkBladeDataRouter } from "~/server/api/routers/statistikkBladeData";
import { userRouter } from "~/server/api/routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  sawblades: sawbladesRouter,
  bandhistorikk: bandhistorikkRouter,
  statistikkBladeData: statistikkBladeDataRouter,
  users: userRouter,
  
});

// export type definition of API
export type AppRouter = typeof appRouter;
