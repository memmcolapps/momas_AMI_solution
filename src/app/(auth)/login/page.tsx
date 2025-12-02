"use client";

import { AuthForm } from "@/components/auth/authForm";
import { Branding } from "@/components/auth/Branding";

export default function Login() {
  //   const { login } = useAuth();

  const handleSubmit = () => {
    console.log("Hiee");
  };

  //   const handleSubmit = async (email: string, password: string) => {
  //     await login(email, password);
  //   };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen w-full items-center">
        {/* Left Section: Branding */}
        <div className="flex w-1/2 items-center justify-center px-20 py-10">
          <Branding
            labelTitle="Welcome back!"
            label="Log in to access your centralized dashboard, where you can manage your HES services—all in one streamlined platform."
          />
        </div>

        {/* Right Section: Sign-In Form */}
        <div className="mt-8 w-1/3 bg-white p-14 shadow-xl">
          <AuthForm formType={"signin"} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
