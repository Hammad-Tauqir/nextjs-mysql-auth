import SignupForm from "@/components/auth/SignupForm";


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

      <SignupForm />

    </main>

  );

}