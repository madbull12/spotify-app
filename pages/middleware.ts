import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(req: NextApiRequest) {
  const session = getSession({ req });
  console.log(session);
  if (!session) {
    NextResponse.redirect(new URL("/auth/signin"));
  }
}

export const config = {
  matcher: ["/search", "/"],
  secret: process.env.NEXTAUTH_SECRET,
};
