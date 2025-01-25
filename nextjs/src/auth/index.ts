import NextAuth from "next-auth";
import db from "@db";
import {userTable} from "~/_section/user/data/schema";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {errorLog} from "~/helpers/log";
import {eq} from "drizzle-orm";
import env from "~/env";
import goCatch from "~/helpers/go-catch";
import {mathPassword} from "~/helpers/password";


export const {auth, handlers, signIn, signOut} = NextAuth({
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  providers: [
    GoogleProvider({
      clientId: env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.NEXTAUTH_GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: {label: "Email", type: "email", placeholder: "jsmith@domain.com"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials, callbacks) {
        if (!credentials) {
          return null
        }

        if (!credentials.password) {
          return null
        }

        if (typeof credentials.password !== "string" || typeof credentials.username !== "string") {
          return null
        }

        const [user, err] = await goCatch(db.query.userTable.findFirst({
          where: eq(userTable.email, credentials.username),
        }));
        if (err) {
          errorLog({msg: "Failed to get user", error: err,})
          return null;
        }

        if (!user) {
          errorLog({msg: "User not found",})
          return null;
        }

        if (!user.passwordHash) {
          errorLog({msg: "User has no password",});
          return null;
        }

        const [match, err1] = await goCatch(mathPassword(credentials.password, user.passwordHash));
        if (err1) {
          errorLog({msg: "Failed to check password", error: err1,})
          return null;
        }

        if (!match) {
          console.warn("password did not match hash")
          return null
        }

        console.log("successful login")

        return user;
      }
    })
  ],
})