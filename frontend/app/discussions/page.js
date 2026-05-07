"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Discussion from "@/components/Discussion";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function DiscussionsPage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const profileRes = await fetch(`/api/profiles/${user.uid}`);
          if (profileRes.ok) {
            setProfile(await profileRes.json());
          }
        } catch (err) {
          console.error("Discussions fetch error:", err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-on-background font-sans antialiased overflow-hidden h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 md:ml-64 relative h-screen overflow-hidden">
        <Header title="Team Discussions" userProfile={profile} />

        <div className="flex-1 flex flex-col p-4 md:p-8 max-w-[1200px] mx-auto w-full h-[calc(100vh-80px)]">
          <div className="bg-surface border border-outline rounded-3xl overflow-hidden flex flex-col h-full shadow-2xl">
            <div className="p-6 border-b border-outline bg-surface-container/30">
              <h2 className="text-xl font-black text-on-surface">Live Feed</h2>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-black mt-1">Real-time collaboration across workspace</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <Discussion />
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
