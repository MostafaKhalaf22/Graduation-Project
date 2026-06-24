import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, Bell, Settings, LogOut, Search, MapPin, 
  Clock, Radio, Activity, LayoutGrid, FileText, 
  Layers3, Video, Info, Download, ShieldAlert,
  Car, User, Phone, Zap, AlertCircle, ChevronRight,
  Navigation, Crosshair, Map as MapIcon, Siren
} from 'lucide-react';

const DispatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Dispatch');

  // تحديث التابة النشطة بناءً على المسار
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path) setActiveTab(path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' '));
  }, [location]);

  // بيانات المستجيبين (Nearby Responders)
  const responders = [
    { id: 'K9-2', name: 'Unit K9-2', type: 'Patrol • Sector 4', dist: '0.4 mi', eta: '1m 20s', status: 'Available' },
    { id: 'M-04', name: 'Unit M-04', type: 'Motor • Sector 4', dist: '0.8 mi', eta: '3m 10s', status: 'Available' },
    { id: 'P-10', name: 'Unit P-10', type: 'Interceptor • Sector 5', dist: '1.2 mi', eta: '4m 00s', status: 'Available' },
    { id: 'A-01', name: 'Unit A-01', type: 'Air • Refueling', dist: '5.2 mi', eta: 'ETA --', status: 'Busy' },
  ];

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex-col">
      
      {/* --- Header --- */}
      <header className="h-[65px] bg-[#020617] border-b border-slate-800/40 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="bg-[#1d4ed8] p-1.5 rounded-lg">
                <Shield className="text-white fill-white/10" size={20} />
             </div>
             <div className="flex flex-col">
                <h1 className="text-[12px] font-black text-white leading-none uppercase italic tracking-wider">Emergency Response</h1>
                <p className="text-[8px] text-slate-500 mt-1 font-bold uppercase opacity-60">Multi-Agency Command Center</p>
             </div>
          </div>

          <nav className="flex items-center gap-1 bg-[#0a0f1e]/60 p-1 rounded-xl border border-slate-800/30">
            {[
              { name: 'Dashboard', path: '/unit/dashboard', icon: LayoutGrid },
              { name: 'Incident Detail', path: '/unit/incident-detail', icon: FileText },
              { name: 'Timeline', path: '/unit/timeline', icon: Activity },
              { name: 'IoT Alerts', path: '/unit/iot-alerts', icon: Zap },
              { name: 'Dispatch', path: '/unit/dispatch', icon: Radio }
            ].map((tab) => (
              <button 
                key={tab.name} 
                onClick={() => navigate(tab.path)}
                className={`flex items-center gap-2 px-4 h-9 rounded-lg text-[10px] font-black tracking-widest transition-all
                  ${activeTab === tab.name ? 'bg-[#1e293b] text-white shadow-lg border border-slate-700/50' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon size={14} className={activeTab === tab.name ? 'text-blue-500' : ''} />
                {tab.name.toUpperCase()}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-[10px] font-mono text-slate-600 font-bold uppercase">10:04:32 AM • FEB 3, 2026</div>
          <div className="flex items-center gap-3 border-l border-slate-800/80 pl-6">
            <Bell size={18} className="text-slate-500 cursor-pointer hover:text-white" />
            <div className="flex items-center gap-3 ml-2">
              <div className="text-right">
                <p className="text-[10px] font-black text-white leading-none">M. Mahmoud</p>
                <p className="text-[8px] text-slate-600 mt-1 uppercase font-bold tracking-tighter">Dispatcher #01</p>
              </div>
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" className="w-8 h-8 rounded-full border border-slate-700" alt="user" />
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content Area --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 1. Left Sidebar: Nearby Responders (تم ضغط الارتفاع هنا) */}
        <aside className="w-[300px] bg-[#0f172a]/20 border-r border-slate-800/60 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-800/40 flex justify-between items-center">
            <h2 className="text-[11px] font-black uppercase tracking-[0.15em] text-white flex items-center gap-2">
              <Navigation size={14} className="text-blue-500" /> Nearby Responders
            </h2>
            <span className="bg-blue-600/20 text-blue-500 text-[9px] px-2 py-0.5 rounded font-black">3 AVAIL</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            <div className="flex gap-2 mb-2">
              {['All', 'Patrol', 'K-9', 'Air'].map(filter => (
                <button key={filter} className="text-[9px] font-black px-2.5 py-1 rounded-md border border-slate-800 bg-[#0f172a] text-slate-500 hover:text-white transition-colors">
                  {filter}
                </button>
              ))}
            </div>

            {responders.map((unit) => (
              <div key={unit.id} className={`p-2.5 rounded-xl border transition-all group ${unit.status === 'Busy' ? 'bg-slate-900/20 border-slate-800/40 opacity-60' : 'bg-[#1e293b]/40 border-slate-800 hover:border-blue-500/50 cursor-pointer'}`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${unit.status === 'Busy' ? 'bg-slate-800' : 'bg-blue-600/10 text-blue-500'}`}>
                      <Car size={14} />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-black text-white leading-tight">{unit.name} <span className="text-[9px] text-green-500 ml-1">●</span></h3>
                      <p className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter leading-none">{unit.type}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[9px] mt-2 font-bold">
                  <span className="text-slate-600 uppercase tracking-tighter">Dist: <span className="text-slate-400">{unit.dist}</span></span>
                  <span className="text-slate-600 uppercase tracking-tighter">ETA: <span className="text-blue-400">{unit.eta}</span></span>
                </div>
                {unit.status !== 'Busy' && (
                  <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                    <Radio size={12} /> Dispatch
                  </button>
                )}
                {unit.status === 'Busy' && (
                  <button disabled className="w-full mt-2 bg-slate-800 text-slate-600 py-1.5 rounded-lg text-[9px] font-black uppercase flex items-center justify-center gap-2">
                    <Clock size={12} /> Busy
                  </button>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* 2. Center: Tactical Map */}
        <main className="flex-1 relative bg-[#020617] p-4 flex flex-col overflow-hidden">
          <div className="flex-1 rounded-[32px] border border-slate-800/60 overflow-hidden relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600" 
              className="w-full h-full object-cover opacity-25 grayscale invert" 
              alt="Tactical Map" 
            />
            
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-8 bg-red-600/20 rounded-full animate-ping"></div>
                <div className="relative bg-red-600 p-4 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)] border-4 border-white/10">
                  <AlertCircle size={24} className="text-white" />
                </div>
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-lg whitespace-nowrap">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">INCIDENT #4922</p>
                </div>
              </div>
            </div>

            <div className="absolute top-[60%] left-[45%] bg-blue-600 p-2 rounded-full shadow-lg border-2 border-white/20">
              <span className="text-[8px] font-black text-white">K9-2</span>
            </div>
            <div className="absolute top-[75%] left-[55%] bg-blue-600 p-2 rounded-full shadow-lg border-2 border-white/20">
              <span className="text-[8px] font-black text-white">M-04</span>
            </div>

            <div className="absolute right-6 top-6 flex flex-col gap-2">
              <button className="bg-slate-900/80 border border-slate-700 p-2 rounded-lg text-slate-400 hover:text-white"><Layers3 size={18} /></button>
              <button className="bg-slate-900/80 border border-slate-700 p-2 rounded-lg text-slate-400 hover:text-white"><Crosshair size={18} /></button>
            </div>
          </div>
        </main>

        {/* 3. Right Sidebar: Incident Control */}
        <aside className="w-[380px] bg-[#0f172a]/40 border-l border-slate-800/60 p-6 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-red-600/20 text-red-500 text-[9px] px-3 py-1 rounded-md font-black uppercase tracking-widest border border-red-600/30">Priority 1</span>
              <span className="text-slate-500 text-[10px] font-mono">INCIDENT #4922</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-2">Armed Robbery in Progress</h2>
            <p className="text-[10px] text-slate-400 font-bold flex items-center gap-2 uppercase tracking-tighter opacity-80">
              <MapPin size={12} className="text-blue-500" /> 5th Ave & Pine St, Downtown
            </p>
          </div>

          <div className="mb-8">
            <h4 className="text-[10px] uppercase font-black text-slate-500 mb-4 tracking-[0.2em]">Assigned Units</h4>
            <div className="bg-[#1d4ed8]/10 border border-[#1d4ed8]/30 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg"><Car size={16} /></div>
                <div>
                  <p className="text-[11px] font-black text-white">ALPHA-01</p>
                  <p className="text-[9px] text-blue-400 uppercase font-bold">En Route • 45s</p>
                </div>
              </div>
              <Settings size={14} className="text-slate-600 cursor-pointer" />
            </div>
            <button className="w-full mt-3 py-3 border border-dashed border-slate-700 rounded-xl text-[10px] text-slate-500 font-bold hover:text-slate-300 transition-all uppercase tracking-widest">+ Add Unit</button>
          </div>

          <div className="mb-8 p-5 bg-slate-900/40 rounded-[24px] border border-slate-800/40">
            <h4 className="text-[10px] uppercase font-black text-slate-500 mb-4 tracking-[0.2em] flex items-center gap-2">
              <Info size={14} /> Live Context
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Caller:</span>
                <span className="text-[10px] text-white font-black">Store Manager (Verified)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Suspects:</span>
                <span className="text-[10px] text-white font-black">2 Males, Masked, Armed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Vehicle:</span>
                <span className="text-[10px] text-white font-black">Black Sedan, No Plate</span>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4">
             <div className="grid grid-cols-2 gap-3">
                <button className="bg-red-600/10 border border-red-600/30 text-red-500 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex flex-col items-center gap-2 hover:bg-red-600/20 transition-all">
                  <Siren size={18} /> Fire Dept
                </button>
                <button className="bg-orange-600/10 border border-orange-600/30 text-orange-500 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex flex-col items-center gap-2 hover:bg-orange-600/20 transition-all">
                  <Activity size={18} /> EMS / Medic
                </button>
             </div>
             <button className="w-full bg-[#1e293b] text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-slate-700 shadow-xl flex items-center justify-center gap-3">
               <ShieldAlert size={18} className="text-red-500" /> Request SWAT Backup
             </button>
             <div className="flex gap-3">
                <button className="flex-1 py-4 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-white">Cancel</button>
                <button className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-2">
                  <Shield size={18} /> Resolve
                </button>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DispatchPage;