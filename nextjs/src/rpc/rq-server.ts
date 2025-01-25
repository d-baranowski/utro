import 'server-only';

import {createHydrationHelpers} from '@trpc/react-query/rsc';
import {cache} from 'react';
import {createQueryClient} from './shared';
import {Context, createContext} from "~/rpc/context";
import {createCallerFactory} from "~/rpc/_init";
import {AppRouter, appRouter} from "~/rpc/_app-router";

const createServerContext = cache(async (): Promise<Context> => {
  const baseCtx = await createContext();
  baseCtx.headers['x-trpc-source'] = 'server-side-call';
  return baseCtx;
});

/**
 * Create a stable getter for the query client that
 * will return the same client during the same request.
 */
export const getQueryClient = cache(createQueryClient);
const caller = createCallerFactory(appRouter)(createServerContext);

export const {trpc, HydrateClient} = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
