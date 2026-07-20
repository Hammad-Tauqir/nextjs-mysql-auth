"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Home() {

  const router = useRouter();


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");


  const handleLogin = async(
    e:React.FormEvent
  )=>{

    e.preventDefault();


    const response = await fetch(
      "/api/auth/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      }
    );


    const data = await response.json();



    if(!response.ok){

      setMessage(
        data.message || "Login failed"
      );

    }
    else{

      setMessage(
        "Login successful!"
      );


      setTimeout(()=>{

        router.push("/dashboard");

      },1000);


    }


  }



  return (

    <main className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-100
      to-gray-100
      p-4
    ">


      <div className="
        w-full
        max-w-md
        rounded-xl
        bg-white
        p-8
        shadow-xl
      ">


        <h1 className="
          mb-2
          text-center
          text-3xl
          font-bold
        ">
          Welcome Back
        </h1>


        <p className="
          mb-6
          text-center
          text-gray-500
        ">
          Login to your account
        </p>



        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >


          <div>

            <label className="mb-2 block font-medium">
              Email
            </label>


            <input
              type="email"
              value={email}
              onChange={
                (e)=>setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="
                w-full
                rounded-md
                border
                p-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>




          <div>

            <label className="mb-2 block font-medium">
              Password
            </label>


            <input
              type="password"
              value={password}
              onChange={
                (e)=>setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="
                w-full
                rounded-md
                border
                p-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>




          <div className="text-right">

            <Link
              href="/forgot-password"
              className="
                text-sm
                text-blue-600
                hover:underline
              "
            >
              Forgot Password?
            </Link>

          </div>




          <button

            type="submit"

            className="
              w-full
              rounded-md
              bg-blue-600
              py-3
              text-white
              hover:bg-blue-700
            "

          >

            Login

          </button>



        </form>




        {
          message && (

            <p className="
              mt-4
              text-center
            ">
              {message}
            </p>

          )
        }




        <div className="
          mt-6
          text-center
          text-gray-600
        ">


          Don't have an account?



          <Link

            href="/signup"

            className="
              ml-2
              font-medium
              text-blue-600
              hover:underline
            "

          >

            Create New Account

          </Link>


        </div>


      </div>


    </main>

  )

}