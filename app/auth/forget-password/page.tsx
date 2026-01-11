"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // send reset request logic here
  };

  return (
    <div className="w-full flex flex-col items-center text-center">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <Image
          src="/logo-auth.svg"
          alt="Carely Pets"
          width={225}
          height={50}
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">
        Forgot Password !
      </h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Enter your email to reset password
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-5">
        {/* Email */}
        <div className="text-left">
          <label className="text-xs font-medium text-gray-600">EMAIL</label>
          <div className="mt-1 flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-sky-400">
            <Image
              src="/icons/mail-01.svg"
              alt="Email icon"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <input
              type="email"
              placeholder="Enter email"
              required
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-sky-200 py-3 text-sm font-medium text-sky-900 hover:bg-sky-300 transition"
        >
          Next
        </button>

        {/* Back to Login */}
        <button
          type="button"
          onClick={() => router.push("/signin")}
          className="flex items-center justify-center gap-2 text-sm text-gray-700 hover:text-sky-600 transition"
        >
          <Image
            src="/icons/arrow-left-01.svg"
            alt="Back icon"
            width={16}
            height={16}
            className="w-4 h-4"
          />
          Back to Login
        </button>
      </form>
    </div>
  );
}
