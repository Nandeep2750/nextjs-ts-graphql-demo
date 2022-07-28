import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        return Document.getInitialProps(ctx)
    }

    render() {
        return (
            <Html>
                <Head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossOrigin="anonymous" async></script>
                    <script id="chatbot" dangerouslySetInnerHTML={{
                        __html: `
                            window.__lc = window.__lc || { };
                            window.__lc.license = 14351655;
                            ;(function(n,t,c){
                            function i(n) { 
                            return e._h ? e._h.apply(null, n) : e._q.push(n) }var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on", c.call(arguments)])},once:function(){i(["once", c.call(arguments)])},off:function(){i(["off", c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call", c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e
                            }(window,document,[].slice))
                        `,
                    }} async>
                    </script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <noscript><a href="https://www.livechat.com/chat-with/14351655/" rel="nofollow">Chat with us</a>, powered by
                        <a href="https://www.livechat.com/?welcome" rel="noopener nofollow noreferrer" target="_blank">LiveChat</a>
                    </noscript>
                </body>
            </Html>
        )
    }
}

export default MyDocument
