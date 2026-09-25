import React from 'react';
import { Wifi, Moon, BellOff, Bluetooth, RotateCcw, Home, SlidersHorizontal, Plus, MoreVertical } from 'lucide-react';

interface Props {
  url?: string;
  onRefresh?: () => void;
  onHomeClick?: () => void;
}

export const NajahBrowserHeader: React.FC<Props> = ({
  url = 'najah.iq',
  onRefresh,
  onHomeClick,
}) => {
  return (
    <div className="w-full bg-[#f8f9fa] border-b border-slate-200 select-none no-print">
      {/* Phone Status Bar (Exact match to user screenshot) */}
      <div dir="ltr" className="w-full bg-[#f8f9fa] text-slate-800 px-3 py-1 flex items-center justify-between text-xs font-sans">
        {/* Left Side (LTR): Battery 60%, 4G, 4G, Wifi, Moon, 340 KB/S, Muted bell, Bluetooth */}
        <div className="flex items-center gap-1.5 text-slate-700 text-[11px]">
          {/* Battery 60% */}
          <div className="flex items-center gap-0.5 bg-slate-600 text-white px-1 py-0.5 rounded text-[9px] font-bold">
            <span>60</span>
          </div>

          {/* 4G Icon 1 */}
          <div className="flex items-center text-[10px] font-bold text-slate-700">
            <span>4G</span>
          </div>

          {/* 4G Icon 2 */}
          <div className="flex items-center text-[10px] font-bold text-slate-700">
            <span>4G</span>
          </div>

          {/* WiFi */}
          <Wifi className="w-3.5 h-3.5 text-slate-700" />

          {/* Moon / DND */}
          <Moon className="w-3 h-3 fill-slate-700 text-slate-700" />

          {/* Network speed: 340 KB/S */}
          <span className="text-[9px] font-mono text-slate-600 hidden xs:inline">
            340 KB/S
          </span>

          {/* Silent / Muted Bell */}
          <BellOff className="w-3 h-3 text-slate-700" />

          {/* Bluetooth */}
          <Bluetooth className="w-3 h-3 text-slate-700" />
        </div>

        {/* Right Side (LTR): Rotate Lock + Time: 10:42 / ١٠:٤٢ */}
        <div className="flex items-center gap-1 text-slate-800">
          {/* Rotate lock icon */}
          <div className="w-3.5 h-3.5 rounded-full border border-slate-700 flex items-center justify-center p-0.5">
            <RotateCcw className="w-2.5 h-2.5 text-slate-700" />
          </div>
          {/* Time: ١٠:٤٢ */}
          <span className="font-semibold text-slate-900 text-xs tracking-tight">
            ١٠:٤٢
          </span>
        </div>
      </div>

      {/* Browser Bar (Chrome / Android Browser) */}
      <div dir="ltr" className="w-full bg-[#f8f9fa] px-3 py-2 flex items-center gap-2 text-slate-700 border-t border-slate-200/60">
        {/* Menu (3 vertical dots) */}
        <button
          type="button"
          className="p-1 hover:bg-slate-200 rounded-full transition cursor-pointer text-slate-700"
          title="قائمة المتصفح"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Tabs count (21 in rounded square) */}
        <div className="w-5 h-5 border-2 border-slate-700 rounded-md flex items-center justify-center text-[10px] font-bold text-slate-800 cursor-pointer hover:bg-slate-200">
          21
        </div>

        {/* New Tab (+) */}
        <button
          type="button"
          className="p-1 hover:bg-slate-200 rounded-full transition cursor-pointer text-slate-700"
          title="علامة تبويب جديدة"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* URL Capsule Input (najah.iq) */}
        <div
          onClick={onRefresh}
          className="flex-1 bg-[#e9ecf2] hover:bg-[#e2e6ec] rounded-full px-3 py-1.5 flex items-center gap-2 cursor-pointer transition"
          title="إعادة تحميل الصفحة"
        >
          {/* Sliders / Tune Icon inside capsule */}
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600 shrink-0" />
          <span className="text-xs font-medium text-slate-800 tracking-tight flex-1 text-left select-text">
            {url}
          </span>
        </div>

        {/* Home Button (outline house) */}
        <button
          type="button"
          onClick={onHomeClick}
          className="p-1 hover:bg-slate-200 rounded-full transition cursor-pointer text-slate-700"
          title="الصفحة الرئيسية"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
