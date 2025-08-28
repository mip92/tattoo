"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbsContextType {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
  clearBreadcrumbs: () => void;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(
  undefined
);

export function BreadcrumbsProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbsState] = useState<BreadcrumbItem[]>([
    { label: "Home", href: "/", isActive: false },
  ]);

  const setBreadcrumbs = useCallback((newBreadcrumbs: BreadcrumbItem[]) => {
    if (
      newBreadcrumbs.length === 0 ||
      (newBreadcrumbs.length === 1 &&
        newBreadcrumbs[0].label === "Home" &&
        newBreadcrumbs[0].href === "/")
    ) {
      setBreadcrumbsState([{ label: "Home", href: "/", isActive: true }]);
    } else {
      const homeBreadcrumb = { label: "Home", href: "/", isActive: false };
      setBreadcrumbsState([homeBreadcrumb, ...newBreadcrumbs]);
    }
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbsState([{ label: "Home", href: "/", isActive: false }]);
  }, []);

  return (
    <BreadcrumbsContext.Provider
      value={{ breadcrumbs, setBreadcrumbs, clearBreadcrumbs }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
}

export function useBreadcrumbs() {
  const context = useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
  }
  return context;
}
