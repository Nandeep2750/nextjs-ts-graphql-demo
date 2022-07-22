import { useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import { getSession } from "next-auth/react";
let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphLink() {
    return new HttpLink({
        uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
    });
}
const authLink = setContext(async (_, { headers }) => {
    const isSSR = typeof window === "undefined";
    const token = !isSSR && (await getSession())?.token;

    return {
        headers: {
            ...headers,
            ...(!isSSR && { authorization: token ? `Bearer ${token}` : "" }),
        },
    };
});

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: authLink.concat(createIsomorphLink()),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(
    initialState: NormalizedCacheObject | null = null
) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache);

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null) {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}
