import React, { useState } from 'react';
import { Search, Edit3, Smartphone, Monitor, UserCheck, PlusCircle } from 'lucide-react';
import { StudentData } from '../types';
import { sampleStudents } from '../data';

interface Props {
  currentStudent: StudentData;
  onSelectStudent: (student: StudentData) => void;
  onOpenEditModal: () => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onSearch: (query: string) => void;
  currentView: 'login' | 'result';
  onToggleView: (view: 'login' | 'result') => void;
}

export const TopNavbarControls: React.FC<Props> = ({
  currentStudent,
  onSelectStudent,
  onOpenEditModal,
  isMobileFrame,
  onToggleMobileFrame,
  onSearch,
  currentView,
  onToggleView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 py-3 px-4 no-print shadow-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow">
            وز
          </div>
          <div>
            <h1 className="font-extrabold text-sm md:text-base text-slate-100">
              بوابة نتائج الطلاب الوزارية
            </h1>
            <p className="text-xs text-slate-400">وزارة التربية العراقية - najah.iq</p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs">
          <button
            onClick={() => onToggleView('login')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              currentView === 'login'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            واجهة najah.iq الرئيسية
          </button>
          <button
            onClick={() => onToggleView('result')}
            className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              currentView === 'result'
                ? 'bg-blue-600 text-white shadow-xs font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            عرض النتيجة والدرجات
          </button>
        </div>

        {/* Quick Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-56">
          <input
            type="text"
            placeholder="ابحث بالاسم أو الرقم..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch(e.target.value);
            }}
            className="w-full bg-slate-800 text-slate-100 placeholder-slate-400 text-xs py-2 pr-8 pl-3 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 transition"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
        </form>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Preset Select Dropdown */}
          <select
            value={currentStudent.id}
            onChange={(e) => {
              const found = sampleStudents.find((s) => s.id === e.target.value);
              if (found) {
                onSelectStudent(found);
                onToggleView('result');
              }
            }}
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer text-xs"
          >
            {sampleStudents.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.finalStatus})
              </option>
            ))}
          </select>

          {/* Toggle Mobile Frame View */}
          <button
            onClick={onToggleMobileFrame}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
              isMobileFrame
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="تبديل وضع الهاتف"
          >
            {isMobileFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>{isMobileFrame ? 'عرض هاتف' : 'عرض شاشة'}</span>
          </button>

          {/* Edit Data Button */}
          <button
            onClick={onOpenEditModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium transition cursor-pointer shadow"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>تعديل النتيجة</span>
          </button>
        </div>
      </div>
    </header>
  );
};
