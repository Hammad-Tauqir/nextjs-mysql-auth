"use client";

import { useRouter } from "next/navigation";


export default function Dashboard(){

const router=useRouter();



const logout=async()=>{


await fetch(
"/api/auth/logout",
{
method:"POST"
}
);


router.push("/login");


}



return(

<div>

<h1>
Welcome 🎉
</h1>


<button
onClick={logout}
>
Logout
</button>


</div>

)

}