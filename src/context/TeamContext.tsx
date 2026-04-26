"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

export type Team = {
  id: string;
  name: string;
  meta: string;
};

type TeamContextType = {
  activeTeamId: string;
  setActiveTeamId: (teamId: string) => void;
  teams: Team[];
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const teams: Team[] = [
  { id: "team-1", name: "Studio Team", meta: "9 active collaborators" },
  { id: "team-2", name: "Northwind Ops", meta: "5 active collaborators" },
  { id: "team-3", name: "Client Review", meta: "3 active collaborators" },
];

export function TeamProvider({ children }: { children: ReactNode }) {
  const [activeTeamId, setActiveTeamId] = useState("team-1");

  return (
    <TeamContext.Provider value={{ activeTeamId, setActiveTeamId, teams }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}
