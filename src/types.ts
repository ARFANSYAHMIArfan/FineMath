export interface SimpleInterestInput {
  principal: number;
  rate: number; // in percentage, e.g. 4.5%
  time: number; // in years
}

export interface SimpleInterestResult {
  interest: number;
  totalAccumulated: number;
}

export interface CompoundInterestInput {
  principal: number;
  rate: number; // in percentage
  time: number; // in years
  n: number; // number of compound periods per year (e.g. 1, 2 for semi-annual, 4 for quarterly, 12 for monthly)
}

export interface CompoundInterestResult {
  maturedValue: number;
  interestEarned: number;
  yearlyBreakdown: {
    year: number;
    interestAdded: number;
    balance: number;
  }[];
}

export interface RoiInput {
  initialInvestment: number;
  capitalGain: number; // Selling price - Purchase price
  dividends: number;
  rentalIncome: number;
  otherExpenses?: number;
}

export interface RoiResult {
  totalReturn: number;
  roiPercentage: number;
  roiDecimal: number;
}

export interface LoanInput {
  principal: number;
  annualRate: number; // in percentage
  timeYears: number;
  type: 'flat' | 'reducing';
}

export interface AmortizationRow {
  month: number;
  interestCharged: number;
  principalPaid: number;
  installment: number;
  endingBalance: number;
  totalInterestToDate: number;
}

export interface LoanResult {
  monthlyInstallment: number;
  totalInterest: number;
  totalPayment: number;
  amortizationTable: AmortizationRow[];
}

export interface FinancialPlanInput {
  monthlyIncome: number;
  savingsTargetPercent: number; // default 10%
  fixedExpenses: number;
  variableExpenses: number;
}

export interface GoalInput {
  name: string;
  targetAmount: number;
  timeFrameMonths: number;
}

export interface GoalFeasibilityResult {
  monthlySavingsRequired: number;
  isFeasible: boolean;
  actualMonthlySavingsPot: number;
  difference: number;
  smartCheck: {
    specific: string;
    measurable: string;
    achievable: string;
    realistic: string;
    timeBound: string;
  };
}

// Form 5 Chapter 3: Risk and Insurance
export type Gender = 'male' | 'female';
export type SmokerStatus = 'smoker' | 'non-smoker';

export interface LifeInsuranceInput {
  age: number; // 35 - 40
  gender: Gender;
  status: SmokerStatus;
  faceValue: number; // e.g. 150000
  criticalIllnessRider: boolean;
  criticalIllnessPercentage: number; // e.g. 30%
}

export interface LifeInsuranceResult {
  basicPremiumRatePer1000: number;
  basicAnnualPremium: number;
  criticalIllnessRiderPremium: number;
  totalAnnualPremium: number;
}

export interface PropertyInsuranceInput {
  insurableValue: number; // e.g. 250000
  coInsurancePercentage: number; // e.g. 80
  insurancePurchased: number; // e.g. 150000
  lossAmount: number; // e.g. 50000
  deductible: number; // e.g. 2000
  isTotalLoss: boolean;
}

export interface PropertyInsuranceResult {
  requiredInsurance: number;
  underInsured: boolean;
  compensation: number;
  underInsuredPenalty: number; // loss borne by owner due to under-insurance
  totalLossBorneByOwner: number; // deductible + penalty + remaining loss below deductible
}

export interface MedicalInsuranceInput {
  medicalCost: number; // e.g. 40000
  deductible: number; // e.g. 500
  coInsuranceSplit: number; // company share e.g. 80 (meaning 80/20)
}

export interface MedicalInsuranceResult {
  insurancePayment: number;
  policyholderPayment: number;
}

export interface Question {
  id: number;
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
