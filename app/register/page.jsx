'use client'

import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
        console.log("Register:", { email, password, agreeToTerms });
    };

    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-[#2a1f14] bg-[#0f0f0f] p-8">
  
          {/* Heading */}
          <h1 className="mb-2 text-center font-serif text-4xl text-[#c8aa78]">
            Create Account
          </h1>
          <p className="mb-8 text-center text-sm text-gray-400">
            Join our exclusive platform and continue securely
          </p>
  
          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
  
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
                required
                className="mt-1 accent-[#c8aa78]" 
              />
              <label htmlFor="terms" className="cursor-pointer">
                I agree to the{" "}
                <span className="text-[#c8aa78] hover:underline">
                  Terms & Conditions
                </span>
              </label>
            </div>
  
            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#c8aa78] py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition"
            >
              Create Account
            </button>
          </form>
  
          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-[#c8aa78] hover:underline">
              Login
            </a>
          </div>
        </div>
  
        {/* Shared styles */}
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
  