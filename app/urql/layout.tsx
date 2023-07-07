"use client";
import { Provider, cacheExchange, fetchExchange } from "urql";

import { SaleorAuthProvider, useAuthChange, useSaleorAuthClient } from "@saleor/auth-sdk/react";
import { useUrqlClient } from "@saleor/auth-sdk/react/urql";

const SaleorURL = "https://demo.saleor.io/graphql/";

export default function Layout({ children }: { children: React.ReactNode }) {
  const useSaleorAuthClientProps = useSaleorAuthClient({
    saleorApiUrl: SaleorURL,
  });

  const { urqlClient, reset, refetch } = useUrqlClient({
    url: SaleorURL,
    fetch: useSaleorAuthClientProps.saleorAuthClient.fetchWithAuth,
    exchanges: [cacheExchange, fetchExchange],
  });

  useAuthChange({
    saleorApiUrl: SaleorURL,
    onSignedOut: () => reset(),
    onSignedIn: () => refetch(),
  });

  return (
    <SaleorAuthProvider {...useSaleorAuthClientProps}>
      <Provider value={urqlClient}>
        {children}
      </Provider>
    </SaleorAuthProvider>
  );
}