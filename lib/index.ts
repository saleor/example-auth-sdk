import { cacheExchange, createClient, fetchExchange } from "urql";
import { createSaleorAuthClient } from "@saleor/auth-sdk";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const saleorApiUrl = "https://demo.saleor.io/graphql/";

// Saleor Client
export const saleorAuthClient = createSaleorAuthClient({ saleorApiUrl });

// Apollo Client
const httpLink = createHttpLink({
  uri: saleorApiUrl,
  fetch: saleorAuthClient.fetchWithAuth,
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// urql Client Factory for revalidation during logout
export const makeUrqlClient = () => createClient({
  url: saleorApiUrl,
  fetch: saleorAuthClient.fetchWithAuth,
  exchanges: [cacheExchange, fetchExchange],
})