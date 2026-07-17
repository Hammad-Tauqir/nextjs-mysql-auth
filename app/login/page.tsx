"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");

  const handleLogin = async(e:React.FormEvent)=>{

    e.preventDefault();

    const response = await fetch("/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });


    const data = await response.json();


    if(!response.ok){

      setMessage(data.message);

    }
    else{

      setMessage("Login successful!");

      setTimeout(()=>{

        router.push("/dashboard");

      },1000);

    }

  }


  return (

    <div className="flex min-h-screen items-center justify-center">


      <form 
      onSubmit={handleLogin}
      className="w-96 rounded-lg bg-white p-8 shadow">


        <h1 className="mb-5 text-3xl font-bold">
          Login
        </h1>


        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="mb-4 w-full border p-3"
        />


        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="mb-4 w-full border p-3"
        />


        <button
        className="w-full bg-blue-600 p-3 text-white"
        >
          Login
        </button>


        {
          message &&
          <p className="mt-4 text-center">
            {message}
          </p>
        }


      </form>


    </div>

  )

}