import React from "react";
import { PublicLayout } from "@/layouts/PublicLayout";

export default function PublicRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicLayout>
      {children}
    </PublicLayout>
  );
}
