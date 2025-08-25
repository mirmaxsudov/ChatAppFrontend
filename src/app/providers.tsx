"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import SonnerProvider from "@/providers/SonnerProvider";
import QueryProvider from "@/providers/QueryProvider";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
                {children}
                <SonnerProvider />
            </ThemeProvider>
        </QueryProvider>
    );
}