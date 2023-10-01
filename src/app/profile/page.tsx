"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [id, setId] = React.useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful.");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setId(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <div>
        <Toaster />
      </div>
      <span className="text-xl">Profile Page</span>
      <span>{!id ? "Nothing" : <Link href={`/profile/${id}`}>{id}</Link>}</span>
      <button
        onClick={getUserDetails}
        className="border border-white text-white px-3 py-1.5 text-black rounded-full hover:bg-gray-800 duration-200 font-medium text-sm"
      >
        Get User Details
      </button>
      <button
        onClick={logout}
        className="bg-white px-3 py-1.5 text-black rounded-full hover:bg-gray-300 duration-200 font-medium text-sm"
      >
        Logout
      </button>
    </div>
  );
}
