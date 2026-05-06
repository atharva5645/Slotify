"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="bg-[#0f1419] text-[#dfe3ea] min-h-screen flex w-full overflow-hidden font-sans selection:bg-[#97cbff]/30">
      {/* Left Panel: Branding & Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 border-r border-[#3f4851]">
        {/* Background Image overlaying base background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjwuiK7BpIL_ghU2bAjKF2kWwTo-3R1hC7EenQSGwLWcJnirduqr2YFBT0I4n_GdFKWdyndiVjIkeGk5pVoBa70Ldulog3L0gi_bypqHTzfGfqubApUE62tQXmq7Zxfk4uKHw5y5rz6ZEwmsxYM0rAmOgr_BC4J83Uw8EGb6CULQKhak22jbbGPUV_9HpBxTt7HEanrVr4EbrFTvCcTuCMh_aHv3YhlfX9RHYR8meOtd_tG-D3-UfNvW1_XCk-6fy6BVD1xZrcH2Xv')" }}
        ></div>
        
        {/* Gradient to ensure text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0f1419]/80 via-[#0f1419]/40 to-[#0f1419]/90"></div>
        
        <div className="relative z-20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#1197e8] icon-fill text-[32px]">dataset</span>
          <span className="text-2xl font-bold tracking-tight text-[#dfe3ea]">Slotify</span>
        </div>

        <div className="relative z-20 max-w-md animate-fade-in">
          <h1 className="text-4xl font-bold text-[#dfe3ea] mb-4 leading-tight">
            Structured efficiency for high-performance scheduling.
          </h1>
          <p className="text-lg text-[#bfc7d3] leading-relaxed">
            Take calm control over complex data with our minimalist, precision-engineered platform.
          </p>
        </div>
      </div>

      {/* Right Panel: Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, #dfe3ea 1px, transparent 0)", 
            backgroundSize: "24px 24px" 
          }}
        ></div>

        <div className="w-full max-w-[440px] relative z-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <span className="material-symbols-outlined text-[#1197e8] icon-fill text-[32px]">dataset</span>
            <span className="text-2xl font-bold tracking-tight text-[#dfe3ea]">Slotify</span>
          </div>

          {/* Contextual State Toggle */}
          <div className="flex items-center p-1 bg-[#262a30] rounded-xl mb-8 border border-[#3f4851]">
            <button className="flex-1 py-2 text-xs font-bold rounded-lg text-[#dfe3ea] bg-[#0f1419] shadow-sm border border-[#3f4851] transition-all">Log In</button>
            <button className="flex-1 py-2 text-xs font-bold rounded-lg text-[#bfc7d3] hover:text-[#dfe3ea] transition-all">Sign Up</button>
          </div>

          <div className="bg-[#0f1419] border border-[#3f4851] rounded-2xl p-8 shadow-2xl shadow-black/50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#dfe3ea] mb-1">Welcome back</h2>
              <p className="text-sm text-[#bfc7d3]">Enter your credentials to access your dashboard.</p>
            </div>

            <form onSubmit={handleSignIn} className="flex flex-col gap-6">
              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#dfe3ea]" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bfc7d3] group-focus-within:text-[#1197e8] transition-colors" style={{ fontSize: '20px' }}>mail</span>
                  <input 
                    required
                    className="w-full bg-[#0f1419] border border-[#3f4851] text-sm text-[#dfe3ea] rounded-xl pl-10 pr-4 py-3 outline-none transition-all focus:border-[#1197e8] focus:ring-2 focus:ring-[#1197e8]/20 placeholder:text-[#bfc7d3]/40" 
                    id="email" 
                    placeholder="name@company.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-[#dfe3ea]" htmlFor="password">Password</label>
                  <Link className="text-xs font-bold text-[#1197e8] hover:underline" href="#">Forgot password?</Link>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#bfc7d3] group-focus-within:text-[#1197e8] transition-colors" style={{ fontSize: '20px' }}>lock</span>
                  <input 
                    required
                    className="w-full bg-[#0f1419] border border-[#3f4851] text-sm text-[#dfe3ea] rounded-xl pl-10 pr-4 py-3 outline-none transition-all focus:border-[#1197e8] focus:ring-2 focus:ring-[#1197e8]/20 placeholder:text-[#bfc7d3]/40" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1197e8] text-white text-sm font-bold rounded-xl py-3.5 transition-all hover:bg-[#0088cc] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-[#1197e8]/20 mt-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <>
                    Sign In
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px bg-[#3f4851] flex-1"></div>
              <span className="text-[10px] text-[#bfc7d3] uppercase tracking-widest font-bold">Or continue with</span>
              <div className="h-px bg-[#3f4851] flex-1"></div>
            </div>

            {/* Secondary Auth Actions */}
            <div className="mt-6 flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#3f4851] rounded-xl text-xs font-bold text-[#dfe3ea] transition-all hover:bg-[#31353b] active:scale-95">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#3f4851] rounded-xl text-xs font-bold text-[#dfe3ea] transition-all hover:bg-[#31353b] active:scale-95">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                </svg>
                GitHub
              </button>
            </div>
          </div>

          <div className="mt-8 text-center px-4">
            <p className="text-[10px] text-[#bfc7d3] leading-relaxed">
              By continuing, you agree to Slotify&apos;s <Link className="text-[#1197e8] hover:underline" href="#">Terms of Service</Link> and <Link className="text-[#1197e8] hover:underline" href="#">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
