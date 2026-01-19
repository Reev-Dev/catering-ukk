import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { DefaultSession, getServerSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

export async function getAuthSession() {
  return getServerSession(authOptions);
}
