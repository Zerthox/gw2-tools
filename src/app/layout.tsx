import { Metadata } from "next";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Providers } from "@/components/providers";
import { theme } from "@/theme";
import { site } from "@/metadata";

import { Roboto } from "next/font/google";
import "@discretize/gw2-ui-new/dist/index.css";
import "@discretize/gw2-ui-new/dist/default_style.css";
import "./global.css";

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className={roboto.className} suppressHydrationWarning>
            <body>
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Providers>{children}</Providers>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: site.title,
    applicationName: site.shortTitle,
    description: site.description,
    authors: site.author,
};
