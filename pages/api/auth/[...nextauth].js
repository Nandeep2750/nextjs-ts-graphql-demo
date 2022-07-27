import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    // Configure one or more authentication providers
    secret: process.env.NEXT_PUBLIC_SECRET,
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.

            // credentials: {
            //     username: { label: "Username", type: "text", placeholder: "jsmith" },
            //     password: { label: "Password", type: "password" }
            // },

            async authorize(data, req) {
                try {
                    // Add logic here to look up the user from the credentials supplied

                    if (data) {
                        // Any object returned will be saved in `user` property of the JWT
                        return data
                    } else {
                        // If you return null then an error will be displayed advising the user to check their details.
                        return null

                        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }
                }
                catch (e) {
                    const errorMessage = e.response.data.message
                    // Redirecting to the login page with error message in the URL
                    throw new Error(errorMessage + '&email=' + credentials.email)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.user = {}
                
                token.user.id = user?.id
                token.user.username = user?.username
                token.user.token = user?.token
                token.user.email = user?.email
            }
            return Promise.resolve(token)
        },
        async session({ session, token }) {
            session.user = token.user
            session.token = token.user.token
            return Promise.resolve(session)
        }
    },


})
