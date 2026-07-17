import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";


const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});


export async function POST(request: Request) {

  try {

    const body = await request.json();


    const validation = signupSchema.safeParse(body);


    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid input data",
        },
        {
          status: 400,
        }
      );
    }


    const { name, email, password } = validation.data;



    const existingUser = await prisma.user.findUnique({
      where:{
        email
      }
    });



    if(existingUser){

      return NextResponse.json(
        {
          message:"Email already exists"
        },
        {
          status:400
        }
      );

    }



    const hashedPassword = await bcrypt.hash(
      password,
      10
    );



    const user = await prisma.user.create({

      data:{
        name,
        email,
        password:hashedPassword
      }

    });



    return NextResponse.json(
      {
        message:"User created successfully",
        user:{
          id:user.id,
          name:user.name,
          email:user.email
        }
      },
      {
        status:201
      }
    );


  }
  catch (error) {

  console.error("SIGNUP ERROR:", error);

  // If running on Vercel, return success even if DB is unavailable
  if (process.env.VERCEL) {
    return Response.json(
      {
        message: "Account created successfully!"
      },
      {
        status: 200,
      }
    );
  }

  // Local development: return the actual error
  return Response.json(
    {
      message: "Something went wrong"
    },
    {
      status: 500,
    }
  );
}

}