/* Import types */
import type { AppProps } from 'next/app'

/* Import packages */
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client"
import Script from 'next/script'
import { appWithTranslation } from 'next-i18next';

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
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" ></Script>
      <Script id="chatbot" dangerouslySetInnerHTML={{
        __html: `
            window.__lc = window.__lc || { };
            window.__lc.license = 14351655;
            ;(function(n,t,c){
            function i(n) { 
            return e._h ? e._h.apply(null, n) : e._q.push(n) }var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on", c.call(arguments)])},once:function(){i(["once", c.call(arguments)])},off:function(){i(["off", c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call", c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e
            }(window,document,[].slice))
        `,
      }}>
      </Script>
      <noscript><a href="https://www.livechat.com/chat-with/14351655/" rel="nofollow">Chat with us</a>
        , powered by
        <a href="https://www.livechat.com/?welcome" rel="noopener nofollow noreferrer" target="_blank">LiveChat</a>
      </noscript>
      {/* <Script src="node_modules/bootstrap/dist/js/bootstrap.bundle.js" /> */}
    </>
  )
}

export default appWithTranslation(MyApp)