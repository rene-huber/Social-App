import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import bcrypt from 'bcrypt'
import prisma from "./prismaConnect";


export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
          username: { label: "Username", type: "text", placeholder: "John Smith" },
      },
      async authorize(credentials) {
        
      
          if(!credentials.email || !credentials.password) {
              throw new Error('Please enter an email and password')
          }

         
          const user = await prisma.user.findUnique({
              where: {
                  email: credentials.email
              }
          });

    
          if (!user || !user?.hashedPassword) {
              throw new Error('No user found')
          }

        
          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)
          
          if (!passwordMatch) {
              throw new Error('Incorrect password')
          }

          return user;
      },
  }), 
  ],
  secret: process.env.SECRET,
  session: {
      strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.JWT_SECRET,
  },


  callbacks: {

    async session({token,session}) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email
      }
      return session
    },
async jwt({token, user}) {
  if (user) {
    token.id = user.id
    token.role = user.role
    token.email = user.email  
  }
  return token
}
},

pages: {
  signIn: "/",
  signOut: "/register",
 
},

};


export const getAuthSession = () => getServerSession(authOptions);

