import Image from "next/image";
import Link from "next/link";

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
              <span className="material-symbols-outlined text-primary icon-fill text-[28px]">all_inclusive</span>
              <span className="tracking-tighter uppercase">Slotify</span>
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

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center py-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-outline bg-surface-container mb-10 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#a0d0c8] animate-pulse shadow-[0_0_8px_rgba(160,208,200,0.5)]"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface">Slotify 2.0 is now live</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter max-w-5xl mb-8 leading-[0.95]">
            Master your time with <span className="text-primary">smart slots</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed font-medium">
            The high-performance scheduling environment built for teams where clarity and speed are paramount. Reclaim your deep work hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/login" className="bg-primary hover:opacity-90 text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/30 active:scale-95">
              Start Scheduling Free
            </Link>
            <button className="flex items-center gap-3 px-10 py-5 rounded-full border border-outline text-sm font-black uppercase tracking-widest hover:bg-surface-container transition-all active:scale-95">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full max-w-6xl aspect-video rounded-[40px] border-4 border-outline bg-surface-container overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.4)] relative group animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="flex h-full bg-background/50">
              {/* Mock Sidebar */}
              <div className="w-56 border-r border-outline p-6 flex flex-col gap-6">
                <div className="h-6 w-32 bg-surface rounded-lg opacity-20"></div>
                <div className="h-10 w-full bg-primary/20 rounded-xl flex items-center px-3 border border-primary/30">
                  <div className="h-5 w-5 bg-primary rounded-md mr-3"></div>
                  <div className="h-2 w-20 bg-primary rounded-full"></div>
                </div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 w-full bg-surface rounded-xl border border-outline/30 opacity-40"></div>
                  ))}
                </div>
              </div>
              {/* Mock Content */}
              <div className="flex-1 p-8 flex flex-col gap-8">
                <div className="flex justify-between items-center">
                  <div className="h-8 w-48 bg-surface rounded-xl opacity-30"></div>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 bg-surface rounded-xl border border-outline/30"></div>
                    <div className="h-10 w-10 bg-primary rounded-xl"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8 h-full pb-10">
                  <div className="space-y-4 col-span-2">
                    <div className="h-40 w-full bg-surface-container/50 rounded-3xl border border-outline/50 p-6">
                       <div className="h-4 w-1/3 bg-primary/20 rounded mb-4"></div>
                       <div className="h-2 w-full bg-outline/20 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-32 w-full bg-surface rounded-3xl border border-outline/30"></div>
                       <div className="h-32 w-full bg-surface rounded-3xl border border-outline/30"></div>
                    </div>
                  </div>
                  <div className="h-full w-full bg-surface-container rounded-[32px] border border-outline/50 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-40">
          <div className="mb-20">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Engineered for <span className="text-primary">Efficiency</span></h2>
            <p className="text-xl text-on-surface-variant max-w-xl font-medium">Powerful tools designed to minimize friction and maximize your team&apos;s output.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 p-10 rounded-[40px] border border-outline bg-surface-container/50 hover:border-primary/50 transition-all group relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
              <span className="material-symbols-outlined text-5xl text-primary mb-8">calendar_month</span>
              <h3 className="text-3xl font-black mb-4">Intelligent Scheduling</h3>
              <p className="text-on-surface-variant mb-10 max-w-md font-medium">Our algorithm automatically finds the perfect slots for deep work and meetings across time zones.</p>
              <div className="h-48 w-full bg-background rounded-3xl border border-outline relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-2/3 h-px bg-outline/30"></div>
                   <div className="absolute w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_var(--color-primary)]"></div>
                </div>
              </div>
            </div>
            <div className="p-10 rounded-[40px] border border-outline bg-surface-container/50 hover:border-[#a0d0c8]/50 transition-all">
              <span className="material-symbols-outlined text-5xl text-[#a0d0c8] mb-8">group</span>
              <h3 className="text-3xl font-black mb-4">Team Sync</h3>
              <p className="text-on-surface-variant font-medium">See who&apos;s working on what in real-time. Resolve conflicts before they happen.</p>
            </div>
            <div className="p-10 rounded-[40px] border border-outline bg-surface-container/50 hover:border-[#ffb778]/50 transition-all">
              <span className="material-symbols-outlined text-5xl text-[#ffb778] mb-8">bolt</span>
              <h3 className="text-3xl font-black mb-4">Rapid Entry</h3>
              <p className="text-on-surface-variant font-medium">Use natural language processing to add tasks in seconds.</p>
            </div>
            <div className="md:col-span-2 p-10 rounded-[40px] border border-outline bg-surface-container/50 hover:border-primary/50 transition-all flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <span className="material-symbols-outlined text-5xl text-primary mb-8">insights</span>
                <h3 className="text-3xl font-black mb-4">Deep Analytics</h3>
                <p className="text-on-surface-variant font-medium">Understand where your time goes. Generate reports to optimize your workflow and improve team velocity.</p>
              </div>
              <div className="w-40 h-40 rounded-full border-[12px] border-outline border-t-primary flex items-center justify-center relative">
                <span className="text-3xl font-black">84%</span>
                <div className="absolute -inset-2 rounded-full border border-primary/20 animate-ping opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

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

        {/* CTA Section */}
        <section className="bg-primary py-32 text-center px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter">Ready to reclaim your time?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">Join 10,000+ high-performance teams already using Slotify to master their workflows.</p>
          <Link href="/login" className="bg-white text-primary px-12 py-6 rounded-full text-sm font-black uppercase tracking-[0.2em] hover:shadow-[0_20px_50px_rgba(255,255,255,0.3)] transition-all inline-block active:scale-95">
            Create Your Account
          </Link>
        </section>
      </main>

      <footer className="border-t border-outline py-24 bg-surface-container/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary icon-fill text-[32px]">all_inclusive</span>
              <span className="tracking-tighter uppercase">Slotify</span>
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
