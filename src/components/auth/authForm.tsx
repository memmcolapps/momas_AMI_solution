"use client";

import type React from "react";
import OtpInput from "react-otp-input";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader } from "lucide-react";

type FormType =
  | "signin"
  | "resetpassword"
  | "verifycode"
  | "password"
  | "success";

interface AuthFormProps {
  formType: FormType;
  onSubmit: (email: string, password: string) => void;
  initialEmail?: string;
  initialPassword?: string;
  resetLink?: string;
}

export function AuthForm({
  formType,
  onSubmit,
  initialEmail = "",
  initialPassword = "",
  resetLink,
}: AuthFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otp, setOtp] = useState("");

  const isSignInForm = formType === "signin";
  const isVerifyCode = formType === "verifycode";
  const isForgotPassword = formType === "password";
  const isSuccess = formType === "success";
  const isFormValid = isSignInForm
    ? email.trim() !== "" && password.trim() !== ""
    : isVerifyCode
      ? otp.length === 4
      : isForgotPassword
        ? password.trim() !== ""
        : email.trim() !== "";

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    try {
      onSubmit(email, password);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-medium text-gray-800">
          {isSuccess
            ? "Sucessful"
            : isVerifyCode
              ? "Enter Verification Code"
              : isSignInForm
                ? "Sign In"
                : "Reset Password"}
        </h2>

        {isVerifyCode && (
          <div className="py-2 text-gray-500">
            We sent an OTP code to ecmi@gridflex.com
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="mb-10 w-[350px] text-center text-gray-800">
          Your new password has been updated successfully. You can now use your
          new password to log in securely.
        </div>
      )}

      {!isVerifyCode && !isForgotPassword && !isSuccess && (
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="ecmi@gridflex.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-100 px-4 py-3 text-gray-800 shadow-sm focus:border-[0.4px] focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
      )}

      {isVerifyCode && (
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            shouldAutoFocus
            renderSeparator={<span className="mx-4"></span>}
            inputStyle={{
              width: "60px",
              height: "60px",
            }}
            renderInput={(props) => (
              <input
                {...props}
                className="rounded-md border border-gray-300 text-center text-3xl focus:ring-[1.1px] focus:ring-[#161CCA] focus:outline-none"
              />
            )}
          />
        </div>
      )}

      {isForgotPassword && (
        <div className="mb-10 flex flex-col gap-8">
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-100 px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-[0.4px] focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center pr-3 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeIcon size="10" />
                ) : (
                  <EyeOffIcon size="10" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-100 px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-[0.4px] focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center pr-3 text-gray-400 hover:text-gray-600"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeIcon size="10" />
                ) : (
                  <EyeOffIcon size="10" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {isSignInForm && (
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-100 px-4 py-3 pr-10 text-gray-800 shadow-sm focus:border-[0.4px] focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex w-10 cursor-pointer items-center justify-center pr-3 text-gray-400 hover:text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeIcon size="10" /> : <EyeOffIcon size="10" />}
            </button>
          </div>
        </div>
      )}

      {isSignInForm && (
        <div className="flex justify-end">
          <Link
            href="/reset-password"
            className="text-sm text-gray-600 hover:text-blue-700 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className={`mt-2 flex w-full items-center justify-center gap-2 bg-[#161CCA] px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 active:bg-[#161CCA] ${!isSuccess && "disabled:cursor-not-allowed disabled:bg-[#161CCA] disabled:opacity-30"} `}
      >
        {isSuccess ? (
          isSubmitting ? (
            <>
              <Loader className="animate-spin" size={15} />
              <span>Submitting...</span>
            </>
          ) : (
            <Link href={"/dashboard"}>Done</Link>
          )
        ) : isSignInForm ? (
          isSubmitting ? (
            <>
              <Loader className="animate-spin" size={15} />
              <span>Signing in...</span>
            </>
          ) : (
            <Link href={"/dashboard"}>Sign In</Link>
          )
        ) : isSubmitting ? (
          <>
            <Loader className="animate-spin" size={15} />
            <span>Resetting...</span>
          </>
        ) : (
          <Link href={resetLink ?? "#"}>Reset Password</Link>
        )}
      </button>

      {isVerifyCode && (
        <div className="flex justify-center gap-2 px-2 py-1.5 text-lg text-gray-700">
          <span>Did’nt receive the email?</span>
          <Link
            href="/forgot-password"
            className="flex items-center space-x-1 rounded bg-transparent text-[#161CCA] focus:outline-none"
          >
            <span>Click here to resend</span>
          </Link>
        </div>
      )}

      {!isSignInForm && !isSuccess && (
        <div className="flex justify-center">
          <Link
            href="/login"
            className="flex items-center space-x-1 rounded bg-transparent px-2 py-1.5 text-gray-700 focus:outline-none"
          >
            <ArrowLeftIcon
              size={12}
              className="h-4 w-5 text-[#161CCA]"
              aria-hidden="true"
            />
            <span>Back to Login</span>
          </Link>
        </div>
      )}

      {isSignInForm && (
        <div className="flex justify-center gap-2 px-2 py-1.5 text-lg text-gray-700">
          <span>Don&lsquo;t have an account?</span>
          <Link
            href="/signup"
            className="flex items-center space-x-1 rounded bg-transparent text-[#161CCA] focus:outline-none"
          >
            <span>Sign up</span>
          </Link>
        </div>
      )}
    </form>
  );
}
