import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/jwt";


export async function POST(request:Request){

try{

const body = await request.json();

const {
email,
password
}=body;



const user = await prisma.user.findUnique({
where:{
email
}
});



if(!user){

return NextResponse.json(
{
message:"User not found"
},
{
status:404
}
);

}



const passwordMatch = await bcrypt.compare(
password,
user.password
);



if(!passwordMatch){

return NextResponse.json(
{
message:"Invalid password"
},
{
status:400
}
);

}

const token = await createToken({
    id:user.id,
    email:user.email
});

const response = NextResponse.json(
{
message:"Login successful"
}
);


response.cookies.set(
"token",
token,
{
httpOnly:true,
secure:process.env.NODE_ENV==="production",
sameSite:"strict",
maxAge:60*60*24
}
);


return response;


}
catch(error){

console.log(error);


return NextResponse.json(
{
message:"Something went wrong"
},
{
status:500
}
);

}


}