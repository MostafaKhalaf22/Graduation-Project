import React from 'react';
import { 
  Bell, CheckCircle2, Clock, AlertCircle, 
  Info, Shield, Trash2, ChevronRight, Filter,
  Settings, LogOut, LayoutDashboard, FileText, 
  GitMerge, Radio, Send
} from 'lucide-react';

const UnitNotifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Critical: IoT Sensor Breach",
      desc: "Sensor SN-442 detected high impact collision at Sector 7.",
      time: "2m ago",
      type: "critical",
      icon: <AlertCircle className="text-red-500" size={16} />,
      bg: "bg-red-500/5",
      border: "border-red-500/20"
    },
    {
      id: 2,
      title: "Dispatch Acknowledged",
      desc: "Unit 4-A (Sgt. Miller) has confirmed the dispatch request.",
      time: "15m ago",
      type: "info",
      icon: <Shield className="text-blue-500" size={16} />,
      bg: "bg-blue-500/5",
      border: "border-blue-600/20"
    }
  ];

  return (
    <div className="flex flex-col bg-[#020617] min-h-screen text-slate-400 font-sans selection:bg-blue-500/30">
      
      {/* --- Main Header (Top Row) --- */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-800/40 bg-[#020617]">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Shield className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-none uppercase">Emergency Response Command</h1>
            <span className="text-[10px] text-slate-500 font-medium tracking-tight">Multi-Agency Dispatch & Incident Management</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[11px] font-mono text-slate-500">10:04:45 AM • FEB 3, 2026</span>
          <div className="flex items-center gap-2 border-l border-slate-800/60 pl-6">
            <button className="p-2 bg-blue-600/10 text-blue-500 rounded-lg border border-blue-600/20">
              <Bell size={18} />
            </button>
            <button className="p-2 hover:bg-slate-800/40 text-slate-500 rounded-lg transition-colors">
              <Settings size={18} />
            </button>
            <button className="p-2 hover:bg-slate-800/40 text-slate-500 rounded-lg transition-colors">
              <LogOut size={18} />
            </button>
            <div className="w-8 h-8 rounded-full border border-slate-700 overflow-hidden ml-2">
               <img src="https://via.placeholder.com/150" alt="Admin" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
          </div>
        </div>
      </header>

      {/* --- Sub-Navbar --- */}
      <nav className="flex items-center gap-8 px-6 py-1 border-b border-slate-800/30 bg-[#020617]">
        {[
          { label: 'Dashboard', icon: <LayoutDashboard size={14} /> },
          { label: 'Incident Detail', icon: <FileText size={14} /> },
          { label: 'Timeline', icon: <GitMerge size={14} /> },
          { label: 'IoT Alerts', icon: <Radio size={14} />, active: true },
          { label: 'Dispatch', icon: <Send size={14} /> },
        ].map((item, idx) => (
          <button key={idx} className={`flex items-center gap-2 text-[11px] font-bold py-3 px-1 relative group transition-colors ${item.active ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
            {item.icon}
            {item.label}
            {item.active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>}
          </button>
        ))}
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-1 p-8 bg-[#020617]">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="flex items-center gap-5">
               <div className="p-1 border border-blue-500/20 rounded-full">
                  <div className="p-3 bg-blue-600/5 rounded-full">
                    <Bell className="text-blue-500" size={28} />
                  </div>
               </div>
               <div>
                <h2 className="text-2xl font-black text-white tracking-tighter uppercase italic">Notifications</h2>
                <p className="text-slate-600 text-[10px] font-bold tracking-[0.1em] mt-1 uppercase opacity-80">Operational alerts and system intelligence</p>
               </div>
            </div>
            
            <div className="flex gap-2">
               <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-md text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/10 transition-all">Mark all read</button>
               <button className="bg-[#111827] hover:bg-slate-800 text-slate-400 px-5 py-2 rounded-md text-[10px] font-black uppercase tracking-widest border border-slate-800 transition-all">Clear all</button>
            </div>
          </div>

          <div className="flex gap-2 mb-8 border-b border-slate-800/40 pb-4">
            {['All', 'Unread', 'Critical'].map((tab, i) => (
              <button key={i} className={`px-5 py-1.5 rounded-md text-[10px] font-black uppercase tracking-[0.15em] transition-all ${i === 0 ? 'bg-[#1e293b] text-white' : 'text-slate-600 hover:text-slate-400'}`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div key={notif.id} className={`group relative p-4 rounded-xl border ${notif.border} bg-[#0a0f1e]/40 hover:bg-[#0a0f1e]/80 transition-all duration-300`}>
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="mt-1 p-2 bg-[#020617] rounded-lg border border-slate-800/50">{notif.icon}</div>
                      <div>
                        <h3 className="text-[13px] font-bold text-slate-200 tracking-tight">{notif.title}</h3>
                        <p className="text-slate-500 text-[11px] mt-1 leading-relaxed max-w-lg font-medium">{notif.desc}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-600 uppercase tracking-[0.1em]">
                            <Clock size={10} /> {notif.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-slate-800 group-hover:text-slate-400 transition-all" size={16} />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 flex flex-col items-center justify-center border border-dashed border-slate-800/50 rounded-3xl">
                <CheckCircle2 size={40} className="text-slate-800 mb-3" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">No notifications detected</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="px-6 py-2 border-t border-slate-800/30 bg-[#020617] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-green-500 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">System Online</span>
          </div>
          <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Latency: 24ms</span>
        </div>
        <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest italic">v4.2.0-stable</span>
      </footer>
    </div>
  );
};

export default UnitNotifications;