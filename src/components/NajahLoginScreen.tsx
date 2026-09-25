import React, { useState } from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import moeLogo from '../assets/logo.svg';

interface Props {
  onSearchSubmit: (examNumber: string, secretCode?: string) => void;
  isLoading?: boolean;
}

const REQUIRED_EXAM_NUMBER = '152611510030118';
const REQUIRED_SECRET_CODE = '2617169275758';

// Helper to normalize both English (123) and Arabic-Indic (١٢٣) digits
const normalizeDigits = (str: string): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str
    .trim()
    .replace(/[٠-٩]/g, (digit) => arabicDigits.indexOf(digit).toString());
};

export const NajahLoginScreen: React.FC<Props> = ({ onSearchSubmit, isLoading = false }) => {
  const [examNumber, setExamNumber] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [isCaptchaChecked, setIsCaptchaChecked] = useState(false);
  const [captchaVerifying, setCaptchaVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateAndSubmit = (examNum: string, secret: string, captchaState: boolean) => {
    setErrorMessage(null);

    const cleanExam = normalizeDigits(examNum);
    const cleanSecret = normalizeDigits(secret);

    // 1. Check if fields are empty
    if (!cleanExam || !cleanSecret) {
      setErrorMessage('يرجى إدخال الرقم الامتحاني والرقم السري كاملاً.');
      return false;
    }

    // 2. Check if Captcha / Protection is verified
    if (!captchaState) {
      setErrorMessage('يرجى تأكيد التحقق الأمني (انا احب العراق) أولاً.');
      return false;
    }

    // 3. Strict verification of Exam Number and Secret Code
    if (cleanExam !== REQUIRED_EXAM_NUMBER || cleanSecret !== REQUIRED_SECRET_CODE) {
      setErrorMessage('الرقم الامتحاني أو الرقم السري غير صحيح، يرجى التأكد وإعادة المحاولة.');
      return false;
    }

    // Passed all validations!
    onSearchSubmit(cleanExam, cleanSecret);
    return true;
  };

  const handleCheckboxClick = () => {
    if (isCaptchaChecked) {
      setIsCaptchaChecked(false);
      return;
    }

    setCaptchaVerifying(true);
    setErrorMessage(null);

    setTimeout(() => {
      setCaptchaVerifying(false);
      setIsCaptchaChecked(true);

      // If both inputs are already filled, attempt login immediately
      if (examNumber.trim() && secretCode.trim()) {
        validateAndSubmit(examNumber, secretCode, true);
      }
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndSubmit(examNumber, secretCode, isCaptchaChecked);
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center p-4 select-none">
      {/* Centered Login Card - Matching Screenshot_٢٠٢٦٠٩٢٤-٢٢٤٦٣١.jpg */}
      <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-7 pt-8 pb-9 relative flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Official Ministry of Education Emblem / Logo - Displayed clearly above "جمهورية العراق" */}
        <div className="w-20 h-20 sm:w-22 sm:h-22 mb-3 flex items-center justify-center">
          <img
            src={moeLogo}
            alt="شعار وزارة التربية العراقية"
            className="w-full h-full object-contain filter drop-shadow-md"
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src !== '/iraq-moe-logo.svg') {
                target.src = '/iraq-moe-logo.svg';
              }
            }}
          />
        </div>

        {/* Heading */}
        <h1 className="text-black font-extrabold text-2xl tracking-tight mb-1 text-center font-['Cairo',sans-serif]">
          جمهورية العراق
        </h1>

        {/* Sub-heading */}
        <p className="text-slate-900 font-bold text-sm text-center mb-1 leading-snug">
          وزارة التربية - اللجنة الدائمة للامتحانات العامة
        </p>

        {/* Platform Title */}
        <p className="text-slate-500 text-xs text-center mb-5 font-normal">
          منصة إعلان النتائج
        </p>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="w-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-3 py-2.5 rounded-xl mb-4 text-center flex items-center justify-center gap-1.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 text-right">
          {/* Exam Number Input */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              الرقم الامتحاني
            </label>
            <input
              type="text"
              value={examNumber}
              onChange={(e) => {
                setExamNumber(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="الرقم الامتحاني"
              dir="rtl"
              autoComplete="off"
              className={`w-full h-11 px-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 text-slate-900 placeholder:text-slate-400 font-medium transition ${
                errorMessage && (!examNumber.trim() || normalizeDigits(examNumber) !== REQUIRED_EXAM_NUMBER)
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Secret Code Input */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              الرقم السري
            </label>
            <input
              type="password"
              value={secretCode}
              onChange={(e) => {
                setSecretCode(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="الرقم السري"
              dir="rtl"
              autoComplete="off"
              className={`w-full h-11 px-3 text-sm bg-white border rounded-xl focus:outline-none focus:ring-1 text-slate-900 placeholder:text-slate-400 font-medium transition ${
                errorMessage && (!secretCode.trim() || normalizeDigits(secretCode) !== REQUIRED_SECRET_CODE)
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500 bg-red-50/20'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
          </div>

          {/* Ur Government Services Portal Captcha Card */}
          <div className="pt-2">
            <div
              onClick={handleCheckboxClick}
              className={`w-full border rounded-2xl p-4 bg-white hover:bg-slate-50/70 transition cursor-pointer flex flex-col items-center justify-center shadow-xs group ${
                errorMessage && !isCaptchaChecked ? 'border-red-300 ring-1 ring-red-300' : 'border-slate-200/90'
              }`}
            >
              {/* Ur Portal Logo */}
              <div className="flex flex-col items-center mb-3 pointer-events-none">
                {/* Ziggurat Stylized Icon in Crimson / Burgundy */}
                <div className="w-12 h-6 flex flex-col items-center justify-center gap-0.5">
                  <div className="w-4 h-1 bg-[#a8204e] rounded-xs"></div>
                  <div className="w-7 h-1 bg-[#a8204e] rounded-xs"></div>
                  <div className="w-9 h-1 bg-[#a8204e] rounded-xs"></div>
                  <div className="w-12 h-1 bg-[#a8204e] rounded-xs"></div>
                </div>
                <div className="text-[12px] font-black text-[#a8204e] tracking-tight mt-1">
                  بوابة أور
                </div>
                <div className="text-[8px] text-slate-400 -mt-0.5 font-medium">
                  للخدمات الحكومية
                </div>
              </div>

              {/* Checkbox line: "انا احب العراق" with checkbox to the right */}
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700 select-none">
                <span className="text-slate-700 font-medium text-xs">انا احب العراق</span>
                <div
                  className={`w-4.5 h-4.5 rounded-sm border flex items-center justify-center transition-all ${
                    isCaptchaChecked
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'border-slate-300 bg-white group-hover:border-slate-400'
                  }`}
                >
                  {captchaVerifying ? (
                    <Loader2 className="w-3 h-3 text-blue-600 animate-spin" />
                  ) : isCaptchaChecked ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading || captchaVerifying}
            className="w-full bg-[#0080ff] hover:bg-[#0070e6] active:bg-[#0060cc] text-white font-bold text-sm py-3 px-4 rounded-xl shadow-sm transition duration-150 cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            {isLoading || captchaVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>جاري فحص البيانات وجلب النتيجة...</span>
              </>
            ) : (
              <span>عرض النتيجة</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
