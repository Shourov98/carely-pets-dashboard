"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function OtpVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "example@gmail.com";
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length === 4) {
      router.push("/reset-password");
    }
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  return (
    <div className="w-full flex flex-col items-center text-center">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/logo-auth.svg"
          alt="Carely Pets"
          width={225}
          height={50}
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Verify Code</h1>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        We sent OTP code to your email <br />
        <span className="font-medium text-gray-700">{email}</span>.
        Enter the code below to verify.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-6"
      >
        {/* OTP Inputs */}
        <div className="flex gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="
                w-14 h-14 rounded-xl text-center text-gray-800 text-lg font-semibold
                border border-gray-300
                focus:border-sky-500 focus:outline-none
              "
            />
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-sky-200 py-3 text-sm font-medium text-sky-900 hover:bg-sky-300 transition"
        >
          Next
        </button>

        {/* Resend */}
        <p className="text-sm text-gray-600">
          Don’t receive OTP?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-sky-600 font-medium hover:underline"
          >
            Resend again
          </button>
        </p>
      </form>
    </div>
  );
}
