import React, { PropsWithChildren } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const NextApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {

    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_APOLLO_CLIENT_URI,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default NextApolloProvider