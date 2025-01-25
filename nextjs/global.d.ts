import {
  DefaultErrorShape as OriginalDefaultErrorData
} from "@trpc/server/src/unstable-core-do-not-import/error/formatter";

import {DefaultSession} from "@auth/core/types";
declare module 'next-auth' {
  interface Session {
    user: Omit<DefaultSession['user'], "id">;
  }
}

declare module '@trpc/server/src/unstable-core-do-not-import/error/formatter' {
  export interface DefaultErrorData extends OriginalDefaultErrorData {
    // Add new fields or override existing ones
    extensions?: {
      "validation": Record<string, any>
    };
  }
}