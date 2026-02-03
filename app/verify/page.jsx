"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token");
      setLoading(false);
      return;
    }

    verifyToken();
  }, [token]);

  const verifyToken = async () => {
    try {
      console.log(token)
      const res = await axios.get(
        `https://irisinformatics.net/dating/Wb/verify_email?token=${token}`,
        
      );

      if (res.data.status === 0) {
        toast.success("Email verified successfully ");
        setVerified(true);
        router.push("/login")

      } else {
        toast.error(res.data.message || "Verification failed ");
      }
    } catch (error) {
      console.error(error);
      toast.error("Verification link expired or invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-[#2a1f14] bg-[#0f0f0f] p-8 text-white text-center">
        {loading ? (
          <>
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
            <p className="text-gray-400">Verifying your email...</p>
          </>
        ) : verified ? (
          <>
            <h1 className="text-2xl text-[#c8aa78] font-semibold">
              Email Verified 
            </h1>
            <p className="mt-3 text-gray-400">
              Your email has been verified successfully.
            </p>

            <a
              href="/login"
              className="mt-6 inline-block rounded-md bg-[#c8aa78] px-6 py-2 text-black font-semibold hover:bg-[#d6bc8c]"
            >
              Go to Login
            </a>
          </>
        ) : (
          <>
            <h1 className="text-xl text-red-400 font-semibold">
              Verification Failed 
            </h1>
            <p className="mt-3 text-gray-400">
              This verification link is invalid or expired.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-xl border border-[#2a1f14] bg-[#0f0f0f] p-8 text-white text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#c8aa78] border-t-transparent" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
