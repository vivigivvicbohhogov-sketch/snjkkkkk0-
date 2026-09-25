import React, { useState } from 'react';
import { X, Plus, Trash2, Check, RotateCcw } from 'lucide-react';
import { StudentData, GradeItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: StudentData;
  onSave: (updatedStudent: StudentData) => void;
  onResetDefault: () => void;
}

export const EditStudentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  student,
  onSave,
  onResetDefault,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<StudentData>({
    ...student,
    grades: student.grades.map((g) => ({ ...g })),
  });

  const handleGradeChange = (index: number, field: keyof GradeItem, value: any) => {
    const updated = [...formData.grades];
    updated[index] = { ...updated[index], [field]: value };
    
    // Auto toggle yellow background or red text for 'م' or 'صفر'
    if (field === 'score') {
      if (value === 'م' || value === 'صفر') {
        updated[index].isYellowBg = true;
      }
      if (value === 'صفر') {
        updated[index].isRedText = true;
      }
    }

    setFormData({ ...formData, grades: updated });
  };

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      grades: [...formData.grades, { subject: 'مادة جديدة', score: '70' }],
    });
  };

  const handleRemoveSubject = (index: number) => {
    const updated = formData.grades.filter((_, i) => i !== index);
    setFormData({ ...formData, grades: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto no-print">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
            <span>تعديل بيانات ودرجات الطالب</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-right">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المدرسة</label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المحافظة</label>
              <input
                type="text"
                value={formData.governorate}
                onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">النتيجة النهائية</label>
              <select
                value={formData.finalStatus}
                onChange={(e) => {
                  const val = e.target.value;
                  let color = 'text-red-600';
                  if (val === 'ناجح') color = 'text-red-600';
                  if (val === 'مكمل') color = 'text-amber-600';
                  setFormData({ ...formData, finalStatus: val, statusColor: color });
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 font-bold focus:outline-none focus:border-blue-500"
              >
                <option value="معيد">معيد (راسب)</option>
                <option value="ناجح">ناجح</option>
                <option value="مكمل">مكمل</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الرقم الامتحاني</label>
              <input
                type="text"
                value={formData.examNumber}
                onChange={(e) => setFormData({ ...formData, examNumber: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Grades Editor */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={handleAddSubject}
                className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مادة</span>
              </button>
              <span className="text-xs font-bold text-slate-800">قائمة المواد والدرجات</span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pl-1">
              {formData.grades.map((grade, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    value={grade.subject}
                    onChange={(e) => handleGradeChange(idx, 'subject', e.target.value)}
                    placeholder="اسم المادة"
                    className="flex-1 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-900 font-semibold"
                  />
                  <input
                    type="text"
                    value={grade.score}
                    onChange={(e) => handleGradeChange(idx, 'score', e.target.value)}
                    placeholder="الدرجة (مثلاً: 86 أو م أو صفر)"
                    className="w-24 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-slate-900 font-bold text-center"
                  />
                  <label className="flex items-center gap-1 text-[11px] text-slate-600 bg-yellow-100 px-2 py-1 rounded cursor-pointer border border-yellow-300">
                    <input
                      type="checkbox"
                      checked={!!grade.isYellowBg}
                      onChange={(e) => handleGradeChange(idx, 'isYellowBg', e.target.checked)}
                      className="rounded text-amber-500 focus:ring-0"
                    />
                    <span>تأشير أصفر</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(idx)}
                    className="text-red-500 hover:text-red-700 p-1 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onResetDefault}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة الصورة الأصلية (عباس قيس)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
