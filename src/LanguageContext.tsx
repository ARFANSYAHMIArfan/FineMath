import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ms';

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// A simple translation dictionary for global, navigation and core UI terms.
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation / Header
    appName: 'FinaMath Pro',
    kssmLabel: 'KSSM Malaysia',
    subtitle: 'Malaysian SPM Secondary • Form 3 Ch 3 • Form 4 Ch 10 • Form 5 Ch 3 & Ch 4',
    tracker: 'Curriculum Mode Tracker',
    sectionsHeader: 'Curriculum Sections',
    kpmMatch: 'Designed to match mathematical formulations of consumer mathematics for Form 3 (Interest, Loans), Form 4 (SMART Budget criteria), and Form 5 (Deductible caps & Property risk premium co-sharing calculations).',
    kpmMatchTitle: '📋 KPM Curriculum Guideline Match',

    // Section names
    tabNotes: 'Learning Hub',
    tabNotesDesc: 'Syllabus formulas & terms summaries',
    tabSavings: 'Savings & Investments',
    tabSavingsDesc: 'Simple/compound growth & ROI',
    tabCredit: 'Credit Card & Loans',
    tabCreditDesc: 'Debt trap & loan amortization',
    tabPlanner: 'SMART Cash Plan',
    tabPlannerDesc: 'Cash flow & goal feasibility solver',
    tabInsurance: 'Risk & Insurance',
    tabInsuranceDesc: 'Life premiums & co-insurance formulas',
    tabTaxation: 'Consumer Taxation',
    tabTaxationDesc: 'Malaysian LHDN, JPJ & SST calculator',
    tabQuiz: 'SPM Practice Yard',
    tabQuizDesc: 'Interactive math exam test',

    // General Words
    calculate: 'Calculate',
    reset: 'Reset',
    formula: 'Formula',
    example: 'Example',
    solution: 'Solution',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    finish: 'Finish',
    correct: 'Correct',
    incorrect: 'Incorrect',
    explanation: 'Explanation',
  },
  ms: {
    // Navigation / Header
    appName: 'FinaMath Pro',
    kssmLabel: 'KSSM Malaysia',
    subtitle: 'Sekolah Menengah SPM Malaysia • Ting. 3 Bab 3 • Ting. 4 Bab 10 • Ting. 5 Bab 3 & Bab 4',
    tracker: 'Penjejak Mod Kurikulum',
    sectionsHeader: 'Bahagian Kurikulum',
    kpmMatch: 'Direka khas untuk mematuhi formula matematik pengguna bagi Tingkatan 3 (Faedah, Pinjaman), Tingkatan 4 (Kriteria Belanjawan SMART), dan Tingkatan 5 (Had deduktibel & pengiraan premium insurans perkongsian risiko).',
    kpmMatchTitle: '📋 Pematuhan Panduan Kurikulum KPM',

    // Section names
    tabNotes: 'Hab Pembelajaran',
    tabNotesDesc: 'Ringkasan formula & istilah silibus',
    tabSavings: 'Simpanan & Pelaburan',
    tabSavingsDesc: 'Pertumbuhan mudah/kompaun & ROI',
    tabCredit: 'Kad Kredit & Pinjaman',
    tabCreditDesc: 'Perangkap hutang & amortisasi pinjaman',
    tabPlanner: 'Pelan Tunai SMART',
    tabPlannerDesc: 'Aliran tunai & penyelesai kelayakan matlamat',
    tabInsurance: 'Risiko & Insurans',
    tabInsuranceDesc: 'Premium hayat & formula ko-insurans',
    tabTaxation: 'Percukaian Pengguna',
    tabTaxationDesc: 'Kalkulator LHDN, JPJ & SST Malaysia',
    tabQuiz: 'Laman Latihan SPM',
    tabQuizDesc: 'Ujian peperiksaan matematik interaktif',

    // General Words
    calculate: 'Kira',
    reset: 'Set Semula',
    formula: 'Formula',
    example: 'Contoh',
    solution: 'Penyelesaian',
    back: 'Kembali',
    next: 'Seterusnya',
    previous: 'Sebelumnya',
    finish: 'Selesai',
    correct: 'Betul',
    incorrect: 'Salah',
    explanation: 'Penjelasan',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string, defaultText?: string): string => {
    return translations[lang][key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
