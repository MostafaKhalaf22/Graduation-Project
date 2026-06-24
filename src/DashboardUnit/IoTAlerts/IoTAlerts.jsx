import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Bell, Settings, LogOut, Radio, Target, 
  MapPin, Activity, History, XCircle, Play, CheckCircle2,
  Cpu, Zap, AlertTriangle
} from 'lucide-react';

const IoTAlerts = () => {
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    const routes = {
      'Dashboard': '/unit/dashboard',
      'Incident Detail': '/unit/incident-detail',
      'Timeline': '/unit/timeline',
      'IoT Alerts': '/unit/iot-alerts',
      'Dispatch': '/unit/dispatch'
    };
    if (routes[tab]) navigate(routes[tab]);
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans flex-col">
      
      {/* --- Header --- */}
      <header className="h-14 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1 rounded-lg shadow-lg shadow-blue-600/20">
              <Shield className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-[10px] font-black text-white uppercase tracking-tight">Emergency Response Command</h1>
            </div>
          </div>
          <nav className="flex items-center gap-1">
             {['Dashboard', 'Incident Detail', 'Timeline', 'IoT Alerts', 'Dispatch'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => handleTabClick(tab)}
                  className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all 
                    ${tab === 'IoT Alerts' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                   {tab === 'IoT Alerts' && <span className="inline-block w-1 h-1 bg-blue-500 rounded-full mr-1.5 mb-0.5"></span>}
                   {tab}
                </button>
             ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-[9px] font-mono text-slate-500 uppercase">10:04:07 AM • FEB 3, 2026</div>
           <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <Bell size={16} className="text-slate-500 cursor-pointer" />
              <LogOut size={16} className="text-red-500/70 cursor-pointer" />
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" className="w-7 h-7 rounded-full border border-slate-700 object-cover" alt="admin" />
           </div>
        </div>
      </header>

      {/* --- Main Content (No Scroll) --- */}
      <main className="flex-1 p-4 flex flex-col gap-4 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent">
        
        {/* Breadcrumbs & Actions */}
        <div className="flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-slate-500">Dashboard / Active Incidents /</span>
            <span className="text-red-500 font-bold">Incident #99236</span>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded text-[9px] font-black uppercase text-slate-300 hover:bg-slate-700 transition-all">
              <History size={12} /> History
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-red-600/10 border border-red-600/20 rounded text-[9px] font-black uppercase text-red-500 hover:bg-red-600/20 transition-all">
              <XCircle size={12} /> Mark False Alarm
            </button>
          </div>
        </div>

        {/* Title Area */}
        <div className="shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Gunshot Detection</h2>
            <span className="bg-red-600 text-[9px] px-2 py-0.5 rounded font-black flex items-center gap-1 animate-pulse">
              <div className="w-1 h-1 bg-white rounded-full"></div> ACTIVE THREAT
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 font-medium">Sector 4 • Reported 2 mins ago <span className="text-blue-500">Auto-Flagged by AI</span></p>
        </div>

        {/* Dashboard Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden">
          
          {/* Left Column: Status & Sensors */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Incident Status */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 shadow-xl relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Incident Status</span>
                <AlertTriangle size={14} className="text-slate-600" />
              </div>
              <div className="flex flex-col items-center py-2">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="226" strokeDashoffset="22" className="text-red-500 transition-all duration-1000" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <Zap size={20} className="text-red-500 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-black text-white mt-3">Unverified</h3>
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Awaiting Officer Confirmation</p>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">Confidence Level</span>
                  <span className="text-white font-bold">94% (High)</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-[94%]" />
                </div>
              </div>
            </div>

            {/* Sensor Data */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex-1 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={14} className="text-blue-500" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Sensor Data</span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Sensor ID", value: "GS-209-Alpha" },
                  { label: "Type", value: "Acoustic Triangulation" },
                  { label: "Location", value: "4th & Main St.", sub: "40.7128, -74.0060" },
                  { label: "Zone", value: "Commercial District", badge: true },
                  { label: "Nearest Landmark", value: "Central Station (0.1 mi)" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start text-[10px] border-b border-slate-800/50 pb-2">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <div className="text-right">
                      <p className={`font-bold ${item.badge ? 'text-blue-500' : 'text-slate-200'}`}>{item.value}</p>
                      {item.sub && <p className="text-[8px] text-slate-600 font-mono mt-0.5">{item.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Visuals */}
          <div className="col-span-6 flex flex-col gap-4">
            {/* Live Camera Feed */}
            <div className="flex-[1.5] bg-black rounded-xl border border-slate-800 relative overflow-hidden shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" alt="camera" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-red-600 text-[8px] px-2 py-0.5 rounded font-black text-white flex items-center gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> LIVE
                </span>
                <span className="bg-black/60 backdrop-blur-md text-[8px] px-2 py-0.5 rounded border border-white/10 text-white font-mono uppercase">CAM-04-B • 14:02:58 UTC</span>
              </div>
              {/* Spectrum Visualizer (Simplified) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1 h-12">
                {[30, 60, 45, 80, 55, 90, 40, 70, 50, 65].map((h, i) => (
                  <div key={i} className="w-1 bg-blue-500/50 rounded-full animate-bounce" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>

            {/* Mini Map View */}
            <div className="flex-1 bg-[#0f172a] border border-slate-800 rounded-xl relative overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-30 grayscale contrast-125" alt="map" />
              <div className="absolute inset-0 bg-blue-900/10" />
              {/* Pulse Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-red-600/20 rounded-full animate-ping flex items-center justify-center">
                  <div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: AI & Recommendations */}
          <div className="col-span-3 flex flex-col gap-4 overflow-hidden">
            {/* AI Recommendations */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex flex-col gap-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-blue-500" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">AI Recommendations</span>
                </div>
                <span className="text-[8px] font-black text-slate-600 border border-slate-800 px-1.5 py-0.5 rounded uppercase">High Priority</span>
              </div>
              
              <div className="space-y-3 overflow-y-auto custom-scrollbar pr-1">
                {/* Recommendation 1 */}
                <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg hover:border-blue-500/50 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-2">
                    <Target size={14} className="text-blue-400" />
                    <p className="text-[10px] font-black text-white uppercase tracking-tight">Dispatch Response</p>
                  </div>
                  <p className="text-[9px] text-slate-500 mb-3 leading-relaxed">Unit 404 is 0.2mi away (ETA: 45s). Send immediate response order.</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-black uppercase py-2 rounded-md transition-all">Execute Dispatch</button>
                </div>

                {/* Recommendation 2 */}
                <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-slate-500" />
                    <p className="text-[10px] font-bold text-slate-300">Notify EMS (Standby)</p>
                  </div>
                  <button className="text-[8px] font-black text-blue-500 uppercase px-2 py-1 border border-blue-500/20 rounded">Notify</button>
                </div>

                {/* Recommendation 3 */}
                <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio size={14} className="text-slate-500" />
                    <p className="text-[10px] font-bold text-slate-300">Lock Traffic Lights</p>
                  </div>
                  <button className="text-[8px] font-black text-slate-400 uppercase px-2 py-1 border border-slate-800 rounded">Lock</button>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex-1 flex flex-col shadow-xl">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Recent Activity</span>
              <div className="space-y-4 overflow-y-auto custom-scrollbar flex-1 pr-1">
                {[
                  { msg: "Alert received from GS-209", time: "14:02:55", status: "critical" },
                  { msg: "Unit 404 location updated", time: "14:02:58", status: "normal" },
                  { msg: "AI Analysis: Handgun 9mm confirmed", time: "14:03:01", status: "ai" }
                ].map((act, i) => (
                  <div key={i} className="flex gap-3 relative before:absolute before:left-[3px] before:top-4 before:bottom-[-12px] before:w-[1px] before:bg-slate-800 last:before:hidden">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 z-10 ${act.status === 'critical' ? 'bg-red-500' : act.status === 'ai' ? 'bg-blue-500' : 'bg-slate-500'}`} />
                    <div>
                      <p className="text-[10px] font-bold text-slate-200 leading-none">{act.msg}</p>
                      <p className="text-[8px] text-slate-600 mt-1 font-mono uppercase">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* --- Footer Status Bar --- */}
      <footer className="h-8 bg-[#0f172a] border-t border-slate-800 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 text-[8px] font-bold uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-1.5"><div className="w-1 h-1 bg-green-500 rounded-full" /> System Online</div>
          <div className="flex items-center gap-1.5"><div className="w-1 h-1 bg-blue-500 rounded-full" /> 24 Active Sensors</div>
        </div>
        <div className="text-[8px] text-slate-600 font-mono tracking-tighter">SECURE ENCRYPTED CHANNEL • DISPATCH_ID: 99-XF4</div>
      </footer>
    </div>
  );
};

export default IoTAlerts;