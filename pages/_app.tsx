/* Import types */
import type { AppProps } from 'next/app'

/* Import packages */
import { ToastContainer } from "react-toastify";

/* Import css & scss */
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/globals.css'
import '../assets/styles/style.css'

/* Import components */
import NextApolloProvider from '../graphql/NextApolloProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextApolloProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </NextApolloProvider>
  )
}

export default MyApp