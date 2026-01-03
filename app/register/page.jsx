'use client'



export default function Register() {
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
          <form className="space-y-4">
  
            <input
              type="text"
              placeholder="Full Name"
              className="input"
            />
  
            <input
              type="email"
              placeholder="Email Address"
              className="input"
            />
  
            <input
              type="password"
              placeholder="Password"
              className="input"
            />
  
            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
            />
  
            {/* Terms */}
            <div className="flex items-start gap-2 text-xs text-gray-400">
              <input type="checkbox" className="mt-1 accent-[#c8aa78]" />
              <p>
                I confirm that I am 18+ and agree to the{" "}
                <span className="text-[#c8aa78] cursor-pointer">
                  Terms & Privacy Policy
                </span>
              </p>
            </div>
  
            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-[#c8aa78] py-3 text-sm font-semibold tracking-widest text-black hover:bg-[#d6bc8c] transition"
            >
              REGISTER
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
  