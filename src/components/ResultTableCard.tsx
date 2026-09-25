import React, { useState, useEffect } from 'react';
import { GradeItem } from '../types';
import {
  SecretColorModal,
  TableColorConfig,
  DEFAULT_COLOR_CONFIG,
  computeShadedColor,
  computeYellowColor,
} from './SecretColorModal';

interface Props {
  grades: GradeItem[];
}

const STORAGE_KEY = 'najah_table_color_settings_v1';

export const ResultTableCard: React.FC<Props> = ({ grades }) => {
  // Secret modal open state
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  // Load color config from localStorage if available
  const [config, setConfig] = useState<TableColorConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_COLOR_CONFIG;
  });

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage errors
    }
  }, [config]);

  const handleReset = () => {
    setConfig(DEFAULT_COLOR_CONFIG);
  };

  // Computed colors based on darkness sliders
  const currentShadedBg = computeShadedColor(
    config.shadedBaseColor,
    config.shadedDarkness
  );

  const currentYellowBg = computeYellowColor(
    config.yellowBaseColor,
    config.yellowDarkness
  );

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl sm:rounded-3xl shadow-xs border border-slate-200/80 p-5 sm:p-6 mb-5 overflow-hidden">
      {/* Title - Clicking "النتيجة" opens the secret control panel */}
      <div className="flex items-center justify-center mb-6">
        <h2
          onClick={() => setIsSecretOpen(true)}
          title="انقر لفتح لوحة التحكم السرية بالألوان"
          className="text-[#087FF5] text-2xl sm:text-[27px] font-bold text-center tracking-tight cursor-pointer hover:opacity-85 active:scale-98 transition duration-150 select-none relative group inline-block px-4 py-1 rounded-xl"
        >
          <span>النتيجة</span>
          {/* Invisible secret hint on hover */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-8 h-0.5 bg-[#087FF5]/40 transition-all rounded-full" />
        </h2>
      </div>

      {/* Results Table */}
      <div className="overflow-hidden rounded-lg border border-slate-300">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#087FF5] text-white">
              {/* Subject Column (Right side in RTL) */}
              <th className="py-2.5 px-4 font-bold text-[15px] sm:text-[17px] border-l border-white/30 w-1/2 select-none">
                المادة
              </th>
              {/* Grade Column (Left side in RTL) */}
              <th className="py-2.5 px-4 font-bold text-[15px] sm:text-[17px] w-1/2 select-none">
                الدرجة
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {grades.map((item, index) => {
              // Determine if this subject should have the controlled shaded background
              const isShadedSubject = config.shadedSubjects.some(
                (s) =>
                  item.subject.trim() === s.trim() ||
                  (s === 'العربية' && item.subject.includes('العرب')) ||
                  (s === 'الاحياء' && item.subject.includes('الاحياء')) ||
                  (s === 'الكيمياء' && item.subject.includes('الكيمياء'))
              );

              // Determine if this grade cell has yellow background
              const isYellowGrade =
                config.yellowSubjects.some(
                  (s) =>
                    item.subject.trim() === s.trim() ||
                    (s === 'الانكليزية' && item.subject.includes('الانكليز')) ||
                    (s === 'الرياضيات' && item.subject.includes('الرياضيات')) ||
                    (s === 'الكيمياء' && item.subject.includes('الكيمياء')) ||
                    (s === 'الفيزياء' && item.subject.includes('الفيزياء'))
                ) ||
                item.isYellowBg ||
                item.isRedText ||
                false;

              // Background for subject cell:
              const subjectStyle: React.CSSProperties = isShadedSubject
                ? { backgroundColor: currentShadedBg }
                : { backgroundColor: '#FFFFFF' };

              // Styling for grade cell:
              const gradeStyle: React.CSSProperties = isYellowGrade
                ? { backgroundColor: currentYellowBg, color: '#E53935' }
                : isShadedSubject
                ? { backgroundColor: currentShadedBg, color: '#303030' }
                : { backgroundColor: '#FFFFFF', color: '#303030' };

              return (
                <tr key={index} className="transition-colors">
                  {/* Subject Cell */}
                  <td
                    style={subjectStyle}
                    className="py-3 px-4 text-[15px] sm:text-[17px] font-semibold text-[#303030] border-l border-slate-300 transition-colors"
                  >
                    {item.subject}
                  </td>

                  {/* Grade Cell */}
                  <td
                    style={gradeStyle}
                    className={`py-3 px-4 text-[15px] sm:text-[17px] border-slate-300 transition-colors ${
                      isYellowGrade ? 'font-bold' : 'font-semibold'
                    }`}
                  >
                    {item.score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Secret Color Control Modal */}
      <SecretColorModal
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
        config={config}
        onChange={setConfig}
        onReset={handleReset}
      />
    </div>
  );
};
