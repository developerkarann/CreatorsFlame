import connectDatabase from '@/app/database/database'
import User from '@/models/User'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorization: {
            //     params: {
            //       prompt: "consent",
            //       access_type: "offline",
            //       response_type: "code"
            //     }
            //   }
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {

            if (account.provider == 'github') {
                //Connect to the database
                await connectDatabase()
                const currentUser = await User.findOne({ email: email })
                if (!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        name: user.name,
                        username: user.email.split('@')[0],
                        profilePic: user.image
                    })
                }
                return true
            };

            if (account.provider == "google") {
                // Connect to the database
                await connectDatabase()
                const currentUser = await User.findOne({ email: email })
                if (!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        name: user.name,
                        username: user.email.split('@')[0],
                        profilePic: user.image
                    })
                }
                // console.log(account)
                return true
            }


        },
        async session({ session, token, user }) {
            const dbUser = await User.findOne({ email: session.user.email })
            session.user.name = dbUser.username
            return session
        },
    },
})

export { authOptions as GET, authOptions as POST }

