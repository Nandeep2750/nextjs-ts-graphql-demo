import '../assets/styles/globals.css'
import type { AppProps } from 'next/app'
import NextApolloProvider from '../graphql/NextApolloProvider'

// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextApolloProvider>
      <Component {...pageProps} />
    </NextApolloProvider>
  )
}

export default MyApp