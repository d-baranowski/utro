import {HydrateClient, trpc} from "~/rpc/rq-server";

export default async function Home() {
  return (
    <HydrateClient>
      <div>Hello World</div>
    </HydrateClient>
  );
}
