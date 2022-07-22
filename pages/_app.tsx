/* Import types */
import type { AppProps } from 'next/app'


/* Import packages */
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client"
import Script from 'next/script'

/* Import css & scss */
import 'bootstrap/dist/css/bootstrap.css'

import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/globals.css'
import '../assets/styles/style.css'

/* Import components */
// import NextApolloProvider from '../graphql/NextApolloProvider'
import AuthLayout from '../components/layout/AuthLayout';
import { useApollo } from './../graphql/apollo';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {

  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <SessionProvider session={session}>
          <AuthLayout>
            <Component {...pageProps} />
          </AuthLayout>
          <ToastContainer autoClose={3000} />
        </SessionProvider>
      </ApolloProvider>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" />
      {/* <Script src="node_modules/bootstrap/dist/js/bootstrap.bundle.js" /> */}
    </>
  )
}

export default MyApp