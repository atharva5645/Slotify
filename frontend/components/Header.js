import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "@/lib/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc, writeBatch } from "firebase/firestore";
import ThemeToggle from "./ThemeToggle";
import { prototypeStore } from "@/lib/prototypeStore";

export default function Header({ title, userProfile }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadProtoNotifs = () => {
      // Load proto notifications regardless of env flag for prototype demo purposes
      const protoNotifs = prototypeStore.getNotifications();
      setNotifications(prev => {
        // Merge and avoid duplicates by ID
        const existingIds = new Set(prev.map(n => n.id));
        const newNotifs = protoNotifs.filter(n => !existingIds.has(n.id));
        
        // Update unread status for existing ones if changed in storage
        const updatedPrev = prev.map(p => {
          const matchingProto = protoNotifs.find(pn => pn.id === p.id);
          return matchingProto ? { ...p, unread: matchingProto.unread } : p;
        });
        
        return [...newNotifs, ...updatedPrev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      });
    };

    // Initial load
    loadProtoNotifs();

    // Listen for custom proto events
    window.addEventListener('slotify-notif-added', loadProtoNotifs);

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Subscribe to notifications
        const q = query(
          collection(db, "notifications"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );

        const unsubscribeNotifications = onSnapshot(q, (snapshot) => {
          const firestoreNotifs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setNotifications(prev => {
            const protoOnly = prev.filter(n => String(n.id).startsWith('n-') || String(n.id).startsWith('proto-'));
            return [...protoOnly, ...firestoreNotifs];
          });
        });

        return () => {
          unsubscribeNotifications();
          window.removeEventListener('slotify-notif-added', loadProtoNotifs);
        };
      }
    });

    return () => {
      unsubscribeAuth();
      window.removeEventListener('slotify-notif-added', loadProtoNotifs);
    };
  }, []);

  const markAllAsRead = async () => {
    // Also mark prototype notifications as read
    prototypeStore.markNotificationsAsRead();
    
    if (!user || notifications.length === 0) return;
    
    try {
      const batch = writeBatch(db);
      notifications.forEach((n) => {
        if (n.unread && !String(n.id).startsWith('n-')) {
          const ref = doc(db, "notifications", n.id);
          batch.update(ref, { unread: false });
        }
      });
      await batch.commit();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex justify-between items-center w-full px-8 h-20 bg-surface border-b border-outline shrink-0 z-40 sticky top-0 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <button className="md:hidden text-on-surface-variant hover:text-on-surface transition-opacity">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-on-surface tracking-tight">{title || "Tasks Board"}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Active Workspace</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Integrated */}
        <div className="mr-2 scale-75 origin-right">
          <ThemeToggle />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-surface-container border border-outline flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container/80 transition-all relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              </span>
            )}
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-4 w-80 bg-surface border border-outline rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-outline flex justify-between items-center bg-surface-container/50">
                  <h3 className="font-bold text-sm text-on-surface">Notifications ({unreadCount})</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-[10px] font-black text-primary uppercase hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar bg-surface">
                  {notifications.length > 0 ? notifications.map((n) => (
                    <div key={n.id} className="p-4 border-b border-outline hover:bg-surface-container transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 
                          ${n.type === 'meeting' ? 'bg-primary/20 text-primary' : 
                            n.type === 'task' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'}`}>
                          <span className="material-symbols-outlined text-[18px]">
                            {n.type === 'meeting' ? 'mail' : n.type === 'task' ? 'assignment' : 'notifications'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate text-on-surface group-hover:text-primary transition-colors">{n.title}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{n.message}</p>
                          <p className="text-[9px] font-black text-on-surface-variant/50 uppercase mt-2 tracking-tighter">{formatTime(n.createdAt)}</p>
                        </div>
                        {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>}
                      </div>
                    </div>
                  )) : (
                    <div className="p-8 text-center">
                      <span className="material-symbols-outlined text-on-surface-variant/20 text-[48px] mb-2">notifications_off</span>
                      <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">No notifications</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Separator */}
        <div className="h-8 w-[1px] bg-outline mx-2 hidden lg:block"></div>

        {/* Profile */}
        <div className="flex items-center gap-4 pl-2 group">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[13px] font-bold text-on-surface tracking-wide">{userProfile?.full_name || "User"}</span>
            <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.1em]">ADMIN</span>
          </div>
          <div className="relative group/profile">
            <div className="w-10 h-10 rounded-xl border-2 border-outline p-[2px] hover:border-primary transition-all cursor-pointer">
              <div className="w-full h-full rounded-[7px] bg-surface-container flex items-center justify-center overflow-hidden">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant">person</span>
                )}
              </div>
            </div>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-outline rounded-2xl shadow-2xl opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all z-50 p-2">
              <button 
                onClick={async () => {
                  await signOut(auth);
                  window.location.href = "/login";
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-error hover:bg-error/5 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

  );
}
