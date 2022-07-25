# Apollo with Cache explaination for SSR

## Using  Apollo Client on Client Side
To Use apollo client import `useApollo` hook from `graphql/apollo.ts` and use it in `pages/_app.ts`. The Hook accepts `pageProps.initialState` as its optional arguement to sync the cache data recieved from Server when pages are rendered server side.

code sample for the same is below.

```js
import { useApollo } from './../graphql/apollo';

function MyApp({ Component, pageProps: { pageProps } }: AppProps) {

    const apolloClient = useApollo(pageProps.initialApolloState)

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
```

## Implementation of Caching

- Caching is used so that the data recieved by the server when a query is executed on the server side can be shared and shipped to the end User/Client for a better experience.

- Here we use `initializeApollo()` this method internally does a few things to create an apollo client which can be stored on a global scope and its cache could be updated with the data recieved from the server which improves speed and reduces additional requests to render Components.

Steps performed here are...
1. assign an existing or a new apollo client to `_apolloClient` constant
2. if any `initialState` is provided then
    
    - save the result of `_apolloClient.extract()` method into `existingCache`. This will help in preserving current data stored in Client's cache.
    - Now use the `merge` function to combine the `initialState` cache provided by server and the cache we stored in `existingCache` constant
        ```js
        const data = merge(initialState, existingCache);
        ```
    - finally use the `_apolloClient's` restore method to set the combined cache and use it for further data querying.
3. In case `initialState` was not provided as arguement then the apolloClient is returned to consumer/caller function of `initializeApollo` function.a

4. The only difference here is in case of client the existing apolloClient is set to global and updated with new cache for upcoming requests. But when `initializeApollo` is called on the server side then always a new apolloClient instance is Returned.



## Authentication Implementation
for authentication we have uses JWT token which will be used inside Headers `{authorization:'bearer [token]' }`.

we can divide the approach into 2 parts.
1. Retriving the token from session.
2. Adding the token to Header using `@apollo/client/link/context`

### Retriving Token from session
The token is stored in the next-auth session. `next-auth/react` package provides a `getSession` method which can be used client as well as server side to retrive and read user's session. The token can be set according to requirement. in our applicaion we have stored it in `session.token` attribute.a

### Adding token to Header 
`ApolloClient's` constructor provides a attribute `link`.
```js
return new ApolloClient({
    ...
    link: //single Link or Array of Links using ApolloLink.from([..links])
)}
```
Here you could pass a single HttpLink with the graphql backend URI or you could pass multiple links with each one performing some task like error Logging,operation tracking, custom behavior helpers for each query and lot more.

we have used a method `setContext` from `@apollo/client/link/context` which accepts a function which can be used to add or remove headers,cookies etc from the Graphql Requests made by our client.
```js
setContext(async (_, { headers }) => {
    const token = (await getSession(context))?.token;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
})
```
By using `getSession` In `setContext` we can populate our header with **Authorization Token** but there is a problem. For getSession to work on serverSide we need to pass the request object as an Arguement to it like `getSession(req)`.

To solve that we have used a HOC which takes an optional `context` arguement which will allow the `context` object when used in `getServerSideProps` function to be passed in `getSession` allowing server side sessions for user.
```js
const authLink = (context?: GetSessionParams) => setContext(async (_, { headers }) => {
    const token = (await getSession(context))?.token;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});
```