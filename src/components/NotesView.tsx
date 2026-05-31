import React, { useState } from 'react';
import { BookOpen, AlertCircle, Shield, CreditCard, PiggyBank, Target, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotesView() {
  const [activeSubTab, setActiveSubTab] = useState<'form3' | 'form4' | 'form5'>('form3');

  const notesData = {
    form3: {
      title: "Consumer Mathematics (Form 3 Chapter 3)",
      sections: [
        {
          id: "savings_type",
          title: "1. Types of Savings Accounts",
          icon: <PiggyBank className="w-5 h-5 text-emerald-600" />,
          content: (
            <div className="space-y-3 font-sans text-sm text-slate-600">
              <p>Savings are excess money deposited in a safe box, drawer, or banking institutions.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-1">Savings Account</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Save any amount according to ability.</li>
                    <li>Low interest rate.</li>
                    <li>Withdraw at any time using a debit card / ATM.</li>
                  </ul>
                </div>
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-1">Fixed Deposit Account</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>Save a fixed sum for a specific tenure (e.g., 3, 9, or 12 months).</li>
                    <li>More competitive interest rates than normal savings.</li>
                    <li>Cannot withdraw before maturity, or interest will be reduced/cancelled.</li>
                  </ul>
                </div>
                <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-1">Current Account</h4>
                  <ul className="list-disc pl-4 space-y-1 text-xs">
                    <li>For personal or business transactions.</li>
                    <li>Payment can be made to another party by Cheque.</li>
                    <li>Usually no interest or subject to service charges.</li>
                    <li>Offers overdraft facilities (withdrawing beyond balance).</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "interest_math",
          title: "2. Interest Calculations",
          icon: <HelpCircle className="w-5 h-5 text-indigo-600" />,
          content: (
            <div className="space-y-4 text-sm text-slate-600">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono">
                <h5 className="font-semibold text-slate-900 mb-2 font-display">A. Simple Interest Formula</h5>
                <div className="text-lg text-blue-600 font-bold mb-1">I = Prt</div>
                <p className="text-xs text-slate-500">
                  Where:<br />
                  <span className="font-bold">I</span> = Interest earned (RM)<br />
                  <span className="font-bold">P</span> = Principal amount (RM)<br />
                  <span className="font-bold">r</span> = Annual interest rate (as a decimal)<br />
                  <span className="font-bold">t</span> = Savings term in years
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono">
                <h5 className="font-semibold text-slate-900 mb-2 font-display">B. Compound Interest Formula</h5>
                <div className="text-lg text-blue-600 font-bold mb-1">MV = P(1 + r/n)^(nt)</div>
                <p className="text-xs text-slate-500">
                  Where:<br />
                  <span className="font-bold">MV</span> = Matured value (Total accumulated balance)<br />
                  <span className="font-bold">P</span> = Principal savings amount<br />
                  <span className="font-bold">r</span> = Yearly interest rate (as decimal)<br />
                  <span className="font-bold">n</span> = Number of periods the interest is compounded per year (n=1 yearly, n=2 semi-annually, n=4 quarterly, n=12 monthly)<br />
                  <span className="font-bold">t</span> = Savings term in years
                </p>
              </div>
            </div>
          )
        },
        {
          id: "investments",
          title: "3. Investment & Return on Investment (ROI)",
          icon: <BookOpen className="w-5 h-5 text-violet-600" />,
          content: (
            <div className="space-y-2 text-sm text-slate-600">
              <p>An investment is an alternative step for holding money to yield a future return in the form of capital gains and current income.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2 text-xs">
                <div className="p-3 bg-violet-50 rounded-lg">
                  <span className="font-bold text-violet-800">Shares:</span> Companies issue shares to raise capital. Returns come in dividends and capital gains.
                </div>
                <div className="p-3 bg-violet-50 rounded-lg">
                  <span className="font-bold text-violet-800">Unit Trust:</span> Managed by professional fund managers. Spreads risk across a diversified portfolio.
                </div>
                <div className="p-3 bg-violet-50 rounded-lg">
                  <span className="font-bold text-violet-800">Real Estate:</span> Purchase of land, residential, or commercial buildings. Returns come as rent or land appreciation.
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono mt-3">
                <h5 className="font-semibold text-slate-900 mb-1 font-display">Return on Investment (ROI) Formula</h5>
                <div className="text-lg text-violet-600 font-bold mb-1">ROI = (Total Return / Value of Initial Investment) × 100%</div>
                <p className="text-xs text-slate-500">
                  Total return includes dividends + rental income + capital gains minus other ownership/maintenance costs.
                </p>
              </div>
            </div>
          )
        },
        {
          id: "credit_debt",
          title: "4. Credit & Debt Management (Chapter 3.2)",
          icon: <CreditCard className="w-5 h-5 text-amber-600" />,
          content: (
            <div className="space-y-2 text-sm text-slate-600">
              <p>Credit is a contractual postponement of payment facility. Debt is the remaining borrowed amount to be settled.</p>
              <ul className="list-disc pl-5 text-xs space-y-1 mb-2">
                <li><span className="font-bold">Advantages of Credit:</span> No cash needed, secure online usage, point rewards/rebates.</li>
                <li><span className="font-bold">Disadvantages:</span> Incur finance charges (interest up to 15-18% p.a.), risk of uncontrolled overspending, late penalties.</li>
              </ul>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs">
                <p className="font-bold text-amber-800 mb-1">Flat Interest vs. Interest on Balance:</p>
                <p><strong>Flat Interest:</strong> Calculated on the original principal amount for the full term. Monthly installments are fixed (e.g., car loans/personal loans).</p>
                <p className="mt-1"><strong>Reducing Balance Interest:</strong> Interest calculated based on the remaining loan balance of that current month. Used for housing and flexible mortgages.</p>
              </div>
            </div>
          )
        }
      ]
    },
    form4: {
      title: "Financial Planning & Management (Form 4 Chapter 10)",
      sections: [
        {
          id: "five_steps",
          title: "1. Five Steps in Financial Management",
          icon: <Target className="w-5 h-5 text-sky-600" />,
          content: (
            <div className="space-y-2 text-sm text-slate-600">
              <ol className="list-decimal pl-5 space-y-2 text-xs">
                <li><strong className="text-slate-800">Setting goals:</strong> Prioritize specific goals (Short-Term: &lt; 1 year; Long-Term: &gt; 5 years).</li>
                <li><strong className="text-slate-800">Evaluating financial status:</strong> Benchmark assets against liabilities to check net cash flows.</li>
                <li><strong className="text-slate-800">Creating financial plan:</strong> Income, savings, fixed expenses, and variable expenses.</li>
                <li><strong className="text-slate-800">Carrying out financial plan:</strong> Transition plans into budget execution.</li>
                <li><strong className="text-slate-800">Reviewing and revising progress:</strong> Regularly check that savings targets are positive and achievable.</li>
              </ol>
            </div>
          )
        },
        {
          id: "smart_framework",
          title: "2. The SMART Goals Concept",
          icon: <CheckCircle className="w-5 h-5 text-sky-600" />,
          content: (
            <div className="space-y-2 text-sm text-slate-600">
              <p>Financial goals set should adhere strictly to the SMART concept criteria:</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2">
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">S</div>
                  <div className="text-xs font-semibold text-slate-700">Specific</div>
                  <div className="text-[10px] text-slate-400">Aim for a exact item.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">M</div>
                  <div className="text-xs font-semibold text-slate-700">Measurable</div>
                  <div className="text-[10px] text-slate-400">Exact cost/amount.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">A</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Affordable / Achievable</div>
                  <div className="text-[10px] text-slate-400">Financially possible.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">R</div>
                  <div className="text-xs font-semibold text-slate-700">Realistic / Reliable</div>
                  <div className="text-[10px] text-slate-400">Fits your income.</div>
                </div>
                <div className="p-2 border border-slate-100 bg-white shadow-xs rounded-lg text-center">
                  <div className="font-bold text-sky-600 text-lg">T</div>
                  <div className="text-xs font-semibold text-slate-700 font-sans">Time-bound</div>
                  <div className="text-[10px] text-slate-400">Clear end month.</div>
                </div>
              </div>
              <p className="text-xs text-rose-500 font-semibold mt-2">✨ Rule of Thumb: Budget to save at least 10% of total income first prior to allocating any fixed or variable expenses.</p>
            </div>
          )
        }
      ]
    },
    form5: {
      title: "Risk and Insurance Coverage (Form 5 Chapter 3)",
      sections: [
        {
          id: "insurance_types",
          title: "1. What is Insurance / Life & General",
          icon: <Shield className="w-5 h-5 text-rose-600" />,
          content: (
            <div className="space-y-4 text-sm text-slate-600">
              <p>Insurance transfers risk from an individual to an insurance organization under a signed contract. The policyholder pays a premium, and the company promises indemnity (pre-loss restoration) if losses occur.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-100">
                  <h4 className="font-semibold text-rose-800 text-xs mb-1">Life Insurance</h4>
                  <p className="text-[11px] text-slate-500 mb-2">Guarantees payment of stated benefits in event of: death, critical illness, or permanent loss of ability.</p>
                  <div className="bg-white p-2 rounded border border-rose-100 font-mono text-[10px]">
                    <strong>Premium Calculation Formula:</strong><br />
                    Premium = (Face Value of Policy / RM x) × (Rate per RM x)
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-semibold text-slate-800 text-xs mb-1">General Insurance</h4>
                  <ul className="list-disc pl-4 text-[11px] text-slate-500 space-y-1">
                    <li><strong>Motor:</strong> Coverage of third-party injury, property loss, or own vehicle damage.</li>
                    <li><strong>Fire:</strong> Protection for residential or commercial property due to accidental fire/explosions.</li>
                    <li><strong>Medical & Health:</strong> Coverage for hospitalization & surgical costs, or critical illness bills.</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        },
        {
          id: "coinsurance",
          title: "2. Co-insurance / Deductibles",
          icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
          content: (
            <div className="space-y-3 text-sm text-slate-600">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs">
                <strong>Deductible:</strong> The amount that MUST be borne by the policyholder first before they can claim from the insurance company.
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs">
                <h5 className="font-semibold text-slate-900 mb-2 font-display">A. Co-insurance in Property Insurance</h5>
                <p className="text-slate-500 mb-1">Amount of Required Insurance = Percentage of Co-insurance (e.g. 80%) × Insurable Value of Property</p>
                <div className="space-y-2 mt-2">
                  <p><strong>Case 1 (Insured &ge; Required):</strong> Compensation = Loss - Deductible (if loss &lt; insured purchased amount)</p>
                  <p><strong>Case 2 (Insured &lt; Required):</strong> Compensation = (Purchased / Required × Loss) - Deductible</p>
                  <p><strong>Case 3 (Total Loss):</strong> Compensation = Insurance Purchased - Deductible</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-xs">
                <h5 className="font-semibold text-slate-900 mb-1 font-display">B. Co-insurance in Health Insurance</h5>
                <p className="text-slate-500">Stipulated sharing split (e.g., 80/20). Insurance pays 80% and the policyholder pays 20% of the claimable balance (after deductible has been subtracted).</p>
              </div>
            </div>
          )
        }
      ]
    }
  };

  const selectedNotes = notesData[activeSubTab];

  return (
    <div id="notes-view-root" className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar selectors */}
      <div className="lg:col-span-1 space-y-2">
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100">
          <h3 className="font-display font-bold text-slate-800 text-sm mb-3 uppercase tracking-wider">Syllabus Chapters</h3>
          <div className="flex flex-col space-y-1.5">
            <button
              id="btn-form3"
              onClick={() => setActiveSubTab('form3')}
              className={`p-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
                activeSubTab === 'form3'
                  ? 'bg-blue-600 text-white shadow-blue-100 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <PiggyBank className="w-4 h-4" />
              Form 3 Chapter 3
            </button>
            <button
              id="btn-form4"
              onClick={() => setActiveSubTab('form4')}
              className={`p-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
                activeSubTab === 'form4'
                  ? 'bg-blue-600 text-white shadow-blue-100 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Target className="w-4 h-4" />
              Form 4 Chapter 10
            </button>
            <button
              id="btn-form5"
              onClick={() => setActiveSubTab('form5')}
              className={`p-3 text-left text-xs font-semibold rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
                activeSubTab === 'form5'
                  ? 'bg-blue-600 text-white shadow-blue-100 shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              Form 5 Chapter 3
            </button>
          </div>
        </div>

        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-[11px] text-blue-800 leading-relaxed">
          <span className="font-semibold block mb-1">👩‍🏫 Educational Tip</span>
          These learning notes explicitly summarize the exact formulas and definitions required by the Ministry of Education Malaysia (KPM) syllabus for SPM candidates! Use them side-by-side with the Calculators to study the equations.
        </div>
      </div>

      {/* Main content display */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100">
          <div className="border-b border-slate-100 pb-4 mb-4">
            <span className="text-[10px] bg-blue-50 text-blue-700 rounded-full font-bold px-2.5 py-1 tracking-wide uppercase border border-blue-100">Interactive Study Desk</span>
            <h2 className="font-display font-bold text-slate-800 text-lg sm:text-xl mt-1.5">{selectedNotes.title}</h2>
          </div>

          <div className="space-y-6">
            {selectedNotes.sections.map((sec, index) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border border-slate-100/80 rounded-xl p-4 bg-slate-50/50"
              >
                <div className="flex items-center gap-3 mb-3 border-b border-slate-100 pb-2">
                  <div className="p-1.5 bg-white rounded-lg shadow-sm">
                    {sec.icon}
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-sm">{sec.title}</h3>
                </div>
                {sec.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
