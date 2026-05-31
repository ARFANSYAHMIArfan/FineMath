import React, { useState, useMemo } from 'react';
import { Target, RotateCcw, ShieldAlert, CheckCircle, HelpCircle, User, Award, ListTodo } from 'lucide-react';
import { analyzeFinancialPlan } from '../utils';

export default function FinancialPlanner() {
  // Income / Expense parameters
  const [monthlyIncome, setMonthlyIncome] = useState<number>(4500);
  const [savingsRate, setSavingsRate] = useState<number>(10); // Standard 10%
  const [fixedExpenses, setFixedExpenses] = useState<number>(1500);
  const [variableExpenses, setVariableExpenses] = useState<number>(1200);

  // Goal parameters
  const [goalName, setGoalName] = useState<string>('Laptop for College');
  const [goalAmount, setGoalAmount] = useState<number>(3500);
  const [timeMonths, setTimeMonths] = useState<number>(12);

  const resetAll = () => {
    setMonthlyIncome(4500);
    setSavingsRate(10);
    setFixedExpenses(1500);
    setVariableExpenses(1200);
    setGoalName('Laptop for College');
    setGoalAmount(3500);
    setTimeMonths(12);
  };

  // Perform Analysis
  const planResult = useMemo(() => {
    return analyzeFinancialPlan(
      {
        monthlyIncome,
        savingsTargetPercent: savingsRate,
        fixedExpenses,
        variableExpenses
      },
      {
        name: goalName,
        targetAmount: goalAmount,
        timeFrameMonths: timeMonths
      }
    );
  }, [monthlyIncome, savingsRate, fixedExpenses, variableExpenses, goalName, goalAmount, timeMonths]);

  // Surplus status metrics
  const surplusCashFlow = monthlyIncome - fixedExpenses - variableExpenses;
  const savingTargetAmount = monthlyIncome * (savingsRate / 100);
  const netCashFlowAfterSavings = surplusCashFlow - savingTargetAmount;

  return (
    <div id="financial-planner-root" className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* LEFT SIDE CONTROLS & PARAMS */}
      <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h4 className="font-display font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <ListTodo className="w-4 h-4 text-blue-600" />
            Budget Inputs (Step 2 & 3)
          </h4>
          <button
            onClick={resetAll}
            className="p-1 px-2 text-[10px] text-slate-400 hover:text-slate-800 border border-slate-100 hover:border-slate-200 rounded-lg flex items-center gap-1"
          >
            <RotateCcw className="w-3" /> Reset
          </button>
        </div>

        {/* Income / Savings */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Monthly Income</label>
            <div className="relative">
              <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">RM</span>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
                className="w-full text-xs p-2 pl-8 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700 font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Savings Target %</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={savingsRate}
                onChange={(e) => setSavingsRate(Math.max(0, Math.min(100, Number(e.target.value))))}
                className="w-full text-xs p-2 pr-6 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
              />
              <span className="absolute right-3 top-2 text-xs text-slate-400 font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Expenses: Fixed and Variable */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Fixed Expenses</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">RM</span>
                <input
                  type="number"
                  value={fixedExpenses}
                  onChange={(e) => setFixedExpenses(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs p-2 pl-8 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                />
              </div>
              <p className="text-[9px] text-slate-400">Rent, Insurance, Installments</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Variable Expenses</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">RM</span>
                <input
                  type="number"
                  value={variableExpenses}
                  onChange={(e) => setVariableExpenses(Math.max(0, Number(e.target.value)))}
                  className="w-full text-xs p-2 pl-8 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                />
              </div>
              <p className="text-[9px] text-slate-400">Food, Travel, Fun, Shopping</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-3 mt-3">
          <label className="text-xs font-semibold text-slate-700 block mb-2">My SMART Financial Goal (Step 1)</label>
          <div className="space-y-2.5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Goal Description</label>
              <input
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                placeholder="e.g., Buy a laptop, Save college fees"
                className="w-full text-xs p-2 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Target Amount</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-bold">RM</span>
                  <input
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xs p-2 pl-8 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Time Frame (Months)</label>
                <input
                  type="number"
                  value={timeMonths}
                  onChange={(e) => setTimeMonths(Math.max(1, Number(e.target.value)))}
                  className="w-full text-xs p-2 rounded-xl border border-slate-100 focus:outline-none focus:border-blue-600 font-mono text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE OUTPUT RESULTS */}
      <div className="xl:col-span-7 space-y-4">
        {/* Net Cash Flow Dashboard */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100">
          <h5 className="text-xs font-display font-semibold text-slate-800 mb-3 block">Evaluate Cash Flow Status</h5>
          
          <div className="grid grid-cols-3 gap-3 border-b border-slate-100 pb-3">
            <div className="bg-slate-50 p-2 rounded-xl text-center">
              <span className="text-[9px] text-slate-400 block uppercase font-bold">Total Expenses</span>
              <span className="text-xs font-mono font-bold text-slate-800">RM {(fixedExpenses + variableExpenses).toLocaleString()}</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl text-center">
              <span className="text-[9px] text-slate-400 block uppercase font-bold">Min Savings Set Aside</span>
              <span className="text-xs font-mono font-bold text-blue-600">RM {savingTargetAmount.toLocaleString()} ({savingsRate}%)</span>
            </div>
            <div className="bg-emerald-50/50 p-2 rounded-xl text-center">
              <span className="text-[9px] text-emerald-800 block uppercase font-bold">Net Cash Flow</span>
              <span className={`text-xs font-mono font-bold ${surplusCashFlow >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                RM {surplusCashFlow.toLocaleString()}
              </span>
            </div>
          </div>

          {surplusCashFlow < 0 ? (
            <div className="mt-3 bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-start gap-2.5 text-rose-800 text-[11px]">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
              <div>
                <strong>Negative Cash Flow Alert!</strong> Your monthly expenses (RM {fixedExpenses + variableExpenses}) exceed your income. This creates a net deficit. Malaysian syllabus advice: Immediately reduce variable expenditures to avoid accumulation of consumer debts!
              </div>
            </div>
          ) : (
            <div className="mt-3 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl flex items-start gap-2.5 text-emerald-800 text-[11px]">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
              <div>
                <strong>Positive Cash Flow!</strong> You have a healthy monthly surplus of RM {surplusCashFlow.toLocaleString()}. This represents stable financial manageability.
              </div>
            </div>
          )}
        </div>

        {/* Goal Evaluation Framework Details */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-xs font-display font-semibold text-slate-800 flex items-center gap-1.5">
              <Target className="w-4.5 h-4.5 text-blue-500" />
              Goal Feasibility & SMART Evaluation Checklist
            </h5>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${planResult.isFeasible ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
              {planResult.isFeasible ? '✓ Achievable Goal' : '⚠ Deficit Warnings'}
            </span>
          </div>

          <div className="space-y-4 mb-4">
            <div className="bg-blue-50/45 rounded-xl border border-blue-100 p-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Goal Savings Target per month:</span>
                <span className="font-mono font-bold text-slate-800">RM {planResult.monthlySavingsRequired.toLocaleString()} / month</span>
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <span className="text-slate-600">Your Actual Monthly Surplus Pot:</span>
                <span className="font-mono font-bold text-blue-600">RM {planResult.actualMonthlySavingsPot.toLocaleString()} / month</span>
              </div>
              <div className="border-t border-blue-100/50 pt-2 mt-2 flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Feasibility Status:</span>
                {planResult.difference >= 0 ? (
                  <span className="text-emerald-600 font-bold">Safe Surplus (+RM {planResult.difference.toLocaleString()})</span>
                ) : (
                  <span className="text-rose-600 font-bold">Deficit Shortfall (-RM {Math.abs(planResult.difference).toLocaleString()})</span>
                )}
              </div>
            </div>
          </div>

          {/* Interactive SMART Grid */}
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider mb-2">SMART Educational Metric Breakdown:</span>
          <div className="space-y-2 text-[11px] font-sans">
            <div className="p-2 border-l-2 border-blue-500 bg-slate-50/50">
              <strong className="text-slate-800">S (Specific):</strong> {planResult.smartCheck.specific}
            </div>
            <div className="p-2 border-l-2 border-blue-500 bg-slate-50/50">
              <strong className="text-slate-800">M (Measurable):</strong> {planResult.smartCheck.measurable}
            </div>
            <div className="p-2 border-l-2 border-blue-500 bg-slate-50/50">
              <strong className="text-slate-800">A (Achievable):</strong> {planResult.smartCheck.achievable}
            </div>
            <div className="p-2 border-l-2 border-blue-500 bg-slate-50/50">
              <strong className="text-slate-800">R (Realistic/Reliable):</strong> {planResult.smartCheck.realistic}
            </div>
            <div className="p-2 border-l-2 border-blue-500 bg-slate-50/50">
              <strong className="text-slate-800">T (Time-bound):</strong> {planResult.smartCheck.timeBound}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
