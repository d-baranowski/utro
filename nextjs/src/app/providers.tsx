import * as React from "react";
import {SessionProvider} from "next-auth/react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import ThemeProvider from "~/theme";
import {SidebarProvider} from "~/component/sidebar/context";
import ConfirmProvider from "~/component/confirm-provider";
import {TRPCReactProvider} from "~/rpc/rq-client";


export interface ProvidersProps {
  children: React.ReactNode;
}

export async function Providers({children}: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <TRPCReactProvider>
        <ThemeProvider>
          <ConfirmProvider>
            <SessionProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </SessionProvider>
          </ConfirmProvider>
        </ThemeProvider>
      </TRPCReactProvider>
    </AppRouterCacheProvider>
  );
}
