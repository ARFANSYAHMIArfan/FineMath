import React, { useState } from 'react';
import { SPM_QUIZ_QUESTIONS } from '../utils';
import { BookOpen, Check, X, RotateCcw, Award, ArrowRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export default function PracticeQuiz() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const { lang, t } = useLanguage();

  const totalQuestions = SPM_QUIZ_QUESTIONS.length;
  const currentQuestion = SPM_QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (optIndex: number) => {
    if (answers[currentQuestion.id] !== undefined) return; // already answered
    setAnswers({
      ...answers,
      [currentQuestion.id]: optIndex
    });
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentIdx(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  // Score calculation
  const score = Object.entries(answers).reduce((acc, [qId, ansIdx]) => {
    const qObj = SPM_QUIZ_QUESTIONS.find(q => q.id === Number(qId));
    if (qObj && qObj.correctIndex === ansIdx) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div id="practice-quiz-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* LEFT SIDE ACTIVE QUESTION AREA */}
      <div className="lg:col-span-8">
        {!quizCompleted ? (
          <div className="bg-white p-6 rounded-2xl border border-slate-101 shadow-xs relative">
            {/* Header progress line */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">
                  {currentQuestion.chapter}
                </span>
                <h4 className="font-display font-bold text-slate-800 text-sm mt-0.5">
                  {lang === 'ms' ? "Laman Latihan Silibus" : "Syllabus Practice Yard"}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                Q {currentIdx + 1} / {totalQuestions}
              </span>
            </div>

            {/* Progress bar line */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
              <div
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                className="h-full bg-blue-600 transition-all duration-300"
              />
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <p className="text-slate-800 font-semibold text-sm sm:text-base leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>

            {/* Options grid */}
            <div className="space-y-3">
              {currentQuestion.options.map((opt, oIdx) => {
                const isSelected = answers[currentQuestion.id] === oIdx;
                const wasAnswered = answers[currentQuestion.id] !== undefined;
                const isCorrectOption = oIdx === currentQuestion.correctIndex;
                const isIncorrectSelection = isSelected && !isCorrectOption;

                let optionStyles = 'border-slate-100 bg-slate-50/50 text-slate-700 hover:bg-slate-100/50';
                let checkIcon = null;

                if (wasAnswered) {
                  if (isCorrectOption) {
                    optionStyles = 'border-emerald-200 bg-emerald-50 text-emerald-800 font-semibold';
                    checkIcon = <Check className="w-4 h-4 text-emerald-600 shrink-0" />;
                  } else if (isIncorrectSelection) {
                    optionStyles = 'border-rose-200 bg-rose-50 text-rose-800';
                    checkIcon = <X className="w-4 h-4 text-rose-600 shrink-0" />;
                  } else {
                    optionStyles = 'border-slate-101 bg-slate-100/20 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    id={`opt-btn-${oIdx}`}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={wasAnswered}
                    className={`w-full p-4 rounded-xl text-left text-xs transition-all duration-200 border flex justify-between items-center cursor-pointer ${optionStyles}`}
                  >
                    <span>{opt}</span>
                    {checkIcon}
                  </button>
                );
              })}
            </div>

            {/* Explanations block */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50/45 border border-blue-100 rounded-xl"
              >
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <strong className="text-blue-950 font-bold font-display block mb-1">
                      {lang === 'ms' ? "Panduan Penyelesaian Matematik:" : "Mathematical Solution Guide:"}
                    </strong>
                    {currentQuestion.explanation}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next buttons */}
            {answers[currentQuestion.id] !== undefined && (
              <div className="mt-6 flex justify-end">
                <button
                  id="btn-quiz-next"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition duration-200 flex items-center gap-1.5 shadow-md shadow-blue-100 h-10"
                >
                  {currentIdx === totalQuestions - 1 
                    ? (lang === 'ms' ? 'Selesai Kuiz' : 'Finish Quiz') 
                    : (lang === 'ms' ? 'Soalan Seterusnya' : 'Next Question')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center flex flex-col justify-center items-center shadow-xs">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 animate-bounce">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-xl">
              {lang === 'ms' ? "Kuiz Silibus Selesai!" : "Syllabus Quiz Completed!"}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              {lang === 'ms' 
                ? "Syabas kerana telah berjaya menyelesaikan ujian simulasi formula matematik pengguna bagi Simpanan, pelaburan, kadar faedah, pinjaman harian, SMART bajet, perlindungan insurans, dan pengiraan cukai."
                : "Great job working through the consumer math formulas covering Savings, investments, loans, budgets, and insurance premium policies."}
            </p>

            <div className="my-6">
              <div className="text-5xl font-display font-extrabold text-blue-600">{score} / {totalQuestions}</div>
              <span className="text-[10px] bg-blue-50 text-blue-700 rounded-full px-2.5 py-0.5 font-bold uppercase block mt-1 tracking-wider">
                {lang === 'ms' ? "Nilai Peratusan Skor:" : "Score multiplier:"} {Math.round((score / totalQuestions) * 100)}%
              </span>
            </div>

            <button
              onClick={resetQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-6 rounded-xl transition duration-200 flex items-center gap-1.5 shadow-md h-10"
            >
              <RotateCcw className="w-4 h-4" /> {lang === 'ms' ? "Mula Semula Ujian" : "Restart Test"}
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE QUIZ STATUS SUMMARY */}
      <div className="lg:col-span-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h4 className="font-display font-bold text-slate-800 text-sm">
            {lang === 'ms' ? "Kad Penjejak Peperiksaan" : "Exam Tracker Card"}
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {lang === 'ms' 
              ? "Soalan praktis dibina mengikut piawaian khusus soalan SPM berdasarkan buku teks utama KPM!"
              : "Test questions are generated dynamically to cover the exact exam metrics derived from the Malaysian Secondary textbook guidelines!"}
          </p>

          <div className="grid grid-cols-5 gap-2 pt-2 border-t border-slate-100">
            {SPM_QUIZ_QUESTIONS.map((q, idx) => {
              const ansValue = answers[q.id];
              let squareColor = 'bg-slate-50 text-slate-400 border-slate-101';
              if (idx === currentIdx) {
                squareColor = 'bg-blue-50 border-blue-500 text-blue-700 font-bold';
              } else if (ansValue !== undefined) {
                const isCorrect = ansValue === q.correctIndex;
                squareColor = isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-rose-50 border-rose-300 text-rose-700';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    if (ansValue !== undefined || idx === currentIdx) {
                      setCurrentIdx(idx);
                      setShowExplanation(ansValue !== undefined);
                    }
                  }}
                  className={`aspect-square w-full rounded-md border text-xs flex items-center justify-center font-mono cursor-pointer transition ${squareColor}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] border-t border-slate-100 pt-3 text-slate-400 space-y-1.5 font-sans">
            <span className="font-bold uppercase tracking-wider block text-slate-500 mb-1">
              {lang === 'ms' ? "Panduan Warna:" : "Color Guide:"}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> 
              {lang === 'ms' ? "Jawapan Betul" : "Correct Answer"}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block" /> 
              {lang === 'ms' ? "Jawapan Salah" : "Incorrect Answer"}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-200 inline-block" /> 
              {lang === 'ms' ? "Soalan Aktif" : "Active Question"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
