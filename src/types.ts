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

// Form 5 Chapter 4: Consumer Mathematics: Taxation
export interface IncomeTaxInput {
  totalAnnualIncome: number;
  taxExemptions: number; // e.g. donations to approved institutions
  individualRelief: number; // fixed standard RM 9,000 in KSSM
  lifeInsuranceEPFRelief: number; // max RM 7,000
  medicalInsuranceRelief: number; // max RM 3,000
  parentMedicalRelief: number; // medical treatment for parents, max e.g. RM 8,000
  educationRelief: number; // self-education etc., max e.g. RM 7,000
  otherReliefs: number; // lifestyle etc., max e.g. RM 2,500
  zakat: number; // rebate amount
  monthlyPCB: number; // Potongan Cukai Bulanan
}

export interface IncomeTaxResult {
  chargeableIncome: number;
  calculatedTax: number;
  taxRebate: number; // RM 400 if chargeableIncome <= 35000 + zakat
  taxPayable: number;
  totalPCByear: number;
  taxDifference: number; // positive = paid too little (shortfall), negative = paid too much (surplus)
  status: 'insufficient' | 'excess' | 'exact';
}

export interface RoadTaxInput {
  engineCapacity: number; // cc
  vehicleType: 'car' | 'motorcycle';
  location: 'peninsular' | 'sabah_sarawak';
}

export interface RoadTaxResult {
  baseRate: number;
  progressiveRatePerCc: number;
  excessCc: number;
  progressiveTax: number;
  totalRoadTax: number;
}

export interface PropertyAssessmentInput {
  annualValue: number;
  taxRatePercent: number; // e.g., 5%
}

export interface PropertyAssessmentResult {
  annualTax: number;
  halfYearlyTax: number;
}

export interface QuitRentInput {
  landArea: number; // e.g., m^2
  ratePerUnitArea: number; // e.g., RM 0.43/m^2
}

export interface QuitRentResult {
  totalQuitRent: number;
}

export interface SstInput {
  amount: number;
  taxType: 'sales5' | 'sales10' | 'service6';
}

export interface SstResult {
  taxRatePercent: number;
  taxCharged: number;
  totalWithTax: number;
}

export interface Question {
  id: number;
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
