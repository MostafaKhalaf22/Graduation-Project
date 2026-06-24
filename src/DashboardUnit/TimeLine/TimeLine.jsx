import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, Shield, Clock, Radio, Bell, Settings, LogOut, 
  FileText, Activity, Layers3, Video, Info, Download, 
  Filter, Play, MoreVertical, CheckCircle2, Mic, ShieldAlert 
} from 'lucide-react';

const TimeLine = () => {
  const navigate = useNavigate();

  // مصفوفة التابات لتسهيل التنقل والتحكم في الحالة النشطة
  const tabs = [
    { name: 'Dashboard', path: '/unit/dashboard' },
    { name: 'Incident Detail', path: '/unit/incident-detail' },
    { name: 'Timeline', path: '/unit/timeline' },
    { name: 'IoT Alerts', path: '/unit/iot-alerts' },
    { name: 'Dispatch', path: '/unit/dispatch' }
  ];

  const timelineEvents = [
    { id: 1, type: 'SOS', title: 'SOS Triggered', status: 'Critical', time: '14:02:05', desc: 'Panic button activated via Citizen App. User coordinates received immediately.', device: 'iPhone 13 Pro', signal: 'Strong' },
    { id: 2, type: 'Location', title: 'Location Triangulated', time: '14:02:10', desc: 'Precision: ±5 meters. Sector 4 grid updated.' },
    { id: 3, type: 'Audio', title: 'Audio Recording Started', time: '14:03:00', desc: 'Evidence #A-01 - Source: User Device', link: 'Evidence #A-01', duration: '00:03:42' },
    { id: 4, type: 'Dispatch', title: 'Units Dispatched', time: '14:05:22', desc: 'Unit 4-A and Unit 4-B assigned', units: ['Unit 4-A', 'Unit 4-B'] },
    { id: 5, type: 'Suspect Apprehended', title: 'Suspect Apprehended', time: '14:15:00', desc: 'Suspect in custody without incident. Weapon recovered.', success: true }
  ];

  return (
    <div className="flex flex-col h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      
      {/* --- Navbar Section (With Functional Navigation) --- */}
      <header className="h-[65px] bg-[#020617] border-b border-slate-800/50 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              <Shield size={20} className="text-white fill-white/20" />
            </div>
            <div>
              <h1 className="text-[13px] font-[900] text-white leading-none tracking-tight uppercase italic">Emergency Response Command</h1>
              <p className="text-[9px] text-slate-500 mt-1 font-bold tracking-tighter uppercase opacity-70 italic">Multi-Agency Dispatch</p>
            </div>
          </div>

          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const isActive = tab.name === 'Timeline';
              return (
                <button
                  key={tab.name}
                  onClick={() => navigate(tab.path)}
                  className={`px-4 py-1.5 rounded-md text-[11px] font-[800] transition-all flex items-center gap-2 tracking-wide
                    ${isActive 
                      ? 'bg-[#1e293b] text-white border border-slate-700 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}
                  `}
                >
                  {isActive && <span className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></span>}
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-[11px] font-bold text-slate-400 tracking-tighter uppercase">10:03:55 AM • FEB 3, 2026</span>
          <div className="flex items-center gap-4 border-l border-slate-800 pl-6 h-8">
            <Bell size={18} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
            <div className="flex items-center gap-3 ml-2 border-l border-slate-800 pl-4">
               <div className="text-right">
                  <p className="text-[11px] font-black text-white leading-none">M. Mahmoud</p>
                  <p className="text-[8px] text-slate-500 mt-1 font-bold uppercase tracking-tighter">Dispatcher #01</p>
               </div>
               <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" className="w-8 h-8 rounded-full border border-slate-700 object-cover shadow-lg" alt="profile" />
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Dashboard Container --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* --- LEFT SIDEBAR (Incident Info) --- */}
        <aside className="w-[280px] bg-[#020617] border-r border-slate-800/40 p-5 overflow-y-auto flex flex-col shrink-0">
          <div className="mb-4 flex justify-between items-center">
             <span className="bg-emerald-500/10 text-emerald-500 text-[9px] px-2 py-0.5 rounded font-black border border-emerald-500/20 uppercase tracking-tighter">Resolved</span>
             <Layers3 size={16} className="text-slate-600" />
          </div>
          
          <h2 className="text-3xl font-black text-white tracking-tighter">#992-Alpha</h2>
          <p className="text-[11px] text-slate-500 font-bold uppercase mb-4 tracking-wide">Armed Robbery • Class A</p>
          
          <div className="rounded-xl overflow-hidden border border-slate-800 mb-5 relative shrink-0 h-28 shadow-inner group cursor-crosshair">
             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400" className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-110 transition-transform duration-700" alt="map" />
             <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                <MapPin size={12} className="text-blue-500" />
                <span className="text-[10px] font-bold tracking-tight">4200 5th Ave, Sector 4</span>
             </div>
          </div>

          <div className="space-y-6 flex-1">
             <div>
                <h4 className="text-[10px] uppercase font-black text-slate-600 mb-3 tracking-widest">Authorities</h4>
                <div className="flex items-center gap-3 bg-[#0f172a]/60 p-3 rounded-xl border border-slate-800 shadow-sm">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-[10px] text-white uppercase leading-none">JM</div>
                   <div>
                     <p className="text-[11px] font-black text-white leading-none tracking-tight">Sgt. J. Miller</p>
                     <p className="text-[9px] text-slate-500 uppercase mt-1 font-bold tracking-tighter opacity-80">Unit 4-A • Patrol</p>
                   </div>
                </div>
             </div>

             <div className="border-t border-slate-800/60 pt-6 space-y-3">
               {[
                 { label: 'Date', val: 'Oct 24, 2023' }, 
                 { label: 'Duration', val: '45 mins' }, 
                 { label: 'Source', val: 'Citizen App SOS' }
               ].map((item, idx) => (
                 <div key={idx} className="flex justify-between items-center text-[10px]">
                   <span className="text-slate-600 font-black uppercase tracking-widest">{item.label}</span>
                   <span className="font-black text-slate-300">{item.val}</span>
                 </div>
               ))}
             </div>
          </div>

          <button className="w-full mt-6 bg-slate-900/50 border border-slate-800 text-slate-500 py-3 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest shrink-0 hover:bg-slate-800 hover:text-slate-300 transition-all">
            <FileText size={14} /> Archive Case
          </button>
        </aside>

        {/* --- CENTER: TIMELINE (Main View) --- */}
        <main className="flex-1 bg-[#020617] px-10 py-6 overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-[900] text-white tracking-tight leading-none">Incident Timeline</h1>
              <p className="text-slate-500 text-xs mt-1.5 italic opacity-70 tracking-tight">Chronological audit trail of events</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-[#1e293b]/40 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase border border-slate-800/60 hover:bg-[#1e293b]/60 transition-all shadow-sm">
                <Filter size={14} className="inline mr-1"/> Filter
              </button>
              <button className="bg-[#1e293b]/40 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase border border-slate-800/60 flex items-center gap-2 hover:bg-[#1e293b]/60 transition-all shadow-sm">
                <Download size={14}/> Export Log
              </button>
            </div>
          </div>

          <div className="relative ml-4">
            <div className="absolute left-[7.5px] top-0 bottom-0 w-[2px] bg-slate-800/40 shadow-[0_0_15px_rgba(30,41,59,0.3)]"></div>
            <div className="space-y-4 relative">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="relative z-10 mt-2">
                    <div className={`w-4 h-4 rounded-full border-2 border-[#020617] shadow-lg transition-transform group-hover:scale-125 duration-300 ${event.success ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-blue-600 shadow-[0_0_10px_#2563eb]'}`}></div>
                  </div>
                  <div className="flex-1 bg-[#0f172a]/20 border border-slate-800/40 rounded-2xl p-4 hover:bg-[#0f172a]/30 transition-all duration-300 shadow-sm hover:border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-[15px] font-[800] text-white tracking-tight leading-none">{event.title}</h3>
                        {event.status && <span className="bg-red-600 text-white text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-tighter">{event.status}</span>}
                      </div>
                      <span className="text-[11px] font-mono text-slate-600 font-bold">{event.time}</span>
                    </div>
                    <p className="text-[13px] text-slate-400 font-medium opacity-90 leading-relaxed mb-2">{event.desc}</p>
                    {event.units && (
                      <div className="flex gap-2">
                        {event.units.map(u => (
                          <span key={u} className="bg-blue-600/10 text-blue-400 text-[9px] px-3 py-1 rounded-full border border-blue-600/20 font-black uppercase tracking-tighter shadow-sm">● {u}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* --- RIGHT SIDEBAR (Evidence Log) --- */}
        <aside className="w-[380px] bg-[#020617] border-l border-slate-800/60 p-7 overflow-y-auto flex flex-col shrink-0 custom-scrollbar">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-[13px] font-black uppercase text-white tracking-[0.2em] opacity-90">Evidence Log</h3>
             <MoreVertical size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
          </div>

          <div className="space-y-6 flex-1">
             {/* 1. Video Evidence */}
             <div className="group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 mb-3 shadow-2xl bg-slate-900/40">
                   <img src="https://images.unsplash.com/photo-1557597774-9d2739f85a94?w=400" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700" alt="bodycam" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-blue-600/30 transition-all shadow-xl">
                         <Play size={20} className="text-white fill-white shadow-lg" />
                      </div>
                   </div>
                   <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded text-[8px] font-black uppercase animate-pulse shadow-lg">REC</div>
                </div>
                <div className="flex justify-between px-1">
                   <div>
                      <p className="text-[12px] font-black text-white uppercase tracking-tight leading-none">Bodycam Footage #1</p>
                      <p className="text-[9px] text-slate-600 mt-2 uppercase font-black italic tracking-tighter opacity-80">Sgt. Miller • 14:16:05</p>
                   </div>
                   <span className="text-[9px] text-slate-700 font-black tracking-tighter uppercase">MP4</span>
                </div>
             </div>

             {/* 2. Call Transcript */}
             <div className="bg-[#1e293b]/20 border border-slate-800/60 rounded-2xl p-5 relative group hover:border-blue-500/40 transition-all duration-500 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-600/20 rounded-lg shadow-inner"><Mic size={16} className="text-blue-500" /></div>
                   <div>
                      <p className="text-[12px] font-black text-white leading-none tracking-tight">911 Call Transcript</p>
                      <p className="text-[9px] text-slate-600 mt-1 uppercase font-black italic tracking-tighter opacity-80">Auto-generated • 14:02:45</p>
                   </div>
                   <CheckCircle2 size={16} className="ml-auto text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                </div>
                <div className="h-1 w-full bg-slate-800/50 rounded-full mb-4 overflow-hidden border border-slate-800/20 shadow-inner">
                   <div className="w-2/3 h-full bg-blue-600 rounded-full shadow-[0_0_12px_rgba(37,99,235,0.6)]"></div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic font-medium px-1">"Suspect is heading north on 5th Ave, wearing a dark hoodie..."</p>
                <button className="text-[9px] text-blue-500 font-black uppercase mt-3 hover:text-blue-400 underline underline-offset-4 tracking-tighter">Read Full Transcript</button>
             </div>

             {/* 3. IoT Grid */}
             <div className="group cursor-pointer">
                <div className="grid grid-cols-4 gap-1.5 mb-4 px-0.5">
                   {[1,2,3,4,5,6,7,8].map(i => (
                     <div key={i} className="aspect-square bg-[#0a0f1e] rounded-lg border border-slate-800 flex items-center justify-center hover:bg-[#0f172a] hover:border-slate-700 transition-all duration-300 group/icon shadow-inner">
                       <Video size={14} className="text-slate-700 group-hover:text-slate-500 group-hover/icon:text-blue-500 transition-colors" />
                     </div>
                   ))}
                </div>
                <div className="px-1">
                   <p className="text-[12px] font-black text-white uppercase tracking-tight leading-none">IoT Camera #442</p>
                   <p className="text-[9px] text-slate-600 mt-2 uppercase font-black italic tracking-tighter opacity-80">License Plate Capture • 14:10:12</p>
                </div>
             </div>
          </div>

          {/* Report Button */}
          <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-[12px] uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition-all flex items-center justify-center gap-3 shrink-0 active:scale-95 group">
             <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> Export Full Report (PDF)
          </button>
        </aside>

      </div>
    </div>
  );
};

export default TimeLine;