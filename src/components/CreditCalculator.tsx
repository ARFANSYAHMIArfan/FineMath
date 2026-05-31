import React, { useState, useMemo } from 'react';
import { CreditCard, Landmark, BookOpen, AlertTriangle, HelpCircle, ArrowRight, Table } from 'lucide-react';
import { calculateLoan } from '../utils';

export default function CreditCalculator() {
  const [activeSegment, setActiveSegment] = useState<'loans' | 'creditCard'>('loans');

  // Loans State
  const [loanPrincipal, setLoanPrincipal] = useState<number>(30000);
  const [loanRate, setLoanRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);

  // Compare both Flat rate and Reducing rate on same parameters
  const flatResult = useMemo(() => {
    return calculateLoan({
      principal: loanPrincipal,
      annualRate: loanRate,
      timeYears: loanTerm,
      type: 'flat'
    });
  }, [loanPrincipal, loanRate, loanTerm]);

  const reducingResult = useMemo(() => {
    return calculateLoan({
      principal: loanPrincipal,
      annualRate: loanRate,
      timeYears: loanTerm,
      type: 'reducing'
    });
  }, [loanPrincipal, loanRate, loanTerm]);

  // Credit Card Simulation State
  const [ccBalance, setCcBalance] = useState<number>(5000);
  const [ccAnnualRate, setCcAnnualRate] = useState<number>(15); // typical 15% in Malaysia
  const [ccFixedPayment, setCcFixedPayment] = useState<number>(250);

  // Simulate CC payment payoff schedules (Only minimum 5% vs Fixed payment)
  const ccScenario = useMemo(() => {
    const monthlyRate = (ccAnnualRate / 100) / 12;
    
    // Scenario A: Paying ONLY minimum (max of 5% of balance or RM 50)
    let balMin = ccBalance;
    let monthsMin = 0;
    let totalPaidMin = 0;
    let totalInterestMin = 0;
    const historyMin: { month: number; balanceBefore: number; interestApplied: number; payment: number; balanceAfter: number }[] = [];

    while (balMin > 0.05 && monthsMin < 240) { // cap at 20 years to avoid infinite loop
      monthsMin++;
      const interestApplied = balMin * monthlyRate;
      const proposedMin = Math.max(balMin * 0.05, 50);
      let payment = Math.min(proposedMin, balMin + interestApplied);
      
      const balanceBefore = balMin;
      balMin = balMin + interestApplied - payment;
      
      totalPaidMin += payment;
      totalInterestMin += interestApplied;

      if (monthsMin <= 12) {
        historyMin.push({
          month: monthsMin,
          balanceBefore,
          interestApplied,
          payment,
          balanceAfter: balMin
        });
      }
    }

    // Scenario B: Paying fixed amount (e.g. RM 250)
    let balFixed = ccBalance;
    let monthsFixed = 0;
    let totalPaidFixed = 0;
    let totalInterestFixed = 0;
    const historyFixed: { month: number; balanceBefore: number; interestApplied: number; payment: number; balanceAfter: number }[] = [];

    while (balFixed > 0.05 && monthsFixed < 240) {
      monthsFixed++;
      const interestApplied = balFixed * monthlyRate;
      let payment = Math.min(ccFixedPayment, balFixed + interestApplied);
      if (payment < interestApplied + 10 && balFixed > 100) {
        // warning: fixed payment is too low to cover interest
        payment = interestApplied + 10;
      }
      
      const balanceBefore = balFixed;
      balFixed = balFixed + interestApplied - payment;
      
      totalPaidFixed += payment;
      totalInterestFixed += interestApplied;

      if (monthsFixed <= 12) {
        historyFixed.push({
          month: monthsFixed,
          balanceBefore,
          interestApplied,
          payment,
          balanceAfter: balFixed
        });
      }
    }

    return {
      minPay: {
        months: monthsMin,
        totalPaid: Math.round(totalPaidMin),
        totalInterest: Math.round(totalInterestMin),
        history: historyMin
      },
      fixedPay: {
        months: monthsFixed,
        totalPaid: Math.round(totalPaidFixed),
        totalInterest: Math.round(totalInterestFixed),
        history: historyFixed
      },
      interestWarning: ccFixedPayment <= (ccBalance * monthlyRate)
    };
  }, [ccBalance, ccAnnualRate, ccFixedPayment]);

  return (
    <div id="credit-calc-root" className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Tab Header */}
      <div className="xl:col-span-12 flex border-b border-slate-100 pb-2">
        <button
          onClick={() => setActiveSegment('loans')}
          className={`px-4 py-2 font-display text-xs font-bold transition-all duration-200 border-b-2 mr-4 ${
            activeSegment === 'loans'
              ? 'border-blue-600 text-blue-605 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Loan Installments Comparison (Form 3 Ch 3.2)
        </button>
        <button
          onClick={() => setActiveSegment('creditCard')}
          className={`px-4 py-2 font-display text-xs font-bold transition-all duration-200 border-b-2 ${
            activeSegment === 'creditCard'
              ? 'border-blue-600 text-blue-605 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Credit Card Debt Trap Simulator
        </button>
      </div>

      {activeSegment === 'loans' ? (
        <>
          {/* LOANS LEFT SIDE CONTROLS */}
          <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
            <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-blue-600" />
              Loan Configuration
            </h4>

            {/* Principal */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>Borrowed Sum (Principal)</span>
                <span className="font-mono font-bold text-blue-600">RM {loanPrincipal.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="5000"
                value={loanPrincipal}
                onChange={(e) => setLoanPrincipal(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>RM 5,000</span>
                <span>RM 150,000</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>Annual Interest Rate (r)</span>
                <span className="font-mono font-bold text-blue-600">{loanRate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={loanRate}
                onChange={(e) => setLoanRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Duration Term */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>Loan Term (t)</span>
                <span className="font-mono font-bold text-blue-600">{loanTerm} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 Year</span>
                <span>10 Years</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 bg-slate-50/50 p-4 -mx-5 -mb-5 rounded-b-2xl">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider mb-2">Equation Guide</span>
              <div className="text-[10px] font-mono text-slate-600 space-y-1 bg-white p-2.5 rounded-lg border border-slate-100">
                <div>
                  <strong>Flat Rate Formula:</strong><br />
                  Interest = P × r × t<br />
                  Monthly = (P + Interest) / Months
                </div>
                <div className="pt-2">
                  <strong>Reducing Balance (Amortized):</strong><br />
                  Calculates r/12 interest on the *remaining active balance* each month. Installment reduces outstanding quicker over time!
                </div>
              </div>
            </div>
          </div>

          {/* LOANS COMPARISON VIEWS */}
          <div className="xl:col-span-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Flat rate results */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 relative group overflow-hidden">
                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider block w-fit">Flat Rate</span>
                <div className="text-xl font-bold font-display text-slate-800 mt-3">Mth installment: RM {flatResult.monthlyInstallment.toLocaleString()}</div>
                <div className="mt-2 text-xs text-slate-500 space-y-1">
                  <div>Principal: RM {loanPrincipal.toLocaleString()}</div>
                  <div className="text-blue-600 font-semibold font-mono">Total Interest Cost: RM {flatResult.totalInterest.toLocaleString()}</div>
                  <div>Total repayment: RM {flatResult.totalPayment.toLocaleString()}</div>
                </div>
              </div>

              {/* Reducing balance results */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 relative group overflow-hidden">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider block w-fit">Reducing Balance (Balance Interest)</span>
                <div className="text-xl font-bold font-display text-slate-800 mt-3">Mth installment: RM {reducingResult.monthlyInstallment.toLocaleString()}</div>
                <div className="mt-2 text-xs text-slate-500 space-y-1">
                  <div>Principal: RM {loanPrincipal.toLocaleString()}</div>
                  <div className="text-emerald-600 font-semibold font-mono">Total Interest Cost: RM {reducingResult.totalInterest.toLocaleString()}</div>
                  <div>Total repayment: RM {reducingResult.totalPayment.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Interest Savings banner */}
            {flatResult.totalInterest - reducingResult.totalInterest > 1 && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-800">✨ Balance Interest Benefit</span>
                  <p className="text-[11px] text-emerald-600">
                    Choosing a reducing balance scheme rather than a flat interest rate saves you <strong className="text-emerald-800">RM {Math.round(flatResult.totalInterest - reducingResult.totalInterest).toLocaleString()}</strong> in net interest!
                  </p>
                </div>
              </div>
            )}

            {/* Mini Amortization Table */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <h5 className="text-xs font-display font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                <Table className="w-4 h-4 text-blue-500" />
                First 6 Months Repayment Schedule Comparison (RM {loanPrincipal.toLocaleString()})
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                      <th className="p-2">Month</th>
                      <th className="p-2 text-center" colSpan={2}>Flat Rate Schedule</th>
                      <th className="p-2 text-center" colSpan={2}>Reducing Balance Schedule</th>
                    </tr>
                    <tr className="bg-slate-50/50 text-[10px] text-slate-400 border-b border-slate-100">
                      <th className="p-1 pl-2">Mth #</th>
                      <th className="p-1 text-right">Interest Charged</th>
                      <th className="p-1 text-right">Remaining Bal</th>
                      <th className="p-1 text-right">Interest Charged</th>
                      <th className="p-1 text-right">Remaining Bal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Array.from({ length: 6 }).map((_, idx) => {
                      const flatRow = flatResult.amortizationTable[idx];
                      const redRow = reducingResult.amortizationTable[idx];
                      if (!flatRow || !redRow) return null;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/40">
                          <td className="p-2 text-slate-700 font-bold">M{idx+1}</td>
                          <td className="p-2 text-right text-amber-600">RM {flatRow.interestCharged.toLocaleString()}</td>
                          <td className="p-2 text-right text-slate-500">RM {flatRow.endingBalance.toLocaleString()}</td>
                          <td className="p-2 text-right text-blue-600">RM {redRow.interestCharged.toLocaleString()}</td>
                          <td className="p-2 text-right text-slate-800">RM {redRow.endingBalance.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* CREDIT CARD DEBT TRAP SIMULATOR */}
          <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
            <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-blue-600" />
              Card Parameters
            </h4>

            {/* CC Outstanding Balance */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Outstanding Balance</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">RM</span>
                <input
                  type="number"
                  value={ccBalance}
                  onChange={(e) => setCcBalance(Math.max(50, Number(e.target.value)))}
                  className="w-full text-xs p-2 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                />
              </div>
              <p className="text-[10px] text-slate-400">Total accumulated unpaid credit card balance.</p>
            </div>

            {/* CC Interest Rate */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Annual Interest Rate</span>
                <span className="font-mono text-blue-600 font-bold">{ccAnnualRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="10"
                max="18"
                step="1"
                value={ccAnnualRate}
                onChange={(e) => setCcAnnualRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10% (Low tier)</span>
                <span>18% (Standard)</span>
              </div>
            </div>

            {/* Fixed payment choice */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Alternative Fixed Monthly Option</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-400 font-bold">RM</span>
                <input
                  type="number"
                  value={ccFixedPayment}
                  onChange={(e) => setCcFixedPayment(Math.max(50, Number(e.target.value)))}
                  className="w-full text-xs p-2 pl-9 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                />
              </div>
              <p className="text-[10px] text-slate-400">Fixed amount paid every single month instead of just compiling minimums.</p>
            </div>

            {ccScenario.interestWarning && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 text-[10px] rounded-lg flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <div>
                  <strong>Payment Alert:</strong> Your chosen option is too close to (or below) the monthly interest charges. The system has safely adjusted it upward to ensure the balance keeps decreasing!
                </div>
              </div>
            )}
          </div>

          {/* SIMULATOR PAY-OUT COMPARISONS */}
          <div className="xl:col-span-8 space-y-4">
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-slate-700 text-xs">
              <h5 className="font-bold text-blue-950 mb-1">👩‍🏫 Understanding the Debt Trap (Malaysian Math Syllabus)</h5>
              Under <strong>Form 3 Math Chapter 3.2</strong>, paying only the minimum payment (5% of the active balance) keeps you in debt for incredibly long. This is because interest applies to the remaining balance, dragging out the timeline!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Paying only minimums */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 rounded px-2 py-0.5 tracking-wider uppercase">Scenario A: Paying Minimum Only</span>
                  <div className="text-3xl font-display font-extrabold text-rose-600 mt-4">{ccScenario.minPay.months} {ccScenario.minPay.months === 240 ? '20+ Years' : 'Months'}</div>
                  <p className="text-xs text-slate-400 mt-1">Months required to clear full card debt.</p>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-4 text-xs text-slate-600 space-y-1">
                  <div>Interest paid: <strong className="text-rose-600 font-mono">RM {ccScenario.minPay.totalInterest.toLocaleString()}</strong></div>
                  <div>Total payment: <strong className="text-slate-800 font-mono">RM {ccScenario.minPay.totalPaid.toLocaleString()}</strong></div>
                </div>
              </div>

              {/* Paying fixed amounts */}
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 rounded px-2 py-0.5 tracking-wider uppercase">Scenario B: Paying RM {ccFixedPayment} Fixed</span>
                  <div className="text-3xl font-display font-extrabold text-emerald-600 mt-4">{ccScenario.fixedPay.months} Months</div>
                  <p className="text-xs text-slate-400 mt-1">Months required to clear full card debt.</p>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-4 text-xs text-slate-600 space-y-1">
                  <div>Interest paid: <strong className="text-emerald-600 font-mono">RM {ccScenario.fixedPay.totalInterest.toLocaleString()}</strong></div>
                  <div>Total payment: <strong className="text-slate-800 font-mono">RM {ccScenario.fixedPay.totalPaid.toLocaleString()}</strong></div>
                </div>
              </div>
            </div>

            {ccScenario.minPay.totalPaid - ccScenario.fixedPay.totalPaid > 1 && (
              <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-xl text-xs flex items-center gap-2">
                <span className="font-bold text-emerald-700">💡 Savings Outcome:</span>
                <span className="text-emerald-800 font-semibold text-[11px]">
                  By paying a flat RM {ccFixedPayment}/month instead of only making minimum payments, you reduce interest costs by <strong className="text-emerald-900 font-bold font-mono">RM {(ccScenario.minPay.totalInterest - ccScenario.fixedPay.totalInterest).toLocaleString()}</strong>!
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
