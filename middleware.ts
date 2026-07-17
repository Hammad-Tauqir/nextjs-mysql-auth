import { NextRequest, NextResponse } from "next/server";
import { verifyTokenMiddleware } from "@/lib/jwt-middleware";

export async function middleware(request:NextRequest){

const token=request.cookies.get("token")?.value;


const path=request.nextUrl.pathname;



if(path.startsWith("/dashboard")){


if(!token){

return NextResponse.redirect(
new URL("/login",request.url)
);

}


try{

await verifyTokenMiddleware(token);

}
catch(error){

console.log("JWT ERROR:",error);

return NextResponse.redirect(
new URL("/login",request.url)
);

}


}


return NextResponse.next();

}



export const config={

matcher:[
"/dashboard/:path*"
]

};