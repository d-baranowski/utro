import type {Context} from '~/rpc/context';
import {initTRPC, TRPCError} from '@trpc/server';
import superjson from 'superjson';
import userRepository from "~/_section/user/data/repo";
import goCatch from "~/helpers/go-catch";


export const t = initTRPC.context<Context>().create({

  /**
   * @see https://trpc.io/docs/v11/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v11/error-formatting
   */
  errorFormatter(props) {
    const result: any = {...props.shape};
    // @ts-ignore
    if (props?.error?.cause?.validation) {
      result.extensions = {
        // @ts-ignore
        validation: props.error.cause.validation
      }
    }

    return result
  },
});

/**
 * Create a router
 * @see https://trpc.io/docs/v11/router
 */
export const router = t.router;

/**
 * Create an unprotected procedure
 * @see https://trpc.io/docs/v11/procedures
 **/
export const publicProcedure = t.procedure;

/**
 * @see https://trpc.io/docs/v11/merging-routers
 */
export const mergeRouters = t.mergeRouters;

/**
 * Protected base procedure
 */
export const authedProcedure = t.procedure.use(function isAuthed(opts) {
  const user = opts.ctx.session?.user;

  if (!user?.email) {
    throw new TRPCError({code: 'UNAUTHORIZED'});
  }

  return opts.next({
    ctx: {
      user: {
        ...user,
      },
    },
  });
});

export const createCallerFactory = t.createCallerFactory;