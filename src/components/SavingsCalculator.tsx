import React, { useState, useMemo } from 'react';
import { PiggyBank, RotateCcw, TrendingUp, HelpCircle, DollarSign, Calculator } from 'lucide-react';
import { calculateSimpleInterest, calculateCompoundInterest, calculateRoi } from '../utils';

export default function SavingsCalculator() {
  const [calcSubTab, setCalcSubTab] = useState<'interest' | 'roi'>('interest');

  // Interest state
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(4);
  const [years, setYears] = useState<number>(5);
  // Compound frequency: 1 = yearly, 2 = semi-annually, 4 = quarterly, 12 = monthly
  const [compoundFrequency, setCompoundFrequency] = useState<number>(2);

  // ROI state
  const [initialInvestment, setInitialInvestment] = useState<number>(50000);
  const [capitalGain, setCapitalGain] = useState<number>(15000);
  const [dividends, setDividends] = useState<number>(2500);
  const [rentalIncome, setRentalIncome] = useState<number>(3600);
  const [otherExpenses, setOtherExpenses] = useState<number>(1200);

  // Simple Interest execution
  const simpleResult = useMemo(() => {
    return calculateSimpleInterest({
      principal,
      rate: interestRate,
      time: years
    });
  }, [principal, interestRate, years]);

  // Compound Interest execution
  const compoundResult = useMemo(() => {
    return calculateCompoundInterest({
      principal,
      rate: interestRate,
      time: years,
      n: compoundFrequency
    });
  }, [principal, interestRate, years, compoundFrequency]);

  // ROI execution
  const roiResult = useMemo(() => {
    return calculateRoi({
      initialInvestment,
      capitalGain,
      dividends,
      rentalIncome,
      otherExpenses
    });
  }, [initialInvestment, capitalGain, dividends, rentalIncome, otherExpenses]);

  // Reset function
  const handleResetInterest = () => {
    setPrincipal(10000);
    setInterestRate(4);
    setYears(5);
    setCompoundFrequency(2);
  };

  const handleResetRoi = () => {
    setInitialInvestment(50000);
    setCapitalGain(15000);
    setDividends(2500);
    setRentalIncome(3600);
    setOtherExpenses(1200);
  };

  // Generate SVG graph coordinate calculations
  const graphData = useMemo(() => {
    const data: { year: number; simple: number; compound: number }[] = [];
    const step = Math.max(1, Math.ceil(years / 8));
    
    for (let y = 0; y <= years; y += step) {
      const s = principal + (principal * (interestRate / 100) * y);
      const c = principal * Math.pow(1 + (interestRate / 100 / compoundFrequency), compoundFrequency * y);
      data.push({
        year: y,
        simple: Math.round(s),
        compound: Math.round(c)
      });
    }

    if (years % step !== 0) {
      const s = principal + (principal * (interestRate / 100) * years);
      const c = principal * Math.pow(1 + (interestRate / 100 / compoundFrequency), compoundFrequency * years);
      data.push({
        year: years,
        simple: Math.round(s),
        compound: Math.round(c)
      });
    }

    // Determine min & max boundary values
    const maxVal = Math.max(...data.map(d => Math.max(d.simple, d.compound)));
    const minVal = principal * 0.9;
    const ySpan = maxVal - minVal;

    // Map coordinates to SVG dimensions: Width 500, Height 200
    const w = 500;
    const h = 200;
    const padding = { top: 20, right: 20, bottom: 30, left: 60 };

    const pointsSimple = data.map((d, index) => {
      const x = padding.left + (index / (data.length - 1)) * (w - padding.left - padding.right);
      const y = h - padding.bottom - ((d.simple - minVal) / (ySpan || 1)) * (h - padding.top - padding.bottom);
      return `${x},${y}`;
    }).join(' ');

    const pointsCompound = data.map((d, index) => {
      const x = padding.left + (index / (data.length - 1)) * (w - padding.left - padding.right);
      const y = h - padding.bottom - ((d.compound - minVal) / (ySpan || 1)) * (h - padding.top - padding.bottom);
      return `${x},${y}`;
    }).join(' ');

    return {
      pointsSimple,
      pointsCompound,
      pointsList: data,
      maxVal,
      minVal,
      w,
      h,
      padding
    };
  }, [principal, interestRate, years, compoundFrequency]);

  return (
    <div id="savings-calc-root" className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Tab select Header */}
      <div className="xl:col-span-12 flex border-b border-slate-100 pb-2">
        <button
          id="btn-subtab-interest"
          onClick={() => setCalcSubTab('interest')}
          className={`px-4 py-2 font-display text-xs font-bold transition-all duration-200 border-b-2 mr-4 ${
            calcSubTab === 'interest'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Savings & Interest (Form 3 Ch 3.1)
        </button>
        <button
          id="btn-subtab-roi"
          onClick={() => setCalcSubTab('roi')}
          className={`px-4 py-2 font-display text-xs font-bold transition-all duration-200 border-b-2 ${
            calcSubTab === 'roi'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Return on Investment (ROI)
        </button>
      </div>

      {calcSubTab === 'interest' ? (
        <>
          {/* Controls Side */}
          <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <PiggyBank className="w-4 h-4 text-blue-600" />
                  Parameters
                </h4>
                <button
                  onClick={handleResetInterest}
                  className="p-1 px-2 text-[10px] text-slate-400 hover:text-slate-800 border border-slate-100 hover:border-slate-200 rounded-lg flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Principal slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Principal (P)</span>
                  <span className="font-mono font-bold text-blue-600">RM {principal.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>RM 500</span>
                  <span>RM 100k</span>
                </div>
              </div>

              {/* Rate Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Annual Rate (r)</span>
                  <span className="font-mono font-bold text-blue-600">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0.5%</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Time Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600">
                  <span>Duration (t)</span>
                  <span className="font-mono font-bold text-blue-600">{years} {years === 1 ? 'Year' : 'Years'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 Year</span>
                  <span>25 Years</span>
                </div>
              </div>

              {/* Compound Frequency Selector */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700 block">Compounded Frequency (n)</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {[
                    { label: 'Yearly (n=1)', val: 1 },
                    { label: 'Every 6 Months (n=2)', val: 2 },
                    { label: 'Quarterly (n=4)', val: 4 },
                    { label: 'Monthly (n=12)', val: 12 }
                  ].map((freq) => (
                    <button
                      key={freq.val}
                      onClick={() => setCompoundFrequency(freq.val)}
                      className={`p-2 text-left rounded-xl text-xs font-medium transition-all duration-200 border ${
                        compoundFrequency === freq.val
                          ? 'border-blue-600 bg-blue-50/40 text-blue-700'
                          : 'border-slate-100 text-slate-600 hover:bg-slate-100/50'
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-4 bg-slate-50/50 -mx-5 -mb-5 p-5 rounded-b-2xl">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Formula Substitutions:</span>
              <div className="mt-2 text-[11px] font-mono bg-white p-3 rounded-lg border border-slate-100 space-y-1.5 text-slate-600">
                <div>
                  <span className="font-bold text-slate-900 block border-b border-blue-100/60 pb-0.5 mb-1 text-[10px]">Simple Interest:</span>
                  I = P × r × t<br />
                  I = {principal} × {(interestRate/100).toFixed(4)} × {years}<br />
                  I = <span className="text-amber-600 font-bold">RM {simpleResult.interest.toLocaleString()}</span>
                </div>
                <div className="pt-2">
                  <span className="font-bold text-slate-900 block border-b border-blue-100/60 pb-0.5 mb-1 text-[10px]">Compound Interest:</span>
                  MV = P × (1 + r/n)^(n×t)<br />
                  MV = {principal} × (1 + {(interestRate/100).toFixed(4)}/{compoundFrequency})^{compoundFrequency * years}<br />
                  MV = <span className="text-emerald-600 font-bold">RM {compoundResult.maturedValue.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results graph & metrics Side */}
          <div className="xl:col-span-8 space-y-4">
            {/* Metric Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Simple Interest Result */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100/80 shadow-xs relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-3 -mt-3 group-hover:scale-125 transition-transform" />
                <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Simple Interest</span>
                <div className="text-2xl font-bold font-display text-slate-800 mt-2">RM {simpleResult.totalAccumulated.toLocaleString()}</div>
                <p className="text-xs text-slate-400 mt-0.5">Matured Sum (RM {principal.toLocaleString()} principal + RM {simpleResult.interest.toLocaleString()} interest)</p>
              </div>

              {/* Compound Interest Result */}
              <div className="bg-white p-4 rounded-2xl border border-slate-100/80 shadow-xs relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-3 -mt-3 group-hover:scale-125 transition-transform" />
                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Compounded MV</span>
                <div className="text-2xl font-bold font-display text-slate-800 mt-2">RM {compoundResult.maturedValue.toLocaleString()}</div>
                <p className="text-xs text-slate-400 mt-0.5">Accumulated Sum (RM {principal.toLocaleString()} principal + RM {compoundResult.interestEarned.toLocaleString()} profit)</p>
              </div>
            </div>

            {/* SVG Graph View */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <h5 className="text-xs font-display font-bold text-slate-800 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Growth Comparison Over Time
                </h5>
                <div className="flex gap-4 text-[10px] font-semibold">
                  <span className="flex items-center gap-1 text-amber-600">
                    <span className="w-2.5 h-1.5 bg-amber-500 rounded-full inline-block" /> Simple Interest
                  </span>
                  <span className="flex items-center gap-1 text-blue-600">
                    <span className="w-2.5 h-1.5 bg-blue-500 rounded-full inline-block" /> Compounded Savings
                  </span>
                </div>
              </div>

              {/* The SVG element */}
              <div className="w-full bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                <svg
                  viewBox={`0 0 ${graphData.w} ${graphData.h}`}
                  className="w-full h-auto overflow-visible select-none font-mono"
                  style={{ maxHeight: '180px' }}
                >
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((r_val, idx) => {
                    const y_pos = graphData.padding.top + r_val * (graphData.h - graphData.padding.top - graphData.padding.bottom);
                    const grid_v = Math.round(graphData.maxVal - r_val * (graphData.maxVal - graphData.minVal));
                    return (
                      <g key={idx}>
                        <line
                          x1={graphData.padding.left}
                          y1={y_pos}
                          x2={graphData.w - graphData.padding.right}
                          y2={y_pos}
                          stroke="#e2e8f0"
                          strokeDasharray="2 3"
                        />
                        <text
                          x={graphData.padding.left - 8}
                          y={y_pos + 4}
                          textAnchor="end"
                          className="text-[9px] fill-slate-400"
                        >
                          RM {grid_v.toLocaleString()}
                        </text>
                      </g>
                    );
                  })}

                  {/* Graph lines path */}
                  <polyline
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    points={graphData.pointsSimple}
                  />
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    points={graphData.pointsCompound}
                  />

                  {/* Draw points on compound graph */}
                  {graphData.pointsList.map((pt, idx) => {
                    const x = graphData.padding.left + (idx / (graphData.pointsList.length - 1)) * (graphData.w - graphData.padding.left - graphData.padding.right);
                    const yComp = graphData.h - graphData.padding.bottom - ((pt.compound - graphData.minVal) / ((graphData.maxVal - graphData.minVal) || 1)) * (graphData.h - graphData.padding.top - graphData.padding.bottom);
                    return (
                      <g key={idx} className="group/dot">
                        <circle
                          cx={x}
                          cy={yComp}
                          r="4"
                          fill="#ffffff"
                          stroke="#2563eb"
                          strokeWidth="2"
                        />
                        <title>Year {pt.year}: RM {pt.compound.toLocaleString()}</title>
                      </g>
                    );
                  })}

                  {/* X-axis labels */}
                  {graphData.pointsList.map((pt, idx) => {
                    const x = graphData.padding.left + (idx / (graphData.pointsList.length - 1)) * (graphData.w - graphData.padding.left - graphData.padding.right);
                    return (
                      <text
                        key={idx}
                        x={x}
                        y={graphData.h - graphData.padding.bottom + 14}
                        textAnchor="middle"
                        className="text-[9px] fill-slate-400"
                      >
                        Yr {pt.year}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* Year by Year Detailed comparisons */}
              <div className="mt-4">
                <span className="text-[11px] font-bold text-slate-700 block mb-2">Compounded Yield Matrix (n={compoundFrequency}):</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                        <th className="p-2 font-semibold">Year</th>
                        <th className="p-2 font-semibold">Interest Added</th>
                        <th className="p-2 font-semibold">Matured Sum Balance</th>
                        <th className="p-2 font-semibold">VS Simple Interest</th>
                        <th className="p-2 font-semibold">Compounding Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {compoundResult.yearlyBreakdown.map((row) => {
                        const simpleAtYear = principal + (principal * (interestRate/100) * row.year);
                        const difference = row.balance - simpleAtYear;
                        return (
                          <tr key={row.year} className="hover:bg-slate-50/85">
                            <td className="p-2 font-bold text-slate-800">Year {row.year}</td>
                            <td className="p-2 text-blue-600">+RM {row.interestAdded.toLocaleString()}</td>
                            <td className="p-2 text-slate-800">RM {row.balance.toLocaleString()}</td>
                            <td className="p-2 text-slate-400">RM {simpleAtYear.toLocaleString()}</td>
                            <td className={`p-2 font-bold ${difference > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {difference > 0 ? `+RM ${difference.toLocaleString()}` : 'RM 0'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* ROI Calculator Views */}
          <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-violet-600" />
                  ROI Parameters
                </h4>
                <button
                  onClick={handleResetRoi}
                  className="p-1 px-2 text-[10px] text-slate-400 hover:text-slate-800 border border-slate-100 hover:border-slate-200 rounded-lg flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Numeric Input fields for precise entry */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Initial Capital Investment</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">RM</span>
                    <input
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                      className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Estimated Capital Gain (Selling - Purchase Price)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">RM</span>
                    <input
                      type="number"
                      value={capitalGain}
                      onChange={(e) => setCapitalGain(Number(e.target.value))}
                      className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Dividends Received</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">RM</span>
                      <input
                        type="number"
                        value={dividends}
                        onChange={(e) => setDividends(Math.max(0, Number(e.target.value)))}
                        className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Rental Income</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">RM</span>
                      <input
                        type="number"
                        value={rentalIncome}
                        onChange={(e) => setRentalIncome(Math.max(0, Number(e.target.value)))}
                        className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1">Ownership / Maintenance Expenses</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">RM</span>
                    <input
                      type="number"
                      value={otherExpenses}
                      onChange={(e) => setOtherExpenses(Math.max(0, Number(e.target.value)))}
                      className="w-full text-xs p-2.5 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-4 bg-slate-50/50 -mx-5 -mb-5 p-5 rounded-b-2xl font-mono text-xs text-slate-600 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Formula Substitution:</span>
              <span>Total Return = {capitalGain} (Gain) + {dividends} (Div) + {rentalIncome} (Rent) - {otherExpenses} (Fees)</span>
              <br />
              <span className="block mt-1 font-bold text-slate-700">Total Return = RM {roiResult.totalReturn.toLocaleString()}</span>
              <span className="block text-blue-600 font-bold">ROI = ({roiResult.totalReturn} / {initialInvestment}) × 100% = {roiResult.roiPercentage}%</span>
            </div>
          </div>

          <div className="xl:col-span-7 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
              <span className="text-xs text-slate-400 font-bold tracking-wider uppercase mb-1">Calculated Return on Investment</span>
              <div className={`text-5xl font-display font-extrabold my-2 ${roiResult.roiPercentage >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {roiResult.roiPercentage}%
              </div>
              <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
                Your initial capital investment of <span className="font-semibold text-slate-800">RM {initialInvestment.toLocaleString()}</span> has generated a net return of <span className={`font-semibold ${roiResult.totalReturn >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>RM {roiResult.totalReturn.toLocaleString()}</span>.
              </p>

              {/* Visual radial gauge container */}
              <div className="w-full mt-6 bg-slate-50 border border-slate-100 p-4 rounded-xl flex items-center justify-around">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Investment Status</span>
                  <span className={`text-sm font-bold block mt-1 ${roiResult.roiPercentage > 15 ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {roiResult.roiPercentage > 15 ? '🔥 High Yield Return' : roiResult.roiPercentage > 0 ? '📈 Stable Return' : '📉 Net Negative'}
                  </span>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Percentage Multiplier</span>
                  <span className="text-sm font-mono font-bold block mt-1 text-slate-700">
                    {(1 + roiResult.roiDecimal).toFixed(2)}x value
                  </span>
                </div>
              </div>
            </div>

            {/* Curriculum context reference notes */}
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-[11px] text-blue-900 leading-relaxed">
              <strong className="block mb-1 text-xs text-blue-950 font-bold">🏫 SPM Exam Fact Box</strong>
              In Malaysian syllabus math problems, Return On Investment (ROI) can also be negative if expenditures, maintenance, property taxes, or capital values decline. Ensure to include ALL fees, renovations, and brokerage commissions in your initial and maintenance calculations!
            </div>
          </div>
        </>
      )}
    </div>
  );
}
