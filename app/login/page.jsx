'use client'

import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()

    function handalLogin(e){
        e.preventDefault();
            router.push("/dashboard")
    }
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl border border-[#2a1f14]">
  
          {/* LEFT IMAGE */}
          <div
            className="hidden md:block bg-cover bg-center"
            style={{
              backgroundImage: "url('/es.jpg')",
            }}
          >
            <div className="h-full w-full bg-black/50"></div>
          </div>
  
          {/* RIGHT FORM */}
          <div className="flex items-center justify-center bg-[#0f0f0f] px-8 py-12">
            <div className="w-full max-w-sm">
  
              {/* Title */}
              <h1 className="mb-2 text-center font-serif text-4xl text-[#c8aa78]">
                Welcome Back
              </h1>
              <p className="mb-8 text-center text-sm text-gray-400">
                Login to continue your private experience
              </p>
  
              {/* Form */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Email or Username"
                  className="w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
                />
  
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
                />
  
                <button
                  onClick={handalLogin}
                  className="mt-4 w-full rounded-md bg-[#c8aa78] py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition"
                >
                  LOGIN
                </button>
              </form>
  
              {/* Footer links */}
              <div className="mt-6 flex justify-between text-xs text-gray-400">
                <a href="#" className="hover:text-[#c8aa78]">
                  Forgot password?
                </a>
                <a href="#" className="hover:text-[#c8aa78]">
                  Create account
                </a>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    );
  }
  