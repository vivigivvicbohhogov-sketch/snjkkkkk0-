import React, { useState } from 'react';
import { initialStudent, sampleStudents } from './data';
import { StudentData } from './types';
import { StudentInfoCard } from './components/StudentInfoCard';
import { ResultTableCard } from './components/ResultTableCard';
import { NajahLoginScreen } from './components/NajahLoginScreen';
import { ActionButtons } from './components/ActionButtons';

export default function App() {
  const [currentStudent, setCurrentStudent] = useState<StudentData>(initialStudent);
  const [viewMode, setViewMode] = useState<'login' | 'result'>('login');
  const [isLoadingResult, setIsLoadingResult] = useState<boolean>(false);

  // Search or login handler
  const handleSearchLogin = (examNumber: string) => {
    setIsLoadingResult(true);

    setTimeout(() => {
      setIsLoadingResult(false);
      const query = examNumber.trim();
      const found = sampleStudents.find(
        (s) => s.examNumber === query || s.id === query || query.length === 0
      );

      if (found) {
        setCurrentStudent(found);
      } else {
        setCurrentStudent(initialStudent);
      }

      setViewMode('result');
    }, 550);
  };

  const handleBackToHome = () => {
    setViewMode('login');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col items-center justify-center font-['Cairo',sans-serif] text-[#303030] antialiased selection:bg-blue-100 selection:text-blue-900 p-3 sm:p-6">
      {viewMode === 'login' ? (
        /* Login / Portal Screen */
        <main className="w-full flex items-center justify-center">
          <NajahLoginScreen
            onSearchSubmit={handleSearchLogin}
            isLoading={isLoadingResult}
          />
        </main>
      ) : (
        /* Clean Student Result View - Without any fake phone bars or navigation buttons */
        <main className="w-full max-w-[440px] flex flex-col items-center justify-center py-4 print-container animate-in fade-in zoom-in-95 duration-200">
          <div className="w-full space-y-4">
            {/* Card 1: Student Info Card */}
            <StudentInfoCard student={currentStudent} />

            {/* Card 2: Result Table Card (Click "النتيجة" to open secret color control) */}
            <ResultTableCard grades={currentStudent.grades} />

            {/* Action buttons (Return to home & Print) */}
            <div className="pt-1">
              <ActionButtons onBackToHome={handleBackToHome} onPrint={handlePrint} />
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
