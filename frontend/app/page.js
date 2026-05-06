import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Slotify - Master Your Time",
  description: "Experience the next generation of time management with Slotify's smart scheduling and intuitive tasks dashboard.",
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b1026] text-white selection:bg-[#1197e8]/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-[#2d3656] bg-[#0b1026]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[#97cbff] icon-fill">all_inclusive</span>
              <span>Slotify</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-sm font-medium text-[#bfc7d3] hover:text-white transition-colors">Features</Link>
              <Link href="#solutions" className="text-sm font-medium text-[#bfc7d3] hover:text-white transition-colors">Solutions</Link>
              <Link href="#pricing" className="text-sm font-medium text-[#bfc7d3] hover:text-white transition-colors">Pricing</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-[#bfc7d3] hover:text-white transition-colors">Log in</Link>
            <Link href="/login" className="bg-[#1197e8] hover:bg-[#0088cc] text-white px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2d3656] bg-[#161b33] mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#a0d0c8] animate-pulse"></span>
            <span className="text-xs font-medium text-[#a0d0c8]">Slotify 2.0 is now live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6">
            Master your time with <span className="text-[#1197e8]">smart slots</span>
          </h1>
          <p className="text-lg md:text-xl text-[#bfc7d3] max-w-2xl mb-10 leading-relaxed">
            The high-performance scheduling environment built for teams where clarity and speed are paramount. Reclaim your deep work hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/login" className="bg-[#1197e8] hover:bg-[#0088cc] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-[0_0_20px_rgba(17,151,232,0.3)] active:scale-95">
              Start Scheduling Free
            </Link>
            <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2d3656] text-lg font-semibold hover:bg-[#161b33] transition-all">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full max-w-5xl aspect-video rounded-2xl border border-[#2d3656] bg-[#0f1419] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1026] via-transparent to-transparent z-10"></div>
            <div className="flex h-full">
              {/* Mock Sidebar */}
              <div className="w-48 border-r border-[#2d3656] p-4 flex flex-col gap-4">
                <div className="h-4 w-24 bg-[#161b33] rounded"></div>
                <div className="h-8 w-full bg-[#1197e8]/10 rounded flex items-center px-2">
                  <div className="h-4 w-4 bg-[#1197e8] rounded-full mr-2"></div>
                  <div className="h-2 w-16 bg-[#1197e8]/50 rounded"></div>
                </div>
                <div className="h-8 w-full bg-[#161b33] rounded"></div>
                <div className="h-8 w-full bg-[#161b33] rounded"></div>
              </div>
              {/* Mock Content */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="h-6 w-32 bg-[#161b33] rounded"></div>
                  <div className="h-8 w-8 bg-[#161b33] rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-24 w-full bg-[#161b33] rounded-xl border border-[#2d3656]"></div>
                    <div className="h-24 w-full bg-[#161b33] rounded-xl border border-[#2d3656]"></div>
                  </div>
                  <div className="h-full w-full bg-[#161b33] rounded-xl border border-[#2d3656]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-32">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">Engineered for Efficiency</h2>
            <p className="text-xl text-[#bfc7d3] max-w-xl">Powerful tools designed to minimize friction and maximize your team&apos;s output.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-2xl border border-[#2d3656] bg-[#161b33] hover:border-[#1197e8]/50 transition-colors group">
              <span className="material-symbols-outlined text-4xl text-[#1197e8] mb-6">calendar_month</span>
              <h3 className="text-2xl font-bold mb-4">Intelligent Scheduling</h3>
              <p className="text-[#bfc7d3] mb-8 max-w-md">Our algorithm automatically finds the perfect slots for deep work and meetings across time zones.</p>
              <div className="h-40 w-full bg-[#0b1026] rounded-xl border border-[#2d3656] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1197e8]/20 to-transparent"></div>
              </div>
            </div>
            <div className="p-8 rounded-2xl border border-[#2d3656] bg-[#161b33] hover:border-[#1197e8]/50 transition-colors">
              <span className="material-symbols-outlined text-4xl text-[#a0d0c8] mb-6">group</span>
              <h3 className="text-2xl font-bold mb-4">Team Sync</h3>
              <p className="text-[#bfc7d3]">See who&apos;s working on what in real-time. Resolve conflicts before they happen.</p>
            </div>
            <div className="p-8 rounded-2xl border border-[#2d3656] bg-[#161b33] hover:border-[#1197e8]/50 transition-colors">
              <span className="material-symbols-outlined text-4xl text-[#ffb778] mb-6">bolt</span>
              <h3 className="text-2xl font-bold mb-4">Rapid Entry</h3>
              <p className="text-[#bfc7d3]">Use natural language processing to add tasks in seconds.</p>
            </div>
            <div className="md:col-span-2 p-8 rounded-2xl border border-[#2d3656] bg-[#161b33] hover:border-[#1197e8]/50 transition-colors flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <span className="material-symbols-outlined text-4xl text-[#1197e8] mb-6">insights</span>
                <h3 className="text-2xl font-bold mb-4">Deep Analytics</h3>
                <p className="text-[#bfc7d3]">Understand where your time goes. Generate reports to optimize your workflow.</p>
              </div>
              <div className="w-32 h-32 rounded-full border-8 border-[#2d3656] border-t-[#1197e8] flex items-center justify-center">
                <span className="text-2xl font-bold">84%</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2d3656] py-12 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-bold">Slotify</div>
          <div className="flex gap-8 text-sm text-[#bfc7d3]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-sm text-[#bfc7d3]">© 2024 Slotify Inc.</div>
        </div>
      </footer>
    </div>
  );
}
