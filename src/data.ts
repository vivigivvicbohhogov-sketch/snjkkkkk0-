import { StudentData } from './types';

export const initialStudent: StudentData = {
  id: 'student-1',
  examNumber: '152611510030118',
  name: 'عباس قيس بدر عباس',
  school: 'اعدادية العراق الناهض للبنين',
  governorate: 'الرصافة الثالثة',
  finalStatus: 'ناجح',
  statusColor: 'text-red-600',
  disclaimer: 'يُعد هذا تبليغاً بنتيجة الطالب فقط، ولا يُعتبر وثيقة رسمية معتمدة لأي غرض كان.',
  grades: [
    { subject: 'الاسلامية', score: '86' },
    { subject: 'العربية', score: '64' },
    { subject: 'الانكليزية', score: '88', isYellowBg: true },
    { subject: 'الاحياء', score: '68' },
    { subject: 'الرياضيات', score: '82', isYellowBg: true },
    { subject: 'الكيمياء', score: '69', isYellowBg: true },
    { subject: 'الفيزياء', score: '72', isYellowBg: true },
  ],
};

export const sampleStudents: StudentData[] = [
  initialStudent,
  {
    id: 'student-2',
    examNumber: '122341209322',
    name: 'حسين علي كاظم عبد',
    school: 'اعدادية المتميزين للبنين',
    governorate: 'الكرخ الأولى',
    finalStatus: 'ناجح',
    statusColor: 'text-red-600',
    disclaimer: 'يُعد هذا تبليغاً بنتيجة الطالب فقط، ولا يُعتبر وثيقة رسمية معتمدة لأي غرض كان.',
    grades: [
      { subject: 'الاسلامية', score: '98' },
      { subject: 'العربية', score: '92' },
      { subject: 'الانكليزية', score: '88' },
      { subject: 'الاحياء', score: '95' },
      { subject: 'الرياضيات', score: '90' },
      { subject: 'الكيمياء', score: '94' },
      { subject: 'الفيزياء', score: '91' },
    ],
  },
  {
    id: 'student-3',
    examNumber: '122341209323',
    name: 'محمد صادق جاسم محسن',
    school: 'اعدادية المتفوقين',
    governorate: 'البصرة',
    finalStatus: 'مكمل',
    statusColor: 'text-amber-600',
    disclaimer: 'يُعد هذا تبليغاً بنتيجة الطالب فقط، ولا يُعتبر وثيقة رسمية معتمدة لأي غرض كان.',
    grades: [
      { subject: 'الاسلامية', score: '80' },
      { subject: 'العربية', score: '72' },
      { subject: 'الانكليزية', score: 'م', isYellowBg: true },
      { subject: 'الاحياء', score: '75' },
      { subject: 'الرياضيات', score: '81' },
      { subject: 'الكيمياء', score: 'م', isYellowBg: true },
      { subject: 'الفيزياء', score: '65' },
    ],
  },
];
