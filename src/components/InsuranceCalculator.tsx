import React, { useState, useMemo } from 'react';
import { Shield, RotateCcw, AlertCircle, Sparkles, Home, Activity, Check, HelpCircle } from 'lucide-react';
import { calculateLifeInsurance, calculatePropertyInsurance, calculateMedicalInsurance, getLifePremiumRate } from '../utils';

export default function InsuranceCalculator() {
  const [activeSubTab, setActiveSubTab] = useState<'life' | 'property' | 'medical'>('life');

  // --- LIFE INSURANCE STATE ---
  const [lifeAge, setLifeAge] = useState<number>(39);
  const [lifeGender, setLifeGender] = useState<'male' | 'female'>('male');
  const [lifeSmoker, setLifeSmoker] = useState<'smoker' | 'non-smoker'>('non-smoker');
  const [lifeFaceValue, setLifeFaceValue] = useState<number>(150000);
  const [criticalCI, setCriticalCI] = useState<boolean>(true);
  const [ciPercentage, setCiPercentage] = useState<number>(30);

  const lifeResult = useMemo(() => {
    return calculateLifeInsurance({
      age: lifeAge,
      gender: lifeGender,
      status: lifeSmoker,
      faceValue: lifeFaceValue,
      criticalIllnessRider: criticalCI,
      criticalIllnessPercentage: ciPercentage
    });
  }, [lifeAge, lifeGender, lifeSmoker, lifeFaceValue, criticalCI, ciPercentage]);

  const resetLife = () => {
    setLifeAge(39);
    setLifeGender('male');
    setLifeSmoker('non-smoker');
    setLifeFaceValue(100000);
    setCriticalCI(false);
    setCiPercentage(30);
  };

  // --- PROPERTY CO-INSURANCE STATE ---
  const [propInsurableValue, setPropInsurableValue] = useState<number>(250000);
  const [propCoInsurancePct, setPropCoInsurancePct] = useState<number>(80);
  const [propPurchased, setPropPurchased] = useState<number>(150000);
  const [propLoss, setPropLoss] = useState<number>(50000);
  const [propDeductible, setPropDeductible] = useState<number>(2000);
  const [propIsTotalLoss, setPropIsTotalLoss] = useState<boolean>(false);

  const propertyResult = useMemo(() => {
    return calculatePropertyInsurance({
      insurableValue: propInsurableValue,
      coInsurancePercentage: propCoInsurancePct,
      insurancePurchased: propPurchased,
      lossAmount: propLoss,
      deductible: propDeductible,
      isTotalLoss: propIsTotalLoss
    });
  }, [propInsurableValue, propCoInsurancePct, propPurchased, propLoss, propDeductible, propIsTotalLoss]);

  const resetProperty = () => {
    setPropInsurableValue(250000);
    setPropCoInsurancePct(80);
    setPropPurchased(150000);
    setPropLoss(50000);
    setPropDeductible(2000);
    setPropIsTotalLoss(false);
  };

  // --- MEDICAL CO-INSURANCE STATE ---
  const [medCost, setMedCost] = useState<number>(40000);
  const [medDeductible, setMedDeductible] = useState<number>(500);
  const [medCoSplit, setMedCoSplit] = useState<number>(80); // 80/20 default

  const medicalResult = useMemo(() => {
    return calculateMedicalInsurance({
      medicalCost: medCost,
      deductible: medDeductible,
      coInsuranceSplit: medCoSplit
    });
  }, [medCost, medDeductible, medCoSplit]);

  const resetMedical = () => {
    setMedCost(40000);
    setMedDeductible(500);
    setMedCoSplit(80);
  };

  return (
    <div id="insurance-calc-root" className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Tab bar header select */}
      <div className="xl:col-span-12 flex border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveSubTab('life')}
          className={`px-4 py-2 font-display text-xs font-bold transition-all duration-200 border-b-2 mr-4 flex items-center gap-1.5 ${
            activeSubTab === 'life'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Life Insurance Premiums
        </button>
        <button
          onClick={() => setActiveSubTab('property')}
          className={`px-4 py-2 font-display text-xs font-bold transition-all duration-200 border-b-2 mr-4 flex items-center gap-1.5 ${
            activeSubTab === 'property'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          Property Co-insurance rules
        </button>
        <button
          onClick={() => setActiveSubTab('medical')}
          className={`px-4 py-2 font-display text-xs font-bold transition-all duration-200 border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'medical'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Medical Out-of-pocket costs
        </button>
      </div>

      {activeSubTab === 'life' && (
        <>
          {/* LIFE CONFIG CONTROLS */}
          <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Life Insurance Config
                </h4>
                <button
                  onClick={resetLife}
                  className="p-1 px-2 text-[10px] text-slate-400 hover:text-slate-800 border border-slate-100 hover:border-slate-200 rounded-lg flex items-center gap-1"
                >
                  <RotateCcw className="w-3" /> Reset
                </button>
              </div>

              {/* Age select slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Age of Insured</span>
                  <span className="font-mono font-bold text-blue-600">{lifeAge} years old</span>
                </div>
                <input
                  type="range"
                  min="35"
                  max="40"
                  step="1"
                  value={lifeAge}
                  onChange={(e) => setLifeAge(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>35</span>
                  <span>40</span>
                </div>
              </div>

              {/* Gender and Smoker status toggles */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Gender</label>
                  <div className="flex rounded-lg bg-slate-50 p-1 border border-slate-100">
                    <button
                      onClick={() => setLifeGender('male')}
                      className={`flex-1 py-1 text-center text-xs font-semibold rounded ${
                        lifeGender === 'male' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setLifeGender('female')}
                      className={`flex-1 py-1 text-center text-xs font-semibold rounded ${
                        lifeGender === 'female' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">Smoking Status</label>
                  <div className="flex rounded-lg bg-slate-50 p-1 border border-slate-100">
                    <button
                      onClick={() => setLifeSmoker('non-smoker')}
                      className={`flex-1 py-1 text-center text-xs font-semibold rounded ${
                        lifeSmoker === 'non-smoker' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      Non-Smoker
                    </button>
                    <button
                      onClick={() => setLifeSmoker('smoker')}
                      className={`flex-1 py-1 text-center text-xs font-semibold rounded ${
                        lifeSmoker === 'smoker' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      Smoker
                    </button>
                  </div>
                </div>
              </div>

              {/* Face Value Input */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Life Coverage Face Value (Policy Value)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">RM</span>
                  <input
                    type="number"
                    step="5000"
                    value={lifeFaceValue}
                    onChange={(e) => setLifeFaceValue(Math.max(1000, Number(e.target.value)))}
                    className="w-full text-xs p-2 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                  />
                </div>
              </div>

              {/* Critical Illness configuration */}
              <div className="pt-3 border-t border-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-700">Add Critical Illness Rider</span>
                    <span className="text-[10px] text-slate-400">CI rate: RM 1.77 per RM 1,000</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={criticalCI}
                    onChange={(e) => setCriticalCI(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-slate-100 rounded focus:ring-blue-500"
                  />
                </div>

                {criticalCI && (
                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div className="flex justify-between text-[11px] text-slate-600">
                      <span>Rider Coverage % of Face Value</span>
                      <span className="font-bold">{ciPercentage}% (RM {(lifeFaceValue * ciPercentage / 100).toLocaleString()})</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={ciPercentage}
                      onChange={(e) => setCiPercentage(Number(e.target.value))}
                      className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 bg-slate-50/50 -mx-5 -mb-5 p-5 rounded-b-2xl font-mono text-[11px] text-slate-600">
              <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Equation Step View</span>
              <span>Rate (Age {lifeAge}, {lifeGender}, {lifeSmoker}) = RM {lifeResult.basicPremiumRatePer1000} per RM1000</span>
              <br />
              <span>Base Premium = ({lifeFaceValue} / 1000) × {lifeResult.basicPremiumRatePer1000} = RM {lifeResult.basicAnnualPremium}</span>
              {criticalCI && (
                <div className="mt-1">
                  <span>CI Rider Premium = (({lifeFaceValue} × {ciPercentage}%) / 1000) × 1.77 = RM {lifeResult.criticalIllnessRiderPremium}</span>
                </div>
              )}
            </div>
          </div>

          {/* LIFE RESULTS */}
          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
              <span className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">Annual Total Premium Premiums</span>
              <div className="text-5xl font-display font-extrabold my-2 text-blue-600">
                RM {lifeResult.totalAnnualPremium.toLocaleString()}
              </div>
              <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 grid grid-cols-2 gap-4 text-xs font-mono w-full mt-4">
                <div className="text-center border-r border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase">Basic Premium</span>
                  <span className="block font-bold text-slate-700 mt-1">RM {lifeResult.basicAnnualPremium.toLocaleString()}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase">Critical Illness Rider</span>
                  <span className="block font-bold text-slate-700 mt-1">RM {lifeResult.criticalIllnessRiderPremium.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50/50 border border-blue-105 border-blue-100 rounded-2xl text-[11px] text-blue-800 leading-relaxed animate-fade-in">
              <strong className="block mb-1 text-xs text-blue-950 font-bold font-display">👩‍🏫 Syarikat Insurans XYZ Rates Reference</strong>
              This matches the exact term renewable annual insurance schemas described in Malaysian Secondary High School Consumer Math textbooks! Notice how the premium rate dramatically increases if the policyholder is a smoker or of an older age benchmark.
            </div>
          </div>
        </>
      )}

      {activeSubTab === 'property' && (
        <>
          {/* PROPERTY CONFIG CONTROLS */}
          <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Home className="w-4 h-4 text-blue-600" />
                  Property Co-insurance Settings
                </h4>
                <button
                  onClick={resetProperty}
                  className="p-1 px-2 text-[10px] text-slate-400 hover:text-slate-800 border border-slate-100 hover:border-slate-200 rounded-lg flex items-center gap-1"
                >
                  <RotateCcw className="w-3" /> Reset
                </button>
              </div>

              {/* Insurable Value */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Insurable Value of Property</span>
                  <span className="font-mono font-bold text-blue-600">RM {propInsurableValue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="100000"
                  step="5000"
                  value={propInsurableValue}
                  onChange={(e) => setPropInsurableValue(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Co Insurance Percentage */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Co-insurance rate specified by Insurer</span>
                  <span className="font-mono font-bold text-blue-600">{propCoInsurancePct}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={propCoInsurancePct}
                  onChange={(e) => setPropCoInsurancePct(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Actual Insured Purchased */}
              <div className="space-y-1 bg-blue-50/40 p-2.5 rounded-xl border border-blue-100/50">
                <div className="flex justify-between text-xs font-semibold text-blue-950">
                  <span>Actual Insurance Purchased</span>
                  <span className="font-mono font-bold text-blue-700">RM {propPurchased.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max={propInsurableValue}
                  step="5000"
                  value={propPurchased}
                  onChange={(e) => setPropPurchased(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-1"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Required Min: RM {(propInsurableValue * propCoInsurancePct / 100).toLocaleString()} ({propCoInsurancePct}%)</span>
              </div>

              {/* Amount of partial loss suffered */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Loss suffered by property damage</span>
                  <span className="font-mono font-bold text-slate-800">RM {propLoss.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max={propInsurableValue}
                  step="1000"
                  value={propLoss}
                  disabled={propIsTotalLoss}
                  onChange={(e) => setPropLoss(Number(e.target.value))}
                  className={`w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 ${propIsTotalLoss ? 'opacity-40' : ''}`}
                />
              </div>

              {/* Deductible */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Deductible amount borne by owner</span>
                  <span className="font-mono font-bold text-slate-800">RM {propDeductible.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={propDeductible}
                  onChange={(e) => setPropDeductible(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Toggle Total Loss scenario */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <span className="text-xs font-semibold text-rose-700">Suffered a total loss scenario?</span>
                <input
                  type="checkbox"
                  checked={propIsTotalLoss}
                  onChange={(e) => setPropIsTotalLoss(e.target.checked)}
                  className="w-4 h-4 text-rose-600 bg-slate-100 rounded focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          {/* PROPERTY RESULTS */}
          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100">
              <h5 className="text-xs font-display font-semibold text-slate-800 mb-3">Co-insurance Formula Resolution</h5>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400">Required Co-insure Sum</span>
                  <span className="block font-mono text-xs font-bold text-slate-800 mt-1">RM {propertyResult.requiredInsurance.toLocaleString()}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400">Coverage Adequacy</span>
                  <span className={`block font-mono text-xs font-bold mt-1 ${propertyResult.underInsured ? 'text-amber-600' : 'text-emerald-600'}`}>
                    {propertyResult.underInsured ? '⚠ Under-insured penalty' : '✓ Adequately Insured'}
                  </span>
                </div>
              </div>

              {/* Co-insurance step calculation explanation card */}
              <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100 mb-4 font-mono text-xs text-slate-700 space-y-2">
                <h6 className="font-bold font-display text-[10px] text-blue-950 uppercase block border-b border-blue-100 pb-1">Mathematical Valuation Steps:</h6>
                {propIsTotalLoss ? (
                  <div>
                    <strong>Total Loss (Case 3):</strong><br />
                    Compensation = Insurance Purchased - Deductible<br />
                    Compensation = {propPurchased} - {propDeductible}<br />
                    Compensation = <span className="text-blue-600 font-bold">RM {propertyResult.compensation.toLocaleString()}</span>
                  </div>
                ) : propertyResult.underInsured ? (
                  <div>
                    <strong>Under-insured Formula (Case 2):</strong><br />
                    Compensation = (Purchased / Required × Loss) - Deductible<br />
                    Compensation = ({propPurchased} / {propertyResult.requiredInsurance} × {propLoss}) - {propDeductible}<br />
                    Compensation = <span className="text-blue-600 font-bold">RM {propertyResult.compensation.toLocaleString()}</span>
                    <div className="text-[10px] text-amber-700 font-sans mt-1.5 font-semibold">
                      ⚠ Copayment penalty borne by property owner: RM {propertyResult.underInsuredPenalty.toLocaleString()} due to failing co-insurance requirement.
                    </div>
                  </div>
                ) : (
                  <div>
                    <strong>Fully Insured Formula (Case 1):</strong><br />
                    Compensation = Loss - Deductible<br />
                    Compensation = {propLoss} - {propDeductible}<br />
                    Compensation = <span className="text-blue-600 font-bold">RM {propertyResult.compensation.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Final outcomes dashboard */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3">
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  <span className="text-[9px] text-emerald-800 font-bold block uppercase tracking-wider">Paid by Insurer (Compensation)</span>
                  <span className="text-base font-display font-extrabold text-emerald-700 block mt-1">RM {propertyResult.compensation.toLocaleString()}</span>
                </div>
                <div className="p-2.5 bg-rose-50 rounded-xl">
                  <span className="text-[9px] text-rose-800 font-bold block uppercase tracking-wider">Total Loss Borne by Owner</span>
                  <span className="text-base font-display font-extrabold text-rose-700 block mt-1">RM {propertyResult.totalLossBorneByOwner.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeSubTab === 'medical' && (
        <>
          {/* MEDICAL CONFIG CONTROLS */}
          <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-600" />
                Medical Bill & Co-sharing
              </h4>
              <button
                onClick={resetMedical}
                className="p-1 px-2 text-[10px] text-slate-400 hover:text-slate-800 border border-slate-100 hover:border-slate-200 rounded-lg flex items-center gap-1"
              >
                <RotateCcw className="w-3" /> Reset
              </button>
            </div>

            {/* Total medical cost */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Total Hospital / Medical Bill</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">RM</span>
                <input
                  type="number"
                  value={medCost}
                  onChange={(e) => setMedCost(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                />
              </div>
            </div>

            {/* Deductible */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 block">Deductible Cap</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">RM</span>
                <input
                  type="number"
                  value={medDeductible}
                  onChange={(e) => setMedDeductible(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                />
              </div>
              <p className="text-[10px] text-slate-400">Total up-front fee policyholder must settle first before corporate sharing kicks in.</p>
            </div>

            {/* Participation Ratio */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Company Share Percent / Co-insurance ratio</span>
                <span className="font-mono text-blue-600">{medCoSplit}% / {100 - medCoSplit}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={medCoSplit}
                onChange={(e) => setMedCoSplit(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>50 / 50 Split</span>
                <span>95 / 5 Split</span>
              </div>
            </div>
          </div>

          {/* MEDICAL RESULTS */}
          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
              <h5 className="text-xs font-display font-semibold text-slate-800">Participation Split Outcome</h5>

              {/* SVG graphics representations */}
              <div className="h-10 bg-slate-150 rounded-full overflow-hidden flex text-xs font-bold text-white shadow-inner">
                {medCost > medDeductible ? (
                  <>
                    {/* Insurer block */}
                    <div
                      style={{ width: `${(medicalResult.insurancePayment / medCost) * 100}%` }}
                      className="bg-emerald-600 flex items-center justify-center min-w-12 transition-all duration-350"
                    >
                      Insurer: {medCoSplit}%
                    </div>
                    {/* Owner Co-share block */}
                    <div
                      style={{ width: `${(((medCost - medDeductible) * (1 - medCoSplit/100)) / medCost) * 100}%` }}
                      className="bg-amber-600 flex items-center justify-center min-w-12 transition-all duration-350"
                    >
                      Co-Pay: {100 - medCoSplit}%
                    </div>
                    {/* Deductible block */}
                    <div
                      style={{ width: `${(medDeductible / medCost) * 100}%` }}
                      className="bg-rose-600 flex items-center justify-center min-w-12 transition-all duration-350"
                    >
                      Deductible
                    </div>
                  </>
                ) : (
                  <div className="w-full bg-rose-600 flex items-center justify-center">
                    Full Deductible Capped (100% Owner Borne)
                  </div>
                )}
              </div>

              {/* Breakdown metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Insurance Company Pays:</span>
                  <div className="text-xl font-display font-extrabold text-emerald-700 mt-1">RM {medicalResult.insurancePayment.toLocaleString()}</div>
                  <p className="text-[10px] text-emerald-600 mt-1">Saves you stress on hospitalization costs.</p>
                </div>

                <div className="p-3 bg-rose-50 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-rose-800">Your out-of-pocket payment:</span>
                  <div className="text-xl font-display font-extrabold text-rose-700 mt-1">RM {medicalResult.policyholderPayment.toLocaleString()}</div>
                  <p className="text-[10px] text-rose-600 mt-1">Deductible (RM {medDeductible}) + Co-pay (RM {(medicalResult.policyholderPayment - medDeductible).toLocaleString()})</p>
                </div>
              </div>

              {/* Step calculations */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 font-mono text-xs text-slate-600 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Mathematical Formula Step:</span>
                {medCost > medDeductible ? (
                  <>
                    <span>Claimable Balance = Total cost ({medCost}) - Deductible ({medDeductible}) = RM {(medCost - medDeductible).toLocaleString()}</span><br />
                    <span>Company Share = RM {(medCost - medDeductible).toLocaleString()} × {medCoSplit}% = RM {medicalResult.insurancePayment.toLocaleString()}</span><br />
                    <span>Your Share = RM {medDeductible.toLocaleString()} (Deductible) + {(medCost - medDeductible).toLocaleString()} × {(100 - medCoSplit)}% = RM {medicalResult.policyholderPayment.toLocaleString()}</span>
                  </>
                ) : (
                  <span>Since medical bill (RM {medCost}) is less than deductible (RM {medDeductible}), you must pay the full bill. Claims cannot be lodged!</span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
