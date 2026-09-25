export interface GradeItem {
  subject: string;
  score: string;
  isYellowBg?: boolean;
  isRedText?: boolean;
  isShadedRow?: boolean; // For the slightly darkened/grayish white rows (العربية, الاحياء, الكيمياء)
}

export interface StudentData {
  id: string;
  examNumber: string;
  name: string;
  school: string;
  governorate: string;
  totalScore?: string | number;
  average?: string | number;
  finalStatus: string; // 'معيد' | 'ناجح' | 'مكمل'
  statusColor?: string; // e.g., 'text-red-600'
  disclaimer: string;
  grades: GradeItem[];
}
