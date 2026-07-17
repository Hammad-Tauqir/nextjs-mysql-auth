import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";


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



return NextResponse.json(
{
message:"Login successful",
user:{
id:user.id,
name:user.name,
email:user.email
}
}
);


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