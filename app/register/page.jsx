"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast.error("Please accept the Terms & Conditions");
      return;
    }

    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("confirm_password", password);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://irisinformatics.net/dating/Wb/register",
        formdata
      );

      if (res.data.status === 1) {
        
        toast.error(res.data.message);
      } else {
        
        toast.success(res.data.message);
        setMailSent(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {mailSent ? (
        /* ================= SUCCESS SCREEN ================= */
        <div className="w-full max-w-md rounded-xl border border-[#2a1f14] bg-[#0f0f0f] p-8 text-white">
          <h1 className="text-lg text-center">
            The confirmation mail has been sent to
            <br />
            <span className="mt-2 block font-bold underline text-[#c8aa78]">
              {email}
            </span>
          </h1>

          <p className="mt-4 text-center text-sm text-gray-400">
            Please check your inbox and spam folder to continue.
          </p>
        </div>
      ) : (
        /* ================= REGISTER FORM ================= */
        <div className="w-full max-w-md rounded-xl border border-[#2a1f14] bg-[#0f0f0f] p-8">
          {/* Heading */}
          <h1 className="mb-2 text-center font-serif text-4xl text-[#c8aa78]">
            Create Account
          </h1>
          <p className="mb-8 text-center text-sm text-gray-400">
            Join our exclusive platform and continue securely
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />

            {/* Terms */}
            <div className="flex items-start gap-2 text-xs text-gray-400">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 accent-[#c8aa78]"
              />
              <label htmlFor="terms" className="cursor-pointer">
                I agree to the{" "}
                <span className="text-[#c8aa78] hover:underline">
                  Terms & Conditions
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={loading}
              disabled={!agreeToTerms}
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-[#c8aa78] hover:underline">
              Login
            </a>
          </div>
        </div>
      )}

      {/* Shared input styles */}
      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.375rem;
          background-color: #1a1a1a;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: white;
          border: 1px solid #2a1f14;
          outline: none;
        }
        .input:focus {
          border-color: #c8aa78;
        }
      `}</style>
    </div>
  );
}
