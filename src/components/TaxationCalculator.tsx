import React, { useState } from 'react';
import { 
  FileText, 
  Map, 
  Home, 
  ShoppingBag, 
  Calculator, 
  DollarSign, 
  Info, 
  ShieldAlert, 
  CheckCircle, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  calculateIncomeTax, 
  calculateRoadTax, 
  calculatePropertyAssessment, 
  calculateQuitRent, 
  calculateSst 
} from '../utils';
import { 
  IncomeTaxInput, 
  RoadTaxInput, 
  PropertyAssessmentInput, 
  QuitRentInput, 
  SstInput 
} from '../types';
import { useLanguage } from '../LanguageContext';

export default function TaxationCalculator() {
  const { lang } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'income' | 'road' | 'property' | 'land' | 'sst'>('income');

  // INCOME TAX STATES
  const [incomeInput, setIncomeInput] = useState<IncomeTaxInput>({
    totalAnnualIncome: 74000,
    taxExemptions: 1000,
    individualRelief: 9000, // Predefined standard relief in KSSM
    lifeInsuranceEPFRelief: 7000,
    medicalInsuranceRelief: 1325,
    parentMedicalRelief: 1250,
    educationRelief: 0,
    otherReliefs: 0,
    zakat: 0,
    monthlyPCB: 180
  });

  // ROAD TAX STATES
  const [roadInput, setRoadInput] = useState<RoadTaxInput>({
    engineCapacity: 1800,
    vehicleType: 'car',
    location: 'peninsular'
  });

  // PROPERTY ASSESSMENT STATES
  const [propertyInput, setPropertyInput] = useState<PropertyAssessmentInput>({
    annualValue: 6580,
    taxRatePercent: 5
  });

  // QUIT RENT STATES
  const [quitInput, setQuitInput] = useState<QuitRentInput>({
    landArea: 130,
    ratePerUnitArea: 0.43
  });

  // SST STATES
  const [sstInput, setSstInput] = useState<SstInput>({
    amount: 480,
    taxType: 'service6'
  });

  // CALCULATIONS
  const incomeResult = calculateIncomeTax(incomeInput);
  const roadResult = calculateRoadTax(roadInput);
  const propertyResult = calculatePropertyAssessment(propertyInput);
  const quitResult = calculateQuitRent(quitInput);
  const sstResult = calculateSst(sstInput);

  // RESET SAMPLES FUNCTIONS
  const loadExampleLimit2 = () => {
    setIncomeInput({
      totalAnnualIncome: 74000,
      taxExemptions: 1000,
      individualRelief: 9000,
      lifeInsuranceEPFRelief: 7000,
      medicalInsuranceRelief: 1325,
      parentMedicalRelief: 1250,
      educationRelief: 0,
      otherReliefs: 0,
      zakat: 0,
      monthlyPCB: 180
    });
  };

  const loadExample1 = () => {
    setIncomeInput({
      totalAnnualIncome: 125300,
      taxExemptions: 2000, // Donation
      individualRelief: 9000,
      lifeInsuranceEPFRelief: 7000,
      medicalInsuranceRelief: 3000,
      parentMedicalRelief: 0,
      educationRelief: 7000,
      otherReliefs: 5500, // sum of rest
      zakat: 0,
      monthlyPCB: 450
    });
  };

  return (
    <div id="taxation-calculator-workspace" className="space-y-6">
      {/* Visual Hub Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-lg border border-indigo-150 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Calculator className="w-32 h-32" />
        </div>
        <div className="max-w-2xl relative z-10">
          <span className="text-[10px] font-bold tracking-widest bg-blue-500/35 border border-blue-400/30 px-2.5 py-1 rounded-full uppercase">
            {lang === 'ms' ? "Alatan Silibus Tingkatan 5 Bab 4" : "Form 5 Chapter 4 Syllabus Tools"}
          </span>
          <h2 className="font-display font-bold text-lg sm:text-2xl mt-2">
            {lang === 'ms' ? "Matematik Pengguna: Laman Percukaian" : "Consumer Mathematics: Taxation Yard"}
          </h2>
          <p className="text-xs text-blue-100 mt-1.5 leading-relaxed">
            {lang === 'ms' 
              ? "Sahkan formula percukaian buku teks. Kira Cukai Pendapatan Peribadi Malaysia, jadual Cukai Jalan JPJ, penilaian taksiran pintu, tarif Cukai Tanah negeri, dan Levi Cukai Jualan/Perkhidmatan (SST) berserta jalan pengiraan pengiraan matematik lengkap."
              : "Verify textbook taxation formulas. Compute Malaysian Personal Income Tax, JPJ Road Tax schedules, assessment valuations, state land Rent tariffs, and Sales/Services Tax (SST) levies with full mathematical breakdown."}
          </p>
        </div>
      </div>

      {/* Internal Subtabs Row */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-xs flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveSubTab('income')}
          className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-1.5 ${
            activeSubTab === 'income' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <DollarSign className="w-4 h-4" /> {lang === 'ms' ? "1. Cukai Pendapatan (LHDN)" : "1. Income Tax (LHDN)"}
        </button>
        <button
          onClick={() => setActiveSubTab('road')}
          className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-1.5 ${
            activeSubTab === 'road' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" /> {lang === 'ms' ? "2. Cukai Jalan (JPJ)" : "2. Road Tax (JPJ)"}
        </button>
        <button
          onClick={() => setActiveSubTab('property')}
          className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-1.5 ${
            activeSubTab === 'property' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Home className="w-4 h-4" /> {lang === 'ms' ? "3. Cukai Pintu (Taksiran)" : "3. Property Assessment"}
        </button>
        <button
          onClick={() => setActiveSubTab('land')}
          className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-1.5 ${
            activeSubTab === 'land' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Map className="w-4 h-4" /> {lang === 'ms' ? "4. Cukai Tanah" : "4. Quit Rent Land"}
        </button>
        <button
          onClick={() => setActiveSubTab('sst')}
          className={`px-3 py-2 rounded-xl text-xs font-bold font-sans transition flex items-center gap-1.5 ${
            activeSubTab === 'sst' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> {lang === 'ms' ? "5. Cukai Jualan & Perkhidmatan (SST)" : "5. Sales & Service (SST)"}
        </button>
      </div>

      {/* Calculator Body - Conditional Render by activeSubTab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ======================= INCOME TAX CALCULATOR PANEL ======================= */}
        {activeSubTab === 'income' && (
          <>
            {/* Input card */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Calculator className="w-4.5 h-4.5 text-blue-600" />
                  {lang === 'ms' ? "Input Borang Cukai Pendapatan LHDN" : "LHDN Income Tax Form Inputs"}
                </h3>
                <div className="flex gap-1">
                  <button 
                    onClick={loadExampleLimit2}
                    className="text-[9px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded"
                    title={lang === 'ms' ? "Sediakan Contoh 2 Lim" : "Load Lim's Example 2"}
                  >
                    {lang === 'ms' ? "Contoh 2 (Lim)" : "Ex. 2 (Lim)"}
                  </button>
                  <button 
                    onClick={loadExample1}
                    className="text-[9px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded"
                    title={lang === 'ms' ? "Sediakan Contoh 1 Khairul" : "Load Khairul's Example 1"}
                  >
                    {lang === 'ms' ? "Contoh 1 (Khairul)" : "Ex. 1 (Khairul)"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Jumlah Pendapatan Tahunan (RM)" : "Total Annual Income (RM)"}
                  </label>
                  <input 
                    type="number"
                    value={incomeInput.totalAnnualIncome}
                    onChange={(e) => setIncomeInput({ ...incomeInput, totalAnnualIncome: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'ms' ? "Termasuk gaji pokok, dividen & pendapatan sewa" : "Includes basic wages, dividend & rental"}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Pengecualian Cukai (RM)" : "Tax Exemptions (RM)"}
                  </label>
                  <input 
                    type="number"
                    value={incomeInput.taxExemptions}
                    onChange={(e) => setIncomeInput({ ...incomeInput, taxExemptions: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-100"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'ms' ? "Derma perpustakaan & hadiah (Had terhad)" : "Gifts & library donations (Capped limits)"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="text-[10px] uppercase font-bold text-blue-600 block mb-2 tracking-wide font-sans">
                  {lang === 'ms' ? "Pelepasan & Had Tuntutan (Silibus SPM):" : "Claims & Relief Caps (SPM Textbook Settings):"}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      {lang === 'ms' ? "Pelepasan Individu Standard (RM)" : "Individual Standard Relief (RM)"}
                    </label>
                    <input 
                      type="number"
                      disabled
                      value={incomeInput.individualRelief}
                      className="w-full p-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-lg font-mono"
                    />
                    <p className="text-[9px] text-slate-400 mt-0.5">
                      {lang === 'ms' ? "Rebat pelepasan tetap RM 9,000" : "Fixed RM 9,000 allowance"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      {lang === 'ms' ? "Insurans Hayat & KWSP (RM)" : "Life Insurance & EPF (RM)"}
                    </label>
                    <input 
                      type="number"
                      value={incomeInput.lifeInsuranceEPFRelief}
                      onChange={(e) => setIncomeInput({ ...incomeInput, lifeInsuranceEPFRelief: Math.max(0, Number(e.target.value)) })}
                      className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none"
                    />
                    <p className="text-[9px] text-amber-600 font-bold mt-0.5">
                      {lang === 'ms' ? "Had Maksimum RM 7,000" : "Capped at Max RM 7,000"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      {lang === 'ms' ? "Insurans Perubatan (RM)" : "Medical Insurance (RM)"}
                    </label>
                    <input 
                      type="number"
                      value={incomeInput.medicalInsuranceRelief}
                      onChange={(e) => setIncomeInput({ ...incomeInput, medicalInsuranceRelief: Math.max(0, Number(e.target.value)) })}
                      className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none"
                    />
                    <p className="text-[9px] text-amber-600 font-bold mt-0.5">
                      {lang === 'ms' ? "Had Maksimum RM 3,000" : "Capped at Max RM 3,000"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      {lang === 'ms' ? "Perubatan Ibu Bapa (RM)" : "Parent Medical Cure (RM)"}
                    </label>
                    <input 
                      type="number"
                      value={incomeInput.parentMedicalRelief}
                      onChange={(e) => setIncomeInput({ ...incomeInput, parentMedicalRelief: Math.max(0, Number(e.target.value)) })}
                      className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none"
                    />
                    <p className="text-[9px] text-amber-600 font-bold mt-0.5">
                      {lang === 'ms' ? "Had Maksimum RM 8,000" : "Capped at Max RM 8,000"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      {lang === 'ms' ? "Yuran Pengajian / Pendidikan (RM)" : "Education Fees Claim (RM)"}
                    </label>
                    <input 
                      type="number"
                      value={incomeInput.educationRelief}
                      onChange={(e) => setIncomeInput({ ...incomeInput, educationRelief: Math.max(0, Number(e.target.value)) })}
                      className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none"
                    />
                    <p className="text-[9px] text-amber-600 font-bold mt-0.5">
                      {lang === 'ms' ? "Had Maksimum RM 7,000" : "Capped at Max RM 7,000"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-500 font-semibold mb-1">
                      {lang === 'ms' ? "Pelepasan Lain / Gaya Hidup (RM)" : "Other Reliefs / Lifestyle (RM)"}
                    </label>
                    <input 
                      type="number"
                      value={incomeInput.otherReliefs}
                      onChange={(e) => setIncomeInput({ ...incomeInput, otherReliefs: Math.max(0, Number(e.target.value)) })}
                      className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none"
                    />
                    <p className="text-[9px] text-amber-600 font-bold mt-0.5">
                      {lang === 'ms' ? "Had Maksimum RM 2,500" : "Capped at Max RM 2,500"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">
                    {lang === 'ms' ? "Zakat / Fitrah Dibayar (RM)" : "Zakat / Fitrah Paid (RM)"}
                  </label>
                  <input 
                    type="number"
                    value={incomeInput.zakat}
                    onChange={(e) => setIncomeInput({ ...incomeInput, zakat: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-[9px] text-slate-400 mt-1">
                    {lang === 'ms' ? "Ditolak terus sebagai rebat cukai pendapatan" : "Deducted as tax rebate directly"}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "PCB Bulanan Dibayar (RM)" : "Monthly PCB Paid (RM)"}
                  </label>
                  <input 
                    type="number"
                    value={incomeInput.monthlyPCB}
                    onChange={(e) => setIncomeInput({ ...incomeInput, monthlyPCB: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-[9px] text-slate-400 mt-1">
                    {lang === 'ms' ? "Potongan Cukai Bulanan daripada penggajian bergaji" : "Potongan Cukai Bulanan salary deduction"}
                  </p>
                </div>
              </div>
            </div>

            {/* Results card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
                <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
                  {lang === 'ms' ? "Output Formula Cukai LHDN" : "LHDN Tax Formulation Output"}
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                    <span className="text-[9px] text-slate-400 block font-bold uppercase">
                      {lang === 'ms' ? "Pendapatan Bercukai" : "Chargeable Income"}
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-800 mt-1 block">
                      RM {incomeResult.chargeableIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-blue-50/45 p-3 rounded-xl border border-blue-105 text-center">
                    <span className="text-[9px] text-blue-700 block font-bold uppercase">
                      {lang === 'ms' ? "Cukai Pendapatan Bersih" : "Net Tax Payable"}
                    </span>
                    <span className="text-sm font-bold font-mono text-blue-700 mt-1 block">
                      RM {incomeResult.taxPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Step-by-Step educational guide */}
                <div className="space-y-2 text-[11px] bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-800 text-[10px] block uppercase tracking-wider mb-2">
                    {lang === 'ms' ? "Langkah demi Langkah Formula Pengiraan:" : "Step-by-Step Calculation Formula Path:"}
                  </span>
                  
                  <div className="flex justify-between items-center text-slate-600 border-b border-slate-200/50 pb-1.5">
                    <span>{lang === 'ms' ? "1. Jumlah Pendapatan Tahunan:" : "1. Total Annual Income:"}</span>
                    <span className="font-mono font-semibold">RM {incomeInput.totalAnnualIncome.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 border-b border-slate-200/50 pb-1.5">
                    <span>{lang === 'ms' ? "2. Tolak Pengecualian:" : "2. Exemptions deducted:"}</span>
                    <span className="font-mono font-semibold text-rose-600">&minus; RM {incomeInput.taxExemptions.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 border-b border-slate-200/50 pb-1.5">
                    <span>{lang === 'ms' ? "3. Pelepasan Dibenarkan (Terhad):" : "3. Reliefs allowed (Capped):"}</span>
                    <div className="text-right">
                      <span className="font-mono font-semibold text-rose-600 block">
                        &minus; RM {(incomeInput.totalAnnualIncome - incomeInput.taxExemptions - incomeResult.chargeableIncome).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center font-bold text-slate-800 border-b border-slate-200 pt-1 pb-1.5">
                    <span>{lang === 'ms' ? "4. Pendapatan Bercukai:" : "4. Chargeable Income:"}</span>
                    <span className="font-mono text-blue-600">RM {incomeResult.chargeableIncome.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-start text-slate-600 border-b border-slate-200/50 pb-1.5 pt-1">
                    <span>{lang === 'ms' ? "5. Pengiraan Cukai mengikut Braket:" : "5. Calculated Bracket Tax:"}</span>
                    <div className="text-right font-mono text-xs">
                      <span className="font-bold block text-slate-800">RM {incomeResult.calculatedTax.toFixed(2)}</span>
                      {incomeResult.chargeableIncome > 50000 && (
                        <span className="text-[9px] text-slate-400 block">
                          {lang === 'ms' ? "(50,000 Pertama = RM 1,800 + 14% atas baki seterusnya)" : "(First 50,000 = RM 1,800 + 14% on next balance)"}
                        </span>
                      )}
                      {incomeResult.chargeableIncome > 35000 && incomeResult.chargeableIncome <= 50000 && (
                        <span className="text-[9px] text-slate-400 block">
                          {lang === 'ms' ? "(35,000 Pertama = RM 600 + 8% atas baki seterusnya)" : "(First 35,000 = RM 600 + 8% on next balance)"}
                        </span>
                      )}
                      {incomeResult.chargeableIncome <= 35000 && incomeResult.chargeableIncome > 20000 && (
                        <span className="text-[9px] text-slate-400 block">
                          {lang === 'ms' ? "(20,000 Pertama = RM 150 + 3% atas baki seterusnya)" : "(First 20,000 = RM 150 + 3% on next balance)"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 border-b border-slate-200/50 pb-1.5">
                    <span className="flex items-center gap-1">
                      {lang === 'ms' ? "6. Rebat Dikenakan:" : "6. Rebates Applied:"}
                      {incomeResult.chargeableIncome <= 35000 && (
                        <span className="text-[8px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          {lang === 'ms' ? "Rebat RM400 pendapatan rendah" : "Low Income RM400 rebate"}
                        </span>
                      )}
                    </span>
                    <span className="font-mono font-semibold text-emerald-600">
                      &minus; RM {incomeResult.taxRebate.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center font-bold text-slate-900 text-xs pt-1.5">
                    <span>{lang === 'ms' ? "Cukai Pendapatan Perlu Dibayar Akhir:" : "Final Net Payable Tax:"}</span>
                    <span className="font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded">RM {incomeResult.taxPayable.toFixed(2)}</span>
                  </div>
                </div>

                {/* PCB Audit Statement Box */}
                <div className={`p-4 rounded-xl border ${
                  incomeResult.status === 'insufficient' 
                    ? 'bg-amber-50/50 border-amber-200' 
                    : 'bg-emerald-50/50 border-emerald-200'
                }`}>
                  <div className="flex items-start gap-2.5">
                    {incomeResult.status === 'insufficient' ? (
                      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs">
                      <strong className={`font-semibold block ${incomeResult.status === 'insufficient' ? 'text-amber-900' : 'text-emerald-900'}`}>
                        {lang === 'ms' ? "Penilaian Audit PCB Bulanan (Pembelajaran Bab 4.1)" : "Monthly PCB Audit Evaluation (Chapter 4.1 lesson match)"}
                      </strong>
                      <div className="text-slate-600 mt-1 space-y-1 font-sans">
                        <p>
                          {lang === 'ms' ? "Jumlah potongan PCB selama 12 bulan:" : "Total Monthly PCB deducted over 12 months:"}{" "}
                          <span className="font-mono font-bold">RM {incomeResult.totalPCByear.toFixed(2)}</span>
                        </p>
                        {incomeResult.status === 'insufficient' ? (
                          <p className="text-[11px]">
                            {lang === 'ms' ? (
                              <>
                                ❌ Potongan gaji bulanan anda adalah <strong>tidak mencukupi</strong>. Anda masih berhutang{" "}
                                <span className="font-mono font-bold text-rose-600 mx-1">RM {incomeResult.taxDifference.toFixed(2)}</span>{" "}
                                yang mesti dibayar terus kepada Lembaga Hasil Dalam Negeri (LHDN).
                              </>
                            ) : (
                              <>
                                ❌ Your accumulated salary deductions are <strong>insufficient</strong>. You still owe 
                                <span className="font-mono font-bold text-rose-600 mx-1">RM {incomeResult.taxDifference.toFixed(2)}</span> 
                                which must be paid directly to the Inland Revenue Board (ITRF / LHDN).
                              </>
                            )}
                          </p>
                        ) : (
                          <p className="text-[11px]">
                            {lang === 'ms' ? (
                              <>
                                ✅ Potongan gaji bulanan anda melepasi kadar bersih perlu dibayar. LHDN akan memulangkan{" "}
                                <span className="font-mono font-bold text-emerald-700 mx-1">bayaran balik lebihan RM {incomeResult.taxDifference.toFixed(2)}</span>{" "}
                                ke dalam akaun bank berdaftar anda!
                              </>
                            ) : (
                              <>
                                ✅ Your accumulated deductions exceed the net payable rate. LHDN will issue a 
                                <span className="font-mono font-bold text-emerald-700 mx-1">refund excess of RM {incomeResult.taxDifference.toFixed(2)}</span> 
                                to your registered bank account!
                              </>
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ======================= ROAD TAX CALCULATOR PANEL ======================= */}
        {activeSubTab === 'road' && (
          <>
            {/* Input card */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Calculator className="w-4.5 h-4.5 text-blue-600" />
                {lang === 'ms' ? "Parameter Cukai Jalan JPJ" : "JPJ Road Tax Parameters"}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Kelas Kenderaan" : "Vehicle Class"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRoadInput({ ...roadInput, vehicleType: 'car' })}
                      className={`p-2 rounded-lg font-bold border transition text-center ${
                        roadInput.vehicleType === 'car'
                          ? 'bg-blue-600 border-transparent text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'ms' ? "Kereta Persendirian" : "Private Car"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoadInput({ ...roadInput, vehicleType: 'motorcycle' })}
                      className={`p-2 rounded-lg font-bold border transition text-center ${
                        roadInput.vehicleType === 'motorcycle'
                          ? 'bg-blue-600 border-transparent text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'ms' ? "Motosikal" : "Motorcycle"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Wilayah Geografi" : "Regional Territory"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRoadInput({ ...roadInput, location: 'peninsular' })}
                      className={`p-2 rounded-lg font-bold border transition text-center ${
                        roadInput.location === 'peninsular'
                          ? 'bg-blue-600 border-transparent text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {lang === 'ms' ? "Semenanjung Malaysia" : "Peninsular Malaysia"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoadInput({ ...roadInput, location: 'sabah_sarawak' })}
                      className={`p-2 rounded-lg font-bold border transition text-center ${
                        roadInput.location === 'sabah_sarawak'
                          ? 'bg-blue-600 border-transparent text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Sabah & Sarawak
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1">
                    {lang === 'ms' ? "Kapasiti Enjin (CC)" : "Engine Capacity (CC)"}
                  </label>
                  <input 
                    type="number"
                    value={roadInput.engineCapacity}
                    onChange={(e) => setRoadInput({ ...roadInput, engineCapacity: Math.max(50, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500"
                  />
                  
                  {/* Presets CC list for helper */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[10px] text-slate-400 self-center font-semibold">
                      {lang === 'ms' ? "Preset Silibus:" : "Syllabus Presets:"}
                    </span>
                    {[250, 600, 1000, 1500, 1800, 2000, 2500].map(cc => (
                      <button
                        key={cc}
                        type="button"
                        onClick={() => setRoadInput({ ...roadInput, engineCapacity: cc })}
                        className="text-[10px] font-mono bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md hover:bg-slate-100"
                      >
                        {cc}cc
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Road tax results */}
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
                {lang === 'ms' ? "Pecahan Cukai Pekali JPJ" : "JPJ Coefficient Tax Breakdown"}
              </h3>

              <div className="text-center py-6 bg-blue-50/45 rounded-2xl border border-blue-105">
                <span className="text-xs text-blue-700 block font-bold uppercase tracking-wider">
                  {lang === 'ms' ? "Jumlah Kos Cukai Jalan" : "Total Road Tax Cost"}
                </span>
                <span className="text-4xl font-display font-extrabold text-blue-900 mt-2 block font-mono">
                  RM {roadResult.totalRoadTax.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block font-sans">
                  {lang === 'ms' ? "Dikenakan setiap tahun sebelum pembaharuan insurans kenderaan" : "Levied annually prior to insurance renewal status"}
                </span>
              </div>

              <div className="space-y-2 text-[11px] font-mono text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="font-bold text-slate-800 text-[10px] block uppercase font-sans tracking-wide mb-2">
                  {lang === 'ms' ? "Pecahan Matematik:" : "Mathematical Expansion:"}
                </span>
                
                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="font-sans">{lang === 'ms' ? "Kadar Asas bagi peringkat CC:" : "Base Rate for CC tier:"}</span>
                  <span className="font-semibold text-slate-800 font-mono">RM {roadResult.baseRate.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="font-sans">{lang === 'ms' ? "Kadar Progresif Tambahan per lebihan CC:" : "Extra Progressive Cap per extra CC:"}</span>
                  <span className="font-semibold text-slate-700 font-mono">RM {roadResult.progressiveRatePerCc.toFixed(2)}/cc</span>
                </div>

                <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                  <span className="font-sans">{lang === 'ms' ? "Lebihan cc layak atas kategori asas:" : "Qualifying excess cc above base tier:"}</span>
                  <span className="font-semibold text-slate-700 font-mono">{roadResult.excessCc} cc</span>
                </div>

                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-sans">{lang === 'ms' ? "Bahagian sub-cukai progresif:" : "Portion of progressive sub-tax:"}</span>
                  <span className="font-semibold text-emerald-600 font-mono">RM {roadResult.progressiveTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-1.5 font-bold text-slate-900">
                  <span className="font-sans">{lang === 'ms' ? "Jumlah Pemfailan Tahunan Lengkap:" : "Completed Annual Sum:"}</span>
                  <span className="text-blue-600 text-xs">RM {roadResult.totalRoadTax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ======================= PROPERTY ASSESSMENT TAX PANEL ======================= */}
        {activeSubTab === 'property' && (
          <>
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Calculator className="w-4.5 h-4.5 text-blue-600" />
                {lang === 'ms' ? "Input Cukai Pintu (Taksiran)" : "Property Assessment Inputs"}
              </h3>

              <div className="space-y-4.5 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Nilai Tahunan / Nilai Sewaan Anggaran (RM)" : "Annual Rental Value (RM)"}
                  </label>
                  <input 
                    type="number"
                    value={propertyInput.annualValue}
                    onChange={(e) => setPropertyInput({ ...propertyInput, annualValue: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'ms' 
                      ? "Anggaran kadar sewaan kasar munasabah jika harta tanah disewakan selama 12 bulan (Contoh 3 Buku Teks ialah RM 6,580)." 
                      : "Estimation of reasonable gross rental if the property is leased out over 12 months (Example 3 is RM 6580)."}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Kadar Taksiran Peratusan (%)" : "Assessment Rate Percentage (%)"}
                  </label>
                  <input 
                    type="number"
                    step="0.1"
                    value={propertyInput.taxRatePercent}
                    onChange={(e) => setPropertyInput({ ...propertyInput, taxRatePercent: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'ms' 
                      ? "Kadar cukai yang ditetapkan oleh Pihak Berkuasa Tempatan (PBT) mengikut zon wilayah (Contoh 3 Buku Teks ialah 5%)." 
                      : "Tax rate fixed by Local Authorities based on zoning indices (Example 3 is 5%)."}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
                {lang === 'ms' ? "Penilaian Perbandaran (Pengesahan Contoh 3)" : "Municipal Evaluation (Example 3 Verification)"}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-105 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    {lang === 'ms' ? "Cukai Pintu Tahunan" : "Annual Premium Assessment"}
                  </span>
                  <span className="text-xl font-bold text-slate-800 font-mono mt-1.5 block">
                    RM {propertyResult.annualTax.toFixed(2)}
                  </span>
                </div>

                <div className="p-4 bg-blue-50/45 border border-blue-105 rounded-xl text-center">
                  <span className="text-[10px] text-blue-700 block font-bold uppercase">
                    {lang === 'ms' ? "Yuran Ansuran Setengah Tahun" : "Half-Year Instalment Fee"}
                  </span>
                  <span className="text-xl font-bold text-blue-800 font-mono mt-1.5 block">
                    RM {propertyResult.halfYearlyTax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-800 block text-[10.5px] uppercase">
                  {lang === 'ms' ? "Semakan Padanan Formula:" : "Formula Match Check:"}
                </span>
                <p><code>{lang === 'ms' ? "Cukai Pintu = kadar taksiran × nilai tahunan" : "Annual Assessment = rate × annual value"}</code></p>
                <p><code>Cukai Pintu = {propertyInput.taxRatePercent}% &times; RM {propertyInput.annualValue.toLocaleString()} = RM {propertyResult.annualTax.toFixed(2)}</code></p>
                <p className="font-sans text-slate-400">
                  {lang === 'ms' 
                    ? "Cukai pintu dibayar dua kali setahun (setiap 6 bulan):" 
                    : "Property tax is payable twice yearly (every 6 months):"}
                </p>
                <p><code>{lang === 'ms' ? "Kos Setengah Tahun" : "Half-Year Cost"} = RM {propertyResult.annualTax.toFixed(2)} / 2 = RM {propertyResult.halfYearlyTax.toFixed(2)} {lang === 'ms' ? "tiap setengah tahun" : "each half-year"}</code></p>
              </div>
            </div>
          </>
        )}

        {/* ======================= QUIT RENT PANEL ======================= */}
        {activeSubTab === 'land' && (
          <>
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Calculator className="w-4.5 h-4.5 text-blue-600" />
                {lang === 'ms' ? "Input Cukai Tanah" : "Quit Rent Inputs"}
              </h3>

              <div className="space-y-4.5 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Jumlah Luas Tanah (m²)" : "Total Land Area (m²)"}
                  </label>
                  <input 
                    type="number"
                    value={quitInput.landArea}
                    onChange={(e) => setQuitInput({ ...quitInput, landArea: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'ms' 
                      ? "Jumlah keluasan permukaan plot tanah berdaftar (Contoh 4 Buku Teks ialah 130 m²)." 
                      : "Total surface coordinates of the registered plot (Example 4 is 130 m²)."}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Kadar Cukai Tanah per Unit Kawasan (RM/m²)" : "Quit Rent Rate per Unit Area (RM/m²)"}
                  </label>
                  <input 
                    type="number"
                    step="0.01"
                    value={quitInput.ratePerUnitArea}
                    onChange={(e) => setQuitInput({ ...quitInput, ratePerUnitArea: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'ms' 
                      ? "Kadar tarif tahunan setiap unit saiz yang ditetapkan oleh pejabat tanah Kerajaan Negeri (Contoh 4 Buku Teks ialah RM 0.43/m²)." 
                      : "Annual tariff rate per unit size set by State Government land office (Example 4 is RM 0.43/m²)."}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
                {lang === 'ms' ? "Output Pejabat Tanah (Pengesahan Contoh 4)" : "Land Office Output (Example 4 Verification)"}
              </h3>

              <div className="text-center py-6 bg-blue-50/45 rounded-2xl border border-blue-105">
                <span className="text-xs text-blue-700 block font-bold uppercase tracking-wider">
                  {lang === 'ms' ? "Jumlah Cukai Tanah Tahunan" : "Total Annual Quit Rent"}
                </span>
                <span className="text-4xl font-display font-extrabold text-blue-900 mt-2 block font-mono">
                  RM {quitResult.totalQuitRent.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 block font-sans">
                  {lang === 'ms' ? "Dibayar sekali setahun secara kadar tetap kepada Pihak Berkuasa Tanah Negeri" : "Payable once flat per year directly to State Land Authority"}
                </span>
              </div>

              <div className="text-xs text-slate-550 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block text-[10px] uppercase font-sans">
                  {lang === 'ms' ? "Semakan Padanan Formula:" : "Formula Match Check:"}
                </span>
                <p><code>{lang === 'ms' ? "Cukai Tanah = kadar cukai tanah per unit luas × jumlah luas tanah" : "Quit Rent = quit rent rate per unit area × total land area"}</code></p>
                <p><code>{lang === 'ms' ? "Cukai Tanah" : "Quit Rent"} = RM {quitInput.ratePerUnitArea.toFixed(2)} &times; {quitInput.landArea} m² = RM {quitResult.totalQuitRent.toFixed(2)} {lang === 'ms' ? "setiap tahun" : "each year"}</code></p>
                <p className="text-slate-400 mt-2 font-sans">
                  {lang === 'ms' 
                    ? "Cukai Tanah dikenakan ke atas pemilik plot tanah pertanian, korporat, atau kediaman di bawah Seksyen 5 Kanun Tanah Negara 1965." 
                    : "Quit Rent is levied on owners of agricultural, corporate, or residential land plots under Section 5 of the National Land Code 1965."}
                </p>
              </div>
            </div>
          </>
        )}

        {/* ======================= SST PANEL ======================= */}
        {activeSubTab === 'sst' && (
          <>
            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <Calculator className="w-4.5 h-4.5 text-blue-600" />
                {lang === 'ms' ? "Parameter Transaksi SST" : "SST Transaction Parameters"}
              </h3>

              <div className="space-y-4.5 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Jumlah Kasar Asas (RM)" : "Gross Base Amount (RM)"}
                  </label>
                  <input 
                    type="number"
                    value={sstInput.amount}
                    onChange={(e) => setSstInput({ ...sstInput, amount: Math.max(0, Number(e.target.value)) })}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono focus:border-blue-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    {lang === 'ms' 
                      ? "Kos barangan bercukai sebelum cukai (Contoh 5 Buku Teks: RM 240 semalam × 2 malam = RM 480)." 
                      : "Cost of taxable goods prior to adding taxes (Example 5: RM 240 per night × 2 nights = RM 480)."}
                  </p>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold mb-1 font-sans">
                    {lang === 'ms' ? "Jenis & Peringkat Tarif SST" : "SST Tariff Type & Tier"}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => setSstInput({ ...sstInput, taxType: 'service6' })}
                      className={`p-2.5 rounded-lg text-left font-bold border transition text-xs flex justify-between items-center ${
                        sstInput.taxType === 'service6'
                          ? 'bg-blue-600 border-transparent text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang === 'ms' ? "Cukai Perkhidmatan Pengguna Standard" : "Standard Consumer Service Tax"}</span>
                      <span className="font-mono">6%</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSstInput({ ...sstInput, taxType: 'sales5' })}
                      className={`p-2.5 rounded-lg text-left font-bold border transition text-xs flex justify-between items-center ${
                        sstInput.taxType === 'sales5'
                          ? 'bg-blue-600 border-transparent text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang === 'ms' ? "Cukai Jualan Pengilangan Dikurangkan" : "Reduced Manufacturing Sales Tax"}</span>
                      <span className="font-mono">5%</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSstInput({ ...sstInput, taxType: 'sales10' })}
                      className={`p-2.5 rounded-lg text-left font-bold border transition text-xs flex justify-between items-center ${
                        sstInput.taxType === 'sales10'
                          ? 'bg-blue-600 border-transparent text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang === 'ms' ? "Cukai Jualan Pengilangan Umum" : "General Manufacturing Sales Tax"}</span>
                      <span className="font-mono">10%</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-slate-800 text-sm pb-2 border-b border-slate-100">
                {lang === 'ms' ? "Penilaian Invois JKDM (Pengesahan Contoh 5)" : "JKDM Invoice Assessment (Example 5 Verification)"}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-105 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">
                    {lang === 'ms' ? "Bahagian Cukai Dikenakan" : "Tax Charged Portion"}
                  </span>
                  <span className="text-xl font-bold text-slate-800 font-mono mt-1.5 block text-rose-600">
                    RM {sstResult.taxCharged.toFixed(2)}
                  </span>
                </div>

                <div className="p-4 bg-emerald-50/50 border border-emerald-105 rounded-xl text-center">
                  <span className="text-[10px] text-emerald-800 block font-bold uppercase">
                    {lang === 'ms' ? "Jumlah Bil Perlu Dibayar" : "Total Bill Payable"}
                  </span>
                  <span className="text-xl font-bold text-emerald-800 font-mono mt-1.5 block">
                    RM {sstResult.totalWithTax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-550 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block text-[10px] uppercase font-sans">
                  {lang === 'ms' ? "Semakan Padanan Formula:" : "Formula Match Check:"}
                </span>
                <p><code>{lang === 'ms' ? "Cukai Perkhidmatan = Jumlah Kasar × Kadar Cukai Perkhidmatan" : "Service Tax = Gross Amount × Service Tax Rate"} ({sstResult.taxRatePercent}%)</code></p>
                <p><code>{lang === 'ms' ? "Cukai Perkhidmatan" : "Service Tax"} = RM {sstInput.amount.toLocaleString()} &times; {sstResult.taxRatePercent}% = RM {sstResult.taxCharged.toFixed(2)}</code></p>
                <p className="mt-2 text-slate-400 font-sans">
                  {lang === 'ms' 
                    ? "Dikuatkuasakan di bawah Akta Cukai Jualan 2018 & Akta Cukai Perkhidmatan 2018 di Malaysia. Cukai perkhidmatan dikenakan pada kadar tetap 6% ke atas penginapan, makanan, kad kredit atau yuran rundingan." 
                    : "Enforced under Sales Tax Act 2018 & Service Tax Act 2018 in Malaysia. Service tax is levied at a flat 6% on lodging, meals, credit cards, or consulting fees."}
                </p>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
