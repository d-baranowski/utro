import {userRouter} from "~/_section/user/data/router";
import {publicProcedure, router} from './_init';
import organisationRouter from "~/_section/organisation/data/router";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  whoAmI: publicProcedure.query(({ctx}) => {
    return {
      session: ctx?.session,
      dbUser: ctx?.dbUser,
    }
  }),
  user: userRouter,
  organisation: organisationRouter,
});

export type AppRouter = typeof appRouter;



