import {auth} from "~/auth";
import {User} from "~/_section/user/data/schema";
import userRepository from "~/_section/user/data/repo";
import goCatch from "~/helpers/go-catch";
import {errorLog} from "@log";
import {headers} from "next/headers";

/**
 * Creates context for an incoming request
 * @see https://trpc.io/docs/v11/context
 */
export const createContext = async (/*opts: CreateNextContextOptions */) => {
  const session = await auth();

  let usr: User | undefined | null
  if (session?.user?.email) {
    const [u, err] = await goCatch(userRepository.findByEmail(session.user.email))
    if (err) {
      errorLog({msg: "failed to fetch user in context", error: err})
    }
    usr = u;
  }

  const _headers = new Headers(await headers());
  _headers.set('x-trpc-source', 'client-side-call');

  return {
    session,
    dbUser: usr,
    headers: Object.fromEntries(_headers),
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;