import "~/styles/globals.css";
import {Metadata, Viewport} from "next";
import {getLocale} from 'next-intl/server';
import {Providers} from "./providers";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {requireValidUser} from "~/auth/require-valid-user";


export const metadata: Metadata = {
  title: {
    default: "utro",
    template: `%s - utro`,
  },
  description: "Utro Description",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
};

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  await requireValidUser();

  return (
    <html suppressHydrationWarning lang={locale}>
    <head><title>Utro</title></head>
    <body>
    <Providers>
      <div>
        <main>
          {children}
        </main>
      </div>
    </Providers>
    </body>
    </html>
  );
}
