"use client";

import { SaleorAuthProvider, useAuthChange, useSaleorAuthClient } from "@saleor/auth-sdk/react";
import { ApolloProvider } from "@apollo/client";
import { useAuthenticatedApolloClient } from "@saleor/auth-sdk/react/apollo";

const SaleorURL = "https://demo.saleor.io/graphql/";

export default function Layout({ children }: { children: React.ReactNode }) {
  const saleorAuth = useSaleorAuthClient({ saleorApiUrl: SaleorURL });

  const { apolloClient, reset, refetch } = useAuthenticatedApolloClient({
    uri: SaleorURL,
    fetchWithAuth: saleorAuth.saleorAuthClient.fetchWithAuth,
  });

  useAuthChange({
    saleorApiUrl: SaleorURL,
    onSignedOut: () => reset(),
    onSignedIn: () => refetch(),
  });

  return (
    <SaleorAuthProvider {...saleorAuth}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </SaleorAuthProvider>
  )
}
