import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const metadata = {
  title: "Slotify - Master Your Time",
  description: "Experience the next generation of time management with Slotify's smart scheduling and intuitive tasks dashboard.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background selection:bg-primary/30 font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-outline bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black flex items-center gap-2">
              <span className="material-symbols-outlined text-primary icon-fill text-[28px]">event_available</span>
              <span className="tracking-tighter">Slotify</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Features</Link>
              <Link href="#solutions" className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Solutions</Link>
              <Link href="#pricing" className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">Pricing</Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">Log in</Link>
            <Link href="/login" className="bg-primary hover:opacity-90 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-primary/20">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-blue-400/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center py-20 relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-outline bg-surface-container mb-10 animate-fade-in mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#a0d0c8] animate-pulse shadow-[0_0_8px_rgba(160,208,200,0.5)]"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Slotify 2.0 is now live</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl mx-auto mb-8 leading-[0.95]">
            Master your time with <span className="text-primary">smart slots</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-[700px] mx-auto mb-12 leading-relaxed font-medium">
            The high-performance scheduling environment built for teams where clarity and speed are paramount. Reclaim your deep work hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/login" className="bg-primary hover:opacity-90 text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/30 active:scale-95">
              Start Scheduling Free
            </Link>
          </div>

          {/* Product Showcase / Dashboard Preview */}
          <div className="w-full max-w-6xl mx-auto rounded-[40px] border-4 border-outline bg-surface-container overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative group animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-surface-container aspect-video relative overflow-hidden flex flex-col md:flex-row">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Product Info Panel */}
              <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-outline/50 p-8 flex flex-col justify-between bg-surface-container-low/50 backdrop-blur-xl text-left">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-primary font-bold">verified</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Core Experience</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight leading-tight">One platform for your entire workflow.</h3>
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-8">Slotify isn&apos;t just a calendar. It&apos;s a high-performance environment where tasks, meetings, and team velocity converge.</p>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                      <span className="text-[11px] font-bold text-on-surface">AI-Powered Slot Optimization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                      <span className="text-[11px] font-bold text-on-surface">Real-time Team Sync</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                      <span className="text-[11px] font-bold text-on-surface">Integrated Task Management</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-outline/30">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-outline/20"></div>
                      ))}
                    </div>
                    <span className="text-[9px] font-black text-on-surface-variant uppercase tracking-widest">Trusted by 2k+ Teams</span>
                  </div>
                </div>
              </div>

              {/* Visual Preview */}
              <div className="flex-1 p-8 bg-surface-container-lowest/30 relative overflow-hidden">
                <div className="w-full h-full rounded-2xl border border-outline/50 bg-surface shadow-inner overflow-hidden relative">
                   {/* Simplified Dashboard Mock */}
                   <div className="absolute inset-0 flex flex-col">
                      <div className="h-12 border-b border-outline/30 flex items-center px-4 gap-4 bg-surface-container/20">
                         <div className="w-24 h-3 bg-outline/20 rounded-full"></div>
                         <div className="w-16 h-3 bg-outline/10 rounded-full ml-auto"></div>
                      </div>
                      <div className="flex-1 flex">
                         <div className="w-40 border-r border-outline/30 p-4 space-y-3 hidden sm:block">
                            {[1,2,3,4].map(i => <div key={i} className="w-full h-2.5 bg-outline/10 rounded-full"></div>)}
                         </div>
                         <div className="flex-1 p-6 space-y-6">
                            <div className="h-28 bg-primary/5 rounded-2xl border border-primary/10 flex items-center px-6 relative overflow-hidden">
                               <div className="absolute left-0 top-0 w-1 h-full bg-primary"></div>
                               <div className="w-full space-y-3">
                                  <div className="w-1/3 h-4 bg-primary/20 rounded-md"></div>
                                  <div className="w-2/3 h-2.5 bg-primary/10 rounded-full"></div>
                               </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                               <div className="h-32 bg-outline/5 rounded-2xl border border-outline/20"></div>
                               <div className="h-32 bg-outline/5 rounded-2xl border border-outline/20"></div>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   {/* Floating Feature Highlight */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-primary rounded-2xl shadow-2xl shadow-primary/40 text-white flex items-center gap-4 border border-white/20 z-20">
                      <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                      <div className="text-left">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-80">AI Suggestion</p>
                        <p className="text-sm font-bold">3 Optimized Slots Found</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section removed as per request */}

        {/* Pricing Section */}
        <section id="pricing" className="max-w-7xl mx-auto px-6 py-40 border-t border-outline">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Choose Your Pace</h2>
            <p className="text-xl text-on-surface-variant font-medium">Simple, transparent pricing for teams of all sizes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Starter", price: "0", features: ["Up to 5 Smart Slots", "Basic Tasks", "Community Support"], color: "border-outline" },
              { name: "Pro", price: "12", features: ["Unlimited Smart Slots", "Team Sync", "Advanced Analytics", "Priority Support"], color: "border-primary bg-primary/5 shadow-[0_30px_60px_rgba(17,151,232,0.15)]", popular: true },
              { name: "Enterprise", price: "Custom", features: ["SSO & Security", "Custom Integrations", "Dedicated Manager", "SLA Guarantee"], color: "border-outline" }
            ].map((plan) => (
              <div key={plan.name} className={`p-12 rounded-[48px] border flex flex-col ${plan.color} relative transition-all hover:translate-y-[-8px]`}>
                {plan.popular && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl">Most Popular</span>
                )}
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-5xl font-black">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-on-surface-variant font-bold">/mo</span>}
                </div>
                <ul className="space-y-5 mb-12 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-4 text-sm font-bold text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px] text-primary">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className={`w-full py-5 rounded-[24px] text-center text-xs font-black uppercase tracking-widest transition-all active:scale-95 ${plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-surface-container text-on-surface hover:bg-surface border border-outline'}`}>
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started Now"}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section removed as per request */}
      </main>

      <footer className="border-t border-outline py-24 bg-surface-container/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary icon-fill text-[32px]">event_available</span>
              <span className="tracking-tighter">Slotify</span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed font-medium">The next generation scheduling environment for high-performance teams. Built for clarity and speed.</p>
          </div>
          <div className="grid grid-cols-2 md:col-span-3 gap-12">
            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-on-surface">Product</h4>
              <nav className="flex flex-col gap-3 text-sm font-bold text-on-surface-variant">
                <Link href="#" className="hover:text-primary transition-colors">Features</Link>
                <Link href="#" className="hover:text-primary transition-colors">Integrations</Link>
                <Link href="#" className="hover:text-primary transition-colors">Pricing</Link>
                <Link href="#" className="hover:text-primary transition-colors">API Reference</Link>
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] text-on-surface">Company</h4>
              <nav className="flex flex-col gap-3 text-sm font-bold text-on-surface-variant">
                <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-primary transition-colors">Contact Support</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-outline/30 text-center text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">
          © 2024 Slotify Inc. Engineered for performance.
        </div>
      </footer>
    </div>
  );
}
