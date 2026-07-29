"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  items: [],
  setItems: () => {},
});

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [items, setItemsState] = useState<BreadcrumbItem[]>([]);

  const setItems = useCallback((newItems: BreadcrumbItem[]) => {
    setItemsState(newItems);
  }, []);

  return (
    <BreadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

/**
 * Hook to set breadcrumb items from any admin page.
 * 
 * Usage:
 * ```tsx
 * const { setItems } = useBreadcrumb();
 * useEffect(() => {
 *   setItems([
 *     { label: 'Manajemen Buku', href: '/admin/books' },
 *     { label: 'Buku', href: '/admin/books' },
 *     { label: 'Menari di Atas Awan' },
 *   ]);
 * }, []);
 * ```
 */
export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}
