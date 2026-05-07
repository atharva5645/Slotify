import Link from "next/link";

export default function DocsPage() {
  const endpoints = [
    { method: 'POST', path: '/api/meetings/create', desc: 'Create a new meeting with attendee validation.' },
    { method: 'POST', path: '/api/meetings/check-availability', desc: 'Check user availability for a time slot.' },
    { method: 'GET', path: '/api/meetings/upcoming', desc: 'Fetch upcoming meetings for a user.' },
    { method: 'POST', path: '/api/booking/create-link', desc: 'Generate a shareable booking link.' },
    { method: 'POST', path: '/api/tasks/create', desc: 'Assign tasks based on meeting outcomes.' },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/10 p-8 hidden lg:block sticky top-0 h-screen overflow-y-auto">
        <Link href="/" className="text-xl font-black tracking-tighter mb-12 block">
          SLOTIFY <span className="text-blue-500">CORE</span>
        </Link>
        
        <nav className="space-y-8">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Getting Started</h4>
            <div className="space-y-2">
              {['Introduction', 'Authentication', 'Errors'].map(item => (
                <a key={item} href="#" className="block text-sm font-bold text-zinc-400 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Core Resources</h4>
            <div className="space-y-2">
              {['Meetings', 'Booking', 'Tasks', 'Notifications'].map(item => (
                <a key={item} href="#" className="block text-sm font-bold text-zinc-400 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 max-w-5xl">
        <div className="mb-16">
          <Link href="/" className="lg:hidden text-xl font-black tracking-tighter mb-8 block">
            SLOTIFY <span className="text-blue-500">CORE</span>
          </Link>
          <h1 className="text-5xl font-black tracking-tight mb-4">API Documentation</h1>
          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            Everything you need to integrate with the Slotify orchestration engine.
          </p>
        </div>

        <section className="space-y-12">
          <div className="p-8 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-sm">
            <h2 className="text-2xl font-black mb-4">Authentication</h2>
            <p className="text-zinc-400 mb-6 font-medium">All API requests must include your API Key in the <code className="bg-zinc-800 px-2 py-1 rounded text-blue-400">Authorization</code> header.</p>
            <div className="bg-zinc-900 p-4 rounded-2xl font-mono text-sm text-zinc-300 border border-white/5">
              Authorization: Bearer YOUR_API_KEY
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black">Endpoints</h2>
            <div className="grid gap-4">
              {endpoints.map((ep) => (
                <div key={ep.path} className="group p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/[0.02] transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`text-[10px] font-black px-2 py-1 rounded ${ep.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {ep.method}
                    </span>
                    <code className="text-sm font-black text-white">{ep.path}</code>
                  </div>
                  <p className="text-sm text-zinc-400 font-medium">{ep.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-32 pt-8 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
          © 2024 Slotify Engine. Build with confidence.
        </footer>
      </main>
    </div>
  );
}
