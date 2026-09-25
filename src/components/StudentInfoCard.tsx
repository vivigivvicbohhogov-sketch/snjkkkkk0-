import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { StudentData } from '../types';

interface Props {
  student: StudentData;
}

export const StudentInfoCard: React.FC<Props> = ({ student }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 md:p-6 mb-4 relative overflow-hidden">
      {/* Subtle top indicator line matching the original screenshot */}
      <div className="w-16 h-1 bg-slate-300/80 rounded-full mx-auto mb-4"></div>

      {/* Card Title */}
      <h2 className="text-[#0080ff] text-2xl md:text-[28px] font-bold text-center mb-6 tracking-normal">
        معلومات الطالب
      </h2>

      {/* Student Details Fields */}
      <div className="space-y-3 text-right text-slate-800 text-base md:text-lg pr-1 leading-relaxed">
        <div className="flex items-baseline flex-wrap gap-2">
          <span className="font-bold text-slate-900 min-w-[75px]">الاسم:</span>
          <span className="text-slate-800 font-normal">{student.name}</span>
        </div>

        <div className="flex items-baseline flex-wrap gap-2">
          <span className="font-bold text-slate-900 min-w-[75px]">المدرسة:</span>
          <span className="text-slate-800 font-normal">{student.school}</span>
        </div>

        <div className="flex items-baseline flex-wrap gap-2">
          <span className="font-bold text-slate-900 min-w-[75px]">المحافظة:</span>
          <span className="text-slate-800 font-normal">{student.governorate}</span>
        </div>

        {/* Final Result Status */}
        <div className="pt-4 pb-1 flex items-baseline flex-wrap gap-2 text-lg md:text-xl">
          <span className="font-bold text-slate-900">النتيجة النهائية:</span>
          <span
            className={`font-bold text-xl md:text-2xl ${
              student.finalStatus === 'ناجح' ? 'text-red-600' : (student.statusColor || 'text-red-600')
            }`}
          >
            {student.finalStatus}
          </span>
        </div>
      </div>

      {/* Disclaimer Notice */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-slate-500 text-xs md:text-[13px] text-center leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
        <p className="font-normal text-slate-500">{student.disclaimer}</p>
      </div>
    </div>
  );
};
