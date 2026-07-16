"use client";

import { useState } from "react";

export default function SignupForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      const response = await fetch(
        "/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );


      const data = await response.json();



      if (!response.ok) {

        setMessage(
          data.message || "Something went wrong"
        );

      } 
      else {

        // Show success message first
        setMessage(
          "Account created successfully!"
        );


        setFormData({
          name: "",
          email: "",
          password: "",
        });


        // After 2 seconds hide form and show thank you message
        setTimeout(() => {

          setMessage("");

          setIsRegistered(true);

        }, 2000);

      }


    } 
    catch(error) {

      setMessage(
        "Something went wrong"
      );

    } 
    finally {

      setLoading(false);

    }

  };



  return (

    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">


      {
        isRegistered ? (

          <div className="text-center">

            <h1 className="mb-4 text-3xl font-bold">
              Thank You! 🎉
            </h1>


            <p className="text-gray-600 leading-7">
              Thank you for joining us.
              Your account has been created successfully.
              We are excited to have you with us.
            </p>


          </div>


        ) : (

          <>


            <h1 className="mb-6 text-center text-3xl font-bold">
              Create Account
            </h1>



            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >


              <div>

                <label className="mb-2 block font-medium">
                  Name
                </label>


                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-md border p-3"
                />

              </div>




              <div>

                <label className="mb-2 block font-medium">
                  Email
                </label>


                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-md border p-3"
                />

              </div>




              <div>

                <label className="mb-2 block font-medium">
                  Password
                </label>


                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-md border p-3"
                />

              </div>




              <button
                type="submit"
                disabled={loading}

                className="w-full rounded-md bg-blue-600 py-3 text-white disabled:bg-gray-400"
              >

                {
                  loading
                  ? "Creating Account..."
                  : "Sign Up"
                }

              </button>


            </form>



            {
              message && (

                <p className="mt-4 text-center">
                  {message}
                </p>

              )
            }


          </>

        )

      }


    </div>

  );

}