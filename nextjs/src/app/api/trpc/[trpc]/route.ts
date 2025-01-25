import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import {appRouter} from "~/rpc/_app-router";
import {createContext} from "~/rpc/context";

// Add back once NextAuth v5 is released
// export const runtime = 'edge';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
