import React from "react";
import { StoreLayout } from "@/layouts/StoreLayout";
import { MidtransScript } from "@/components/MidtransScript";

export default function StoreRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StoreLayout>
        {children}
      </StoreLayout>
      <MidtransScript />
    </>
  );
}
