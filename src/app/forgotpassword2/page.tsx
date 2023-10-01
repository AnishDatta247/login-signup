"use client";

import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function ForgotPasswordPage() {
  const [pass, setPass] = React.useState("");
  const [confPass, setConfPass] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onChangePass = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/changepass", {
        token: window.location.search.split("=")[1],
        password: pass,
      });
      console.log("Password changed", response.data);
      toast.success(
        "Password changes Successfully. Redirecting to login page."
      );
      router.push("/login");
    } catch (error: any) {
      console.log("Password change failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <div>
        <Toaster />
      </div>
      <span className="text-xl font-semibold">Enter new password</span>
      <div className="flex flex-col text-sm font-light gap-0.5">
        <label htmlFor="password">New Password</label>
        <input
          id="password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
          className="text-slate-700 px-3 py-1.5 rounded-md text-sm"
        />
      </div>
      <div className="flex flex-col text-sm font-light gap-0.5">
        <label htmlFor="confPassword">Confirm Password</label>
        <input
          id="confPassword"
          type="password"
          value={confPass}
          onChange={(e) => setConfPass(e.target.value)}
          placeholder="confirm password"
          className="text-slate-700 px-3 py-1.5 rounded-md text-sm"
        />
      </div>
      <button
        onClick={onChangePass}
        disabled={
          pass !== confPass ||
          pass.length === 0 ||
          confPass.length === 0 ||
          loading
        }
        className={`text-sm font-semibold px-3 py-1.5 rounded-full mt-2 ${
          pass !== confPass ||
          pass.length === 0 ||
          confPass.length === 0 ||
          loading
            ? "bg-gray-400 text-slate-500"
            : "bg-white text-black"
        }`}
      >
        {!loading ? (
          "Change"
        ) : (
          <div className="flex items-center gap-1">
            <span>Loading</span>
            <ClipLoader
              color="slate-500"
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </button>
    </div>
  );
}
