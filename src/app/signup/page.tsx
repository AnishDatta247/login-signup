"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else setButtonDisabled(true);
  }, [user]);

  const onSignup = async () => {
    try {
      setLoading(true);
      setButtonDisabled(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      toast.success("Signup success. Redirecting to login page...");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <div>
        <Toaster />
      </div>
      <span className="text-xl font-semibold">Sign Up</span>
      <hr />
      <div className="flex flex-col text-sm font-light gap-0.5">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
          className="text-slate-700 px-3 py-1.5 rounded-md text-sm"
        />
      </div>

      <div className="flex flex-col text-sm font-light gap-0.5">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
          className="text-slate-700 px-3 py-1.5 rounded-md text-sm"
        />
      </div>

      <div className="flex flex-col text-sm font-light gap-0.5">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
          className="text-slate-700 px-3 py-1.5 rounded-md text-sm"
        />
      </div>

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`px-3 py-1.5 rounded-lg font-medium text-sm mt-2 duration-200 ${
          buttonDisabled
            ? "bg-gray-400 text-slate-500 font-light"
            : "bg-slate-800 hover:bg-slate-700"
        }`}
      >
        {loading ? (
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
        ) : (
          "Signup"
        )}
      </button>
      <div className="text-sm">
        <span>Already have an account? </span>
        <Link
          className="ml-1 font-semibold hover:underline hover:decoration-1 duration-200"
          href="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
