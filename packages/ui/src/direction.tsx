"use client";

import { createContext, useContext, type ReactNode } from "react";

type Direction = "ltr" | "rtl";

const DirectionCtx = createContext<Direction>("ltr");

export function DirectionProvider({
  direction = "ltr",
  children,
}: {
  direction?: Direction;
  children: ReactNode;
}) {
  return (
    <DirectionCtx.Provider value={direction}>
      <div dir={direction}>{children}</div>
    </DirectionCtx.Provider>
  );
}

export function useDirection(): Direction {
  return useContext(DirectionCtx);
}
