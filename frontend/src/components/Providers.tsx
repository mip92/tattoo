"use client";

import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/graphql";
import { AuthProvider } from "@/contexts/AuthContext";
import { BreadcrumbsProvider } from "@/contexts/BreadcrumbsContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BreadcrumbsProvider>{children}</BreadcrumbsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
