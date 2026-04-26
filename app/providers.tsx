"use client";

import { TeamProvider } from "@/src/context/TeamContext";
import { AppDataProvider } from "@/src/context/AppDataContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TeamProvider>
      <AppDataProvider>{children}</AppDataProvider>
    </TeamProvider>
  );
}
