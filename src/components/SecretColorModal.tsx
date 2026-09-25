import React from 'react';
import { X, RotateCcw, Check, Sparkles, Sliders, Palette } from 'lucide-react';

export interface TableColorConfig {
  // Shaded row subjects (default: العربية, الاحياء, الكيمياء)
  shadedSubjects: string[];
  // Shaded base color hex
  shadedBaseColor: string;
  // Shaded darkness level: 0 to 100
  shadedDarkness: number;
  // Yellow highlighted subjects (default: الانكليزية, الرياضيات, الكيمياء, الفيزياء)
  yellowSubjects: string[];
  // Yellow base color hex
  yellowBaseColor: string;
  // Yellow darkness level: 0 to 100
  yellowDarkness: number;
}

export const DEFAULT_COLOR_CONFIG: TableColorConfig = {
  shadedSubjects: ['العربية', 'الاحياء', 'الكيمياء'],
  shadedBaseColor: '#edf1f5',
  shadedDarkness: 35,
  yellowSubjects: ['الانكليزية', 'الرياضيات', 'الكيمياء', 'الفيزياء'],
  yellowBaseColor: '#FFFF80',
  yellowDarkness: 45,
};

const ALL_SUBJECTS = [
  'الاسلامية',
  'العربية',
  'الانكليزية',
  'الاحياء',
  'الرياضيات',
  'الكيمياء',
  'الفيزياء',
];

// Presets for row shading color
const SHADE_COLOR_PRESETS = [
  { name: 'الافتراضي الوزاري', color: '#edf1f5' },
  { name: 'رمادي رصاصي', color: '#e2e8f0' },
  { name: 'رمادي كلاسيك أغمق', color: '#dde3eb' },
  { name: 'رمادي دافئ', color: '#eae7e1' },
  { name: 'رمادي مزرق', color: '#e1e7f0' },
  { name: 'رمادي داكن', color: '#cbd5e1' },
];

// Presets for yellow grade highlights
const YELLOW_COLOR_PRESETS = [
  { name: 'أصفر هادئ (وزاري)', color: '#FFFF80' },
  { name: 'أصفر فاتح', color: '#FFFFA0' },
  { name: 'أصفر مشرق', color: '#FFEA3B' },
  { name: 'ذهبي ناصع', color: '#FDD835' },
  { name: 'ذهبي كلاسيكي', color: '#FFD54F' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: TableColorConfig;
  onChange: (newConfig: TableColorConfig) => void;
  onReset: () => void;
}

export const SecretColorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  config,
  onChange,
  onReset,
}) => {
  if (!isOpen) return null;

  const toggleShadedSubject = (sub: string) => {
    const exists = config.shadedSubjects.includes(sub);
    const updated = exists
      ? config.shadedSubjects.filter((s) => s !== sub)
      : [...config.shadedSubjects, sub];
    onChange({ ...config, shadedSubjects: updated });
  };

  const toggleYellowSubject = (sub: string) => {
    const exists = config.yellowSubjects.includes(sub);
    const updated = exists
      ? config.yellowSubjects.filter((s) => s !== sub)
      : [...config.yellowSubjects, sub];
    onChange({ ...config, yellowSubjects: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shadow-xs">
              <Sliders className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white flex items-center gap-1.5">
                <span>لوحة التحكم السرية بألوان الجدول</span>
                <Sparkles className="w-4 h-4 text-yellow-300" />
              </h3>
              <p className="text-xs text-blue-100 font-normal">
                تم الفتح بنجاح عبر الضغط على كلمة النتيجة
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 text-right font-['Cairo',sans-serif]">
          {/* Section 1: المواد المظللة (العربي، الأحياء، الكيمياء) */}
          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200/70 pb-2">
              <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                درجة الغمق: {config.shadedDarkness}%
              </span>
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-blue-600" />
                <span>تظليل مربعات (العربي، الأحياء، الكيمياء)</span>
              </h4>
            </div>

            {/* Darkness Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span className="text-slate-400">أغمق (داكن)</span>
                <label className="text-slate-800">التحكم في درجة الغمق والتعتيم</label>
                <span className="text-slate-400">أفتح (أبيض)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.shadedDarkness}
                onChange={(e) =>
                  onChange({ ...config, shadedDarkness: Number(e.target.value) })
                }
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 px-1">
                <span>100%</span>
                <span>75%</span>
                <span className="text-blue-600 font-bold">35% (الافتراضي)</span>
                <span>15%</span>
                <span>0%</span>
              </div>
            </div>

            {/* Color Presets */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-800 mb-2">
                اختر لون التظليل أو حدد لوناً مخصصاً:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SHADE_COLOR_PRESETS.map((p) => {
                  const isSelected =
                    config.shadedBaseColor.toLowerCase() === p.color.toLowerCase();
                  return (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() =>
                        onChange({ ...config, shadedBaseColor: p.color })
                      }
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[11px] font-medium transition cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-2xs ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-lg border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="truncate w-full text-center text-[10px]">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input */}
              <div className="flex items-center gap-3 mt-3 bg-white p-2.5 rounded-xl border border-slate-200">
                <input
                  type="color"
                  value={config.shadedBaseColor}
                  onChange={(e) =>
                    onChange({ ...config, shadedBaseColor: e.target.value })
                  }
                  className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800 block">
                    كود اللون المخصص (Hex):
                  </span>
                  <span className="text-slate-500 font-mono text-[11px] dir-ltr inline-block">
                    {config.shadedBaseColor.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Subject Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                المواد المطبق عليها هذا التظليل:
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_SUBJECTS.map((sub) => {
                  const active = config.shadedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleShadedSubject(sub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                        active
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      <span>{sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: مربعات درجات المواد (اللون الأصفر) */}
          <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-200/80">
            <div className="flex items-center justify-between mb-3 border-b border-amber-200/70 pb-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                غمق الأصفر: {config.yellowDarkness}%
              </span>
              <h4 className="font-bold text-sm text-amber-950 flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-amber-500 inline-block" />
                <span>التحكم بلون ودرجة غمق مربعات الدرجات (الأصفر)</span>
              </h4>
            </div>

            {/* Yellow Darkness Slider */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-900 mb-1.5">
                <span className="text-amber-700/60">أغمق / ذهبي</span>
                <label>درجة غمق وتركيز اللون الأصفر للدرجات</label>
                <span className="text-amber-700/60">أفتح هادئ</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={config.yellowDarkness}
                onChange={(e) =>
                  onChange({ ...config, yellowDarkness: Number(e.target.value) })
                }
                className="w-full h-2.5 bg-amber-200/70 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Yellow Presets */}
            <div className="mb-3">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {YELLOW_COLOR_PRESETS.map((p) => {
                  const isSelected =
                    config.yellowBaseColor.toLowerCase() === p.color.toLowerCase();
                  return (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() =>
                        onChange({ ...config, yellowBaseColor: p.color })
                      }
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[11px] font-medium transition cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 bg-amber-100/70 text-amber-950 font-bold ring-1 ring-amber-400'
                          : 'border-amber-200 bg-white text-slate-700 hover:border-amber-300'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-lg border border-amber-300 shadow-2xs"
                        style={{ backgroundColor: p.color }}
                      />
                      <span className="truncate w-full text-center text-[10px]">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subjects with Yellow Highlight */}
            <div>
              <label className="block text-xs font-bold text-amber-950 mb-2">
                المواد المظللة باللون الأصفر للدرجات:
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_SUBJECTS.map((sub) => {
                  const active = config.yellowSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleYellowSubject(sub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                        active
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-amber-200 hover:border-amber-300'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                      <span>{sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-5 py-3.5 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الافتراضي</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>حفظ ومتابعة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate final background color given baseHex and darkness (0-100)
export function computeShadedColor(baseHex: string, darkness: number): string {
  // If darkness is 0, pure white
  if (darkness <= 0) return '#FFFFFF';

  // Parse base color
  const hex = baseHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 237;
  const g = parseInt(hex.substring(2, 4), 16) || 241;
  const b = parseInt(hex.substring(4, 6), 16) || 245;

  // At darkness=50: exactly the base color
  // At darkness < 50: blend towards white (255, 255, 255)
  // At darkness > 50: blend towards a deeper tone (e.g. 150, 160, 175)
  if (darkness <= 50) {
    const factor = darkness / 50; // 0 to 1
    const finalR = Math.round(255 - (255 - r) * factor);
    const finalG = Math.round(255 - (255 - g) * factor);
    const finalB = Math.round(255 - (255 - b) * factor);
    return `rgb(${finalR}, ${finalG}, ${finalB})`;
  } else {
    const factor = (darkness - 50) / 50; // 0 to 1
    // Target dark gray tone
    const targetR = Math.max(0, r - 65);
    const targetG = Math.max(0, g - 65);
    const targetB = Math.max(0, b - 65);
    const finalR = Math.round(r - (r - targetR) * factor);
    const finalG = Math.round(g - (g - targetG) * factor);
    const finalB = Math.round(b - (b - targetB) * factor);
    return `rgb(${finalR}, ${finalG}, ${finalB})`;
  }
}

// Helper function to calculate yellow score highlight color given yellowHex and darkness (0-100)
export function computeYellowColor(baseHex: string, darkness: number): string {
  if (darkness <= 0) return '#FFFFFF';

  const hex = baseHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 255;
  const g = parseInt(hex.substring(2, 4), 16) || 255;
  const b = parseInt(hex.substring(4, 6), 16) || 128;

  if (darkness <= 50) {
    const factor = darkness / 50;
    const finalR = Math.round(255 - (255 - r) * factor);
    const finalG = Math.round(255 - (255 - g) * factor);
    const finalB = Math.round(255 - (255 - b) * factor);
    return `rgb(${finalR}, ${finalG}, ${finalB})`;
  } else {
    const factor = (darkness - 50) / 50;
    // Deepen yellow towards richer amber/gold
    const targetR = 255;
    const targetG = Math.max(160, g - 60);
    const targetB = Math.max(0, b - 100);
    const finalR = Math.round(r - (r - targetR) * factor);
    const finalG = Math.round(g - (g - targetG) * factor);
    const finalB = Math.round(b - (b - targetB) * factor);
    return `rgb(${finalR}, ${finalG}, ${finalB})`;
  }
}
