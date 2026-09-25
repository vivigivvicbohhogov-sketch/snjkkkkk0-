import React from 'react';
import { Battery, Wifi, Signal, Moon } from 'lucide-react';

export const MobileStatusBar: React.FC = () => {
  return (
    <div dir="ltr" className="w-full bg-slate-100 text-slate-700 px-4 py-1.5 flex items-center justify-between text-xs font-sans rounded-t-2xl border-b border-slate-200/80 no-print">
      {/* Right side in LTR = Left side on device: Time */}
      <div className="font-semibold text-slate-800 tracking-tight text-sm">
        12:40
      </div>

      {/* Middle/Right icons */}
      <div className="flex items-center gap-2 text-slate-700">
        <Moon className="w-3.5 h-3.5 fill-slate-700 text-slate-700" />
        <span className="text-[10px] font-mono text-slate-600">3,90 KB/S</span>
        <Wifi className="w-3.5 h-3.5" />
        <Signal className="w-3.5 h-3.5 fill-slate-700" />
        <div className="flex items-center gap-0.5 font-bold text-[11px]">
          <span>4G</span>
          <span className="bg-slate-700 text-white px-1 py-0.2 rounded text-[10px]">98</span>
        </div>
      </div>
    </div>
  );
};
