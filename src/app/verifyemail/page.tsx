"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setErr(true);
      console.log(error.response);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <span className="text-xl font-semibold">Verify your email</span>
      {/* <span>{token ? token : "no token"}</span> */}
      <span>
        {!verified ? (
          <div className="flex gap-1 items-center pb-16">
            <span>Loading</span>
            <ClipLoader
              color="white"
              loading={!verified}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <span className="font-semibold text-4xl text-green-500">
              Email Verified!
            </span>
            <button
              onClick={() => router.push("/login")}
              className="bg-white text-black px-3 py-1.5 rounded-full font-semibold text-sm w-fit"
            >
              Go to Login Page
            </button>
          </div>
        )}
      </span>
    </div>
  );
}
