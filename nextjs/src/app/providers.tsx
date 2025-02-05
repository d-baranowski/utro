import * as React from "react";
import {SessionProvider} from "next-auth/react";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter";
import ThemeProvider from "~/theme";
import {SidebarProvider} from "~/component/sidebar/context";
import ConfirmProvider from "~/component/confirm-provider";
import {TRPCReactProvider} from "~/rpc/rq-client";
import I18Provider from "~/i18n/i18n-provider";


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
                <I18Provider>
                {children}
                </I18Provider>
              </SidebarProvider>
            </SessionProvider>
          </ConfirmProvider>
        </ThemeProvider>
      </TRPCReactProvider>
    </AppRouterCacheProvider>
  );
}
