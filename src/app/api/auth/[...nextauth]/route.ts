import NextAuth, { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const, // ✅ FIX
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // cek user admin / owner / kurir
        const user =
          (await prisma.users.findUnique({
            where: { email: credentials.email },
          })) ??
          (await prisma.pelanggans.findUnique({
            where: { email: credentials.email },
          }))

        if (!user) return null

        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!valid) return null

        return {
          id: user.id.toString(),
          email: user.email,
          role: "level" in user ? user.level : "Pelanggan",
          name: "name" in user ? user.name : user.nama_pelanggan,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT
      user?: any
    }): Promise<JWT> {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({
      session,
      token,
    }: {
      session: Session
      token: JWT
    }): Promise<Session> {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
