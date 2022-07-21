/* Import types */
import type { AppProps } from 'next/app'

/* Import packages */
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react"

/* Import css & scss */
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/globals.css'
import '../assets/styles/style.css'

/* Import components */
import NextApolloProvider from '../graphql/NextApolloProvider'
import AuthLayout from '../components/layout/AuthLayout';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {

  return (
    <NextApolloProvider>
      <SessionProvider session={session}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
        <ToastContainer autoClose={3000} />
      </SessionProvider>
    </NextApolloProvider>
  )
}

export default MyApp