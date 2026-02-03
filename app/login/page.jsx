'use client'

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Button from "../components/ui/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../lib/api";
import { loginSuccess, AUTH_STORAGE_KEY } from "../../store/slices/authSlice";
import Link from "next/link";

export default function Login() {
    const [loading , setLoading] = useState(false)
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

   async function handalLogin(e){
        e.preventDefault();
        try{
          const formdata = new FormData()
          formdata.append("email" , email)
          formdata.append("password" , password)
          setLoading(true)
          const res = await api.post("/Wb/login", formdata)
          if(res.data.status === 0){
            const data = res.data.data
            const token = data?.token ?? null
            const { password: _, ...user } = data || {}
            const userSafe = user && Object.keys(user).length ? user : { email }
            dispatch(loginSuccess({ user: userSafe, token }))
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: userSafe, token }))
            toast.success(res.data.message)
            router.push('/dashboard')
          }
          else  toast.error(res.data.message)

        }catch(e){
          setLoading(false)
          console.log(e)
        }finally{
          setLoading(false)
        }
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
                  onChange={(e)=> setEmail(e.target.value)}
                  value={email}
                />
  
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md bg-[#1a1a1a] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none border border-[#2a1f14] focus:border-[#c8aa78]"
                  onChange={(e)=> setPassword(e.target.value)}
                  value = {password}
                />
  
                <Button loading={loading} onClick={handalLogin}>
                  LOGIN
                </Button>
              </form>
  
              {/* Footer links */}
              <div className="mt-6 flex justify-between text-xs text-gray-400">
                <a href="#" className="hover:text-[#c8aa78]">
                  Forgot password?
                </a>
                <Link href="/register" className="hover:text-[#c8aa78]">
                  Create account
                </Link>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    );
  }
  