import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  PiggyBank, 
  CreditCard, 
  Target, 
  ShieldCheck, 
  Award, 
  Timer,
  ChevronRight,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents imports
import NotesView from './components/NotesView';
import SavingsCalculator from './components/SavingsCalculator';
import CreditCalculator from './components/CreditCalculator';
import FinancialPlanner from './components/FinancialPlanner';
import InsuranceCalculator from './components/InsuranceCalculator';
import TaxationCalculator from './components/TaxationCalculator';
import PracticeQuiz from './components/PracticeQuiz';

// Multi-language context
import { LanguageProvider, useLanguage } from './LanguageContext';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<'notes' | 'savings' | 'credit' | 'planner' | 'insurance' | 'taxation' | 'quiz'>('notes');
  const { lang, setLang, t } = useLanguage();

  // Interactive sidebar items
  const menuItems = [
    {
      id: 'notes',
      name: t('tabNotes', 'Learning Hub'),
      desc: t('tabNotesDesc', 'Syllabus formulas & terms summaries'),
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-blue-50/80 text-blue-600'
    },
    {
      id: 'savings',
      name: t('tabSavings', 'Savings & Investments'),
      desc: t('tabSavingsDesc', 'Simple/compound growth & ROI'),
      icon: <PiggyBank className="w-5 h-5" />,
      color: 'bg-emerald-50/80 text-emerald-600'
    },
    {
      id: 'credit',
      name: t('tabCredit', 'Credit Card & Loans'),
      desc: t('tabCreditDesc', 'Debt trap & loan amortization'),
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-amber-50/80 text-amber-600'
    },
    {
      id: 'planner',
      name: t('tabPlanner', 'SMART Cash Plan'),
      desc: t('tabPlannerDesc', 'Cash flow & goal feasibility solver'),
      icon: <Target className="w-5 h-5" />,
      color: 'bg-sky-50/80 text-sky-600'
    },
    {
      id: 'insurance',
      name: t('tabInsurance', 'Risk & Insurance'),
      desc: t('tabInsuranceDesc', 'Life premiums & co-insurance formulas'),
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'bg-rose-50/80 text-rose-600'
    },
    {
      id: 'taxation',
      name: t('tabTaxation', 'Consumer Taxation'),
      desc: t('tabTaxationDesc', 'Malaysian LHDN, JPJ & SST calculator'),
      icon: <Calculator className="w-5 h-5" />,
      color: 'bg-indigo-50/80 text-indigo-600'
    },
    {
      id: 'quiz',
      name: t('tabQuiz', 'SPM Practice Yard'),
      desc: t('tabQuizDesc', 'Interactive math exam test'),
      icon: <Award className="w-5 h-5" />,
      color: 'bg-violet-50/80 text-violet-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Top Header Banner */}
      <header className="bg-slate-900 text-white py-4 px-6 md:px-12 sticky top-0 z-40 shadow-md border-b border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                  {t('appName', 'FinaMath Pro')} <span className="text-blue-400">Pro</span>
                </h1>
                <span className="text-[9px] bg-blue-500/10 border border-blue-500/30 text-blue-400 font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">{t('kssmLabel', 'KSSM Malaysia')}</span>
              </div>
              <p className="text-xs text-slate-400">{t('subtitle', 'Malaysian SPM Secondary • Form 3 Ch 3 • Form 4 Ch 10 • Form 5 Ch 3 & Ch 4')}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Lingo Switcher Toggle */}
            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700/60 font-sans text-[11px] select-none items-center gap-1 shadow-inner h-9">
              <span className="text-[10px] text-slate-500 font-bold px-1 flex items-center gap-1 uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5" /> Language:
              </span>
              <button
                id="btn-lang-en"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-lg font-bold transition-all h-7 flex items-center justify-center ${
                  lang === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                id="btn-lang-ms"
                onClick={() => setLang('ms')}
                className={`px-3 py-1 rounded-lg font-bold transition-all h-7 flex items-center justify-center ${
                  lang === 'ms' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                BM
              </button>
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-xs font-semibold font-mono bg-slate-800 p-2 py-1.5 rounded-lg border border-slate-700/50 h-9">
              <Timer className="w-4 h-4 text-blue-400" />
              <span>{t('tracker', 'Curriculum Mode Tracker')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation Sidebar */}
        <section className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h2 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase px-2 mb-2">{t('sectionsHeader', 'Curriculum Sections')}</h2>
            <nav className="flex flex-col space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`menu-item-${item.id}`}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`group w-full p-3 rounded-xl text-left transition-all duration-200 flex items-center justify-between border ${
                      isActive 
                        ? 'bg-blue-50/90 border-transparent border-l-4 border-l-blue-600 text-blue-700 font-bold shadow-xs' 
                        : 'bg-white border-transparent text-slate-600 hover:text-slate-950 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition group-hover:scale-105 ${isActive ? 'bg-blue-600 text-white' : item.color}`}>
                        {item.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold block leading-none">{item.name}</span>
                        <span className={`text-[10px] block mt-0.5 leading-none ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>{item.desc}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition ${isActive ? 'text-blue-600' : 'text-slate-300 group-hover:translate-x-0.5'}`} />
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick reference curriculum guidelines box */}
          <div className="p-4 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] rounded-2xl leading-relaxed">
            <span className="font-bold text-slate-800 block mb-1">{t('kpmMatchTitle', '📋 KPM Curriculum Guideline Match')}</span>
            {t('kpmMatch', 'Designed to match mathematical formulations of consumer mathematics for Form 3 (Interest, Loans), Form 4 (SMART Budget criteria), and Form 5 (Deductible caps & Property risk premium co-sharing calculations).')}
          </div>
        </section>

        {/* Interactive App content panel */}
        <section className="lg:col-span-9 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'notes' && <NotesView />}
              {activeTab === 'savings' && <SavingsCalculator />}
              {activeTab === 'credit' && <CreditCalculator />}
              {activeTab === 'planner' && <FinancialPlanner />}
              {activeTab === 'insurance' && <InsuranceCalculator />}
              {activeTab === 'taxation' && <TaxationCalculator />}
              {activeTab === 'quiz' && <PracticeQuiz />}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      <footer className="bg-slate-100 border-t border-slate-200 py-4 px-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-medium text-slate-500 shrink-0 uppercase tracking-widest gap-4 mt-auto">
        <div className="flex gap-4">
          <span>Version 2.4.1</span>
          <span>Verified (KSSM)</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Syllabus Verified</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
