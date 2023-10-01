"use client";

import { sendEmail } from "@/helpers/mailer";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onMailSend = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpass", { email });
      console.log("Email sent", response.data);
      toast.success("Email sent on " + email);
    } catch (error: any) {
      console.log("Unable to send mail", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <div>
        <Toaster />
      </div>
      <span className="text-xl font-semibold">Enter email</span>
      <div className="flex flex-col text-sm font-light gap-0.5">
        <label htmlFor="password">Email</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="text-slate-700 px-3 py-1.5 rounded-md text-sm"
        />
      </div>
      <button
        disabled={email.length === 0 || loading}
        onClick={onMailSend}
        className={`${
          email.length === 0 || loading ? "bg-gray-400" : "bg-white"
        } font-semibold ${
          !sent
            ? email.length === 0 || loading
              ? "text-slate-500"
              : "text-black"
            : email.length === 0 || loading
            ? "text-slate-500"
            : "text-green-500"
        } px-3 py-1.5 rounded-full mt-2 text-sm`}
      >
        {loading ? (
          <div className="flex gap-2 items-center">
            <span>Loading</span>
            <ClipLoader
              color="slate-500"
              loading={loading}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : !sent ? (
          "Send Mail"
        ) : (
          "Email Sent!"
        )}
      </button>
    </div>
  );
}
