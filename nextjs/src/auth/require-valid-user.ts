import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {auth, signIn} from "~/auth";
import {trpc} from "~/rpc/rq-server";


export async function requireValidUser() {
  const me = await trpc.whoAmI()
  if (!me.session) {
    await signIn();
  }

  const currentPath = await headers().then(h => {
    return h.get('x-current-path')
  });

  if (currentPath?.startsWith('/organisation/setup')) {
    return;
  }

  const organisations = await trpc.organisation.getMyOrganisations();
  if (!organisations?.length) {
    let queryParam = "";

    if (currentPath && currentPath !== '/') {
      queryParam = `?redirect=${encodeURIComponent(currentPath)}`
    }

    redirect(`/organisation/setup${queryParam}`);
  }
}