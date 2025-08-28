import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// GraphQL endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Auth link to add token to headers
const authLink = setContext((_, { headers }) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          productsWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction("products"),
          },
          brandsWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction("brands"),
          },
          boxTypesWithPagination: {
            keyArgs: ["query", ["search"]],
            merge: createPaginationMergeFunction("box types"),
          },
        },
      },
    },
  }),
  ssrMode: typeof window === "undefined",
});

interface PaginationData {
  rows: unknown[];
  total: number;
}

function createPaginationMergeFunction(type: string) {
  return (
    existing: PaginationData = { rows: [], total: 0 },
    incoming: PaginationData
  ) => {
    console.log(`Apollo cache merge for ${type}:`, { existing, incoming });

    if (incoming.rows.length > 0 && existing.rows.length === 0) {
      console.log(`First request for ${type}, returning incoming data`);
      return incoming;
    }

    if (existing.rows.length >= incoming.total) {
      console.log(`Already have all data for ${type}, returning existing`);
      return existing;
    }

    const merged = {
      total: incoming.total,
      rows: [...existing.rows, ...incoming.rows],
    };
    console.log(`Merged data for ${type}:`, merged);
    return merged;
  };
}

// Auth types
export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  username?: string;
}
