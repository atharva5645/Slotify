"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        toast.success("Welcome, " + result.user.displayName);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center w-full overflow-hidden font-sans relative">
      {/* Background patterns and visual depth */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #dfe3ea 1px, transparent 0)", backgroundSize: "24px 24px" }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/5 via-transparent to-primary-container/5 pointer-events-none" />

      <div className="w-full max-w-[440px] px-lg relative z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-sm mb-xl text-center">
          <Link href="/" className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary-container !text-[40px] icon-fill">event_available</span>
            <span className="text-h1 font-bold tracking-tight text-on-surface">Slotify</span>
          </Link>
          <p className="text-body-md text-on-surface-variant max-w-[280px]">Structured efficiency for high-performance scheduling.</p>
        </div>

        {/* Auth Toggle */}
        <div className="flex items-center p-xs bg-surface-container-high rounded-lg mb-lg border border-outline-variant">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-sm text-label-md font-medium rounded transition-all ${isLogin ? 'text-on-surface bg-surface shadow-sm border border-outline-variant' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Log In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-sm text-label-md font-medium rounded transition-all ${!isLogin ? 'text-on-surface bg-surface shadow-sm border border-outline-variant' : 'text-on-surface-variant hover:text-on-surface'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-surface border border-outline-variant rounded-2xl p-xl shadow-2xl shadow-black/10">
          <div className="mb-xl">
            <h2 className="text-h2 font-bold text-on-surface mb-xs">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
            <p className="text-body-md text-on-surface-variant">{isLogin ? 'Enter your credentials to access your dashboard.' : 'Join Slotify and start scheduling with precision.'}</p>
          </div>
          
          <form className="flex flex-col gap-lg" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-sm">
              <label className="text-label-md font-medium text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant !text-[20px]">mail</span>
                <input 
                  className="w-full bg-surface border border-outline-variant text-body-md text-on-surface rounded-lg pl-[40px] pr-sm py-[10px] outline-none transition-all focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-on-surface-variant/50" 
                  id="email" 
                  placeholder="name@company.com" 
                  type="email"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-center">
                <label className="text-label-md font-medium text-on-surface" htmlFor="password">Password</label>
                <a className="text-label-md font-medium text-primary-container hover:underline" href="#">Forgot password?</a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant !text-[20px]">lock</span>
                <input 
                  className="w-full bg-surface border border-outline-variant text-body-md text-on-surface rounded-lg pl-[40px] pr-sm py-[10px] outline-none transition-all focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 placeholder:text-on-surface-variant/50" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>
            
            <button 
              className="w-full bg-primary-container text-white text-label-md font-medium rounded-lg py-[12px] px-md transition-all hover:bg-primary-container/90 active:scale-[0.98] flex items-center justify-center gap-sm mt-sm" 
              type="submit"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="mt-xl flex items-center gap-md">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="text-caption text-on-surface-variant uppercase tracking-wider">Or continue with</span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>

          <div className="mt-lg flex gap-md">
            <button 
              onClick={handleGoogleLogin}
              className="flex-1 flex items-center justify-center gap-sm py-[10px] px-md bg-transparent border border-outline-variant rounded-lg text-label-md font-medium text-on-surface transition-colors hover:bg-surface-variant group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-sm py-[10px] px-md bg-transparent border border-outline-variant rounded-lg text-label-md font-medium text-on-surface transition-colors hover:bg-surface-variant group">
              <svg className="w-5 h-5 text-on-surface group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
              </svg>
              GitHub
            </button>
          </div>
        </div>
        
        <div className="mt-lg text-center">
          <p className="text-caption text-on-surface-variant">
            By continuing, you agree to Slotify's <a className="text-primary-container hover:underline" href="#">Terms of Service</a> and <a className="text-primary-container hover:underline" href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
