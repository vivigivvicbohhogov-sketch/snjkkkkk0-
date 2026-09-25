import React from 'react';
import { Printer, RotateCcw } from 'lucide-react';

interface Props {
  onBackToHome?: () => void;
  onPrint?: () => void;
}

export const ActionButtons: React.FC<Props> = ({ onBackToHome, onPrint }) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="space-y-3 w-full no-print">
      {/* Return Home Button */}
      <button
        onClick={onBackToHome}
        type="button"
        className="w-full bg-[#0080ff] hover:bg-[#0070e6] active:bg-[#0060cc] text-white font-bold text-base md:text-lg py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition duration-150 cursor-pointer active:scale-[0.99]"
      >
        <span>العودة للصفحة الرئيسية</span>
        <div className="bg-white/20 p-1 rounded-md flex items-center justify-center">
          <RotateCcw className="w-5 h-5 text-white stroke-[2.5]" />
        </div>
      </button>

      {/* Print Result Button */}
      <button
        onClick={handlePrint}
        type="button"
        className="w-full bg-[#16a34a] hover:bg-[#15803d] active:bg-[#116e34] text-white font-bold text-base md:text-lg py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition duration-150 cursor-pointer active:scale-[0.99]"
      >
        <span>طباعة النتيجة</span>
        <Printer className="w-5 h-5 text-white stroke-[2.5]" />
      </button>
    </div>
  );
};
