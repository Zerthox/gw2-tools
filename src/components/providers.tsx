"use client";
import { APILanguageProvider } from "@discretize/gw2-ui-new";

export function Providers({ children }: { children: React.ReactNode }) {
    return <APILanguageProvider value="en">{children}</APILanguageProvider>;
}
