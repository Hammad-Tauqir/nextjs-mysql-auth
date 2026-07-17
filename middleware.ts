import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";


export function middleware(request:NextRequest){

const token=request.cookies.get("token")?.value;


const path=request.nextUrl.pathname;



if(path.startsWith("/dashboard")){


if(!token){

return NextResponse.redirect(
new URL("/login",request.url)
);

}


try{

verifyToken(token);


}
catch{

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