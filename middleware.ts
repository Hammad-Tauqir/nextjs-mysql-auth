import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";


export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;


  if (request.nextUrl.pathname.startsWith("/dashboard")) {


    if (!token) {

      console.log("No token found");

      return NextResponse.redirect(
        new URL("/login", request.url)
      );

    }


    try {

      const decoded = verifyToken(token);

      console.log("Token verified:", decoded);


    } catch (error) {

      console.log("JWT verification error:", error);

      return NextResponse.redirect(
        new URL("/login", request.url)
      );

    }

  }


  return NextResponse.next();

}



export const config = {

  matcher: [
    "/dashboard/:path*"
  ]

};