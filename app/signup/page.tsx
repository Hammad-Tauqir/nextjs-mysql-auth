import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";


export default function SignupPage() {

  return (

    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gradient-to-br
        from-blue-100
        to-gray-100
        p-4
      "
    >


      <div className="w-full max-w-md">


        <SignupForm />


        <div
          className="
            mt-4
            rounded-lg
            bg-white
            p-4
            text-center
            shadow
          "
        >

          <p className="text-gray-600">

            Already have an account?


            <Link
              href="/"
              className="
                ml-2
                font-medium
                text-blue-600
                hover:underline
              "
            >

              Login

            </Link>


          </p>


        </div>


      </div>


    </main>

  );

}