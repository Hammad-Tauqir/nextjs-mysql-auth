import { jwtVerify } from "jose";


const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);


export async function verifyTokenMiddleware(
  token:string
){

  return await jwtVerify(
    token,
    secret
  );

}