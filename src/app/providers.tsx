"use client";

import {ThemeProvider} from "next-themes";
import {ReactNode} from "react";
import SonnerProvider from "@/providers/SonnerProvider";

export function Providers({children}: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            {children}
            <SonnerProvider/>
        </ThemeProvider>
    );
}