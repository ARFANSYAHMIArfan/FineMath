import {
  SimpleInterestInput,
  SimpleInterestResult,
  CompoundInterestInput,
  CompoundInterestResult,
  RoiInput,
  RoiResult,
  LoanInput,
  LoanResult,
  AmortizationRow,
  FinancialPlanInput,
  GoalInput,
  GoalFeasibilityResult,
  LifeInsuranceInput,
  LifeInsuranceResult,
  PropertyInsuranceInput,
  PropertyInsuranceResult,
  MedicalInsuranceInput,
  MedicalInsuranceResult
} from './types';

// Simple Interest I = Prt
export function calculateSimpleInterest(input: SimpleInterestInput): SimpleInterestResult {
  const { principal, rate, time } = input;
  const decimalRate = rate / 100;
  const interest = principal * decimalRate * time;
  return {
    interest: Number(interest.toFixed(2)),
    totalAccumulated: Number((principal + interest).toFixed(2))
  };
}

// Compound Interest MV = P(1 + r/n)^(nt)
export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const { principal, rate, time, n } = input;
  const r = rate / 100;
  
  const totalPeriods = n * time;
  const base = 1 + (r / n);
  const maturedValue = principal * Math.pow(base, totalPeriods);
  const interestEarned = maturedValue - principal;

  // Let's build a yearly breakdown
  const yearlyBreakdown: CompoundInterestResult['yearlyBreakdown'] = [];
  let currentBalance = principal;
  
  for (let year = 1; year <= Math.ceil(time); year++) {
    // Calculate compound for that specific year or proportion of year
    const yearTime = Math.min(year, time) - (year - 1);
    const yearPeriods = n * yearTime;
    const yearEndBalance = currentBalance * Math.pow(1 + (r / n), yearPeriods);
    const interestAdded = yearEndBalance - currentBalance;
    
    yearlyBreakdown.push({
      year,
      interestAdded: Number(interestAdded.toFixed(2)),
      balance: Number(yearEndBalance.toFixed(2))
    });
    
    currentBalance = yearEndBalance;
  }

  return {
    maturedValue: Number(maturedValue.toFixed(2)),
    interestEarned: Number(interestEarned.toFixed(2)),
    yearlyBreakdown
  };
}

// Return on Investment ROI = (Total Return / Initial Investment) * 100
export function calculateRoi(input: RoiInput): RoiResult {
  const { initialInvestment, capitalGain, dividends, rentalIncome, otherExpenses = 0 } = input;
  
  const totalReturn = capitalGain + dividends + rentalIncome - otherExpenses;
  const roiDecimal = initialInvestment > 0 ? totalReturn / initialInvestment : 0;
  const roiPercentage = roiDecimal * 100;

  return {
    totalReturn: Number(totalReturn.toFixed(2)),
    roiPercentage: Number(roiPercentage.toFixed(2)),
    roiDecimal: Number(roiDecimal.toFixed(4))
  };
}

// Loans: Flat rate vs Reducing Balance (Amortized)
export function calculateLoan(input: LoanInput): LoanResult {
  const { principal, annualRate, timeYears, type } = input;
  const months = timeYears * 12;
  const r = annualRate / 100;

  if (type === 'flat') {
    const totalInterest = principal * r * timeYears;
    const totalPayment = principal + totalInterest;
    const monthlyInstallment = months > 0 ? totalPayment / months : 0;

    const amortizationTable: AmortizationRow[] = [];
    let remainingBalance = principal;
    const monthlyInterestShare = totalInterest / months;
    const monthlyPrincipalShare = principal / months;

    for (let m = 1; m <= months; m++) {
      remainingBalance -= monthlyPrincipalShare;
      amortizationTable.push({
        month: m,
        interestCharged: Number(monthlyInterestShare.toFixed(2)),
        principalPaid: Number(monthlyPrincipalShare.toFixed(2)),
        installment: Number(monthlyInstallment.toFixed(2)),
        endingBalance: Math.max(0, Number(remainingBalance.toFixed(2))),
        totalInterestToDate: Number((monthlyInterestShare * m).toFixed(2))
      });
    }

    return {
      monthlyInstallment: Number(monthlyInstallment.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalPayment: Number(totalPayment.toFixed(2)),
      amortizationTable
    };
  } else {
    // Reducing balance loan
    const monthlyRate = r / 12;
    let monthlyInstallment = 0;
    
    if (monthlyRate > 0 && months > 0) {
      monthlyInstallment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    } else if (months > 0) {
      monthlyInstallment = principal / months;
    }

    const amortizationTable: AmortizationRow[] = [];
    let remainingBalance = principal;
    let totalInterestToDate = 0;

    for (let m = 1; m <= months; m++) {
      const interestCharged = remainingBalance * monthlyRate;
      let principalPaid = monthlyInstallment - interestCharged;
      
      if (remainingBalance < principalPaid) {
        principalPaid = remainingBalance;
      }
      
      remainingBalance -= principalPaid;
      totalInterestToDate += interestCharged;

      amortizationTable.push({
        month: m,
        interestCharged: Number(interestCharged.toFixed(2)),
        principalPaid: Number(principalPaid.toFixed(2)),
        installment: Number((principalPaid + interestCharged).toFixed(2)),
        endingBalance: Math.max(0, Number(remainingBalance.toFixed(2))),
        totalInterestToDate: Number(totalInterestToDate.toFixed(2))
      });
      
      if (remainingBalance <= 0) break;
    }

    const totalInterestPayable = totalInterestToDate;
    return {
      monthlyInstallment: Number(monthlyInstallment.toFixed(2)),
      totalInterest: Number(totalInterestPayable.toFixed(2)),
      totalPayment: Number((principal + totalInterestPayable).toFixed(2)),
      amortizationTable
    };
  }
}

// Financial Planning Tracker & SMART Goal check
export function analyzeFinancialPlan(
  plan: FinancialPlanInput,
  goal: GoalInput
): GoalFeasibilityResult {
  const { monthlyIncome, savingsTargetPercent, fixedExpenses, variableExpenses } = plan;
  const { targetAmount, timeFrameMonths } = goal;

  const targetSavingsRatio = savingsTargetPercent / 100;
  const initialSavingsTargetValue = monthlyIncome * targetSavingsRatio;

  // Let's evaluate actual cash flow = Income - expenses - actual savings (or cash flow just as Income - expenses)
  const totalExpenses = fixedExpenses + variableExpenses;
  const actualSurplus = monthlyIncome - totalExpenses; // Cash flow surplus

  const monthlySavingsRequired = timeFrameMonths > 0 ? targetAmount / timeFrameMonths : 0;
  
  // Is this feasible based on surplus?
  // Recommended is to save first, but here the surplus represents what is left.
  const isFeasible = actualSurplus >= monthlySavingsRequired;
  const difference = actualSurplus - monthlySavingsRequired;

  // Construct SMART evaluation responses
  const specific = `The goal to buy "${goal.name || 'Financial Goal'}" is clearly defined with a target of RM ${targetAmount.toLocaleString()}.`;
  const measurable = `Requires saving RM ${monthlySavingsRequired.toFixed(2)}/month for ${timeFrameMonths} months structure.`;
  const achievable = isFeasible 
    ? `Achievable! Your current cash flow surplus of RM ${actualSurplus.toFixed(2)}/month is higher than the needed RM ${monthlySavingsRequired.toFixed(2)}/month.`
    : `Difficulty. You are short by RM ${Math.abs(difference).toFixed(2)}/month. To make it achievable, reduce variable expenses or increase income.`;
  const realistic = monthlySavingsRequired <= (monthlyIncome * 0.5) 
    ? `Realistic. The savings requirement represents only ${( (monthlySavingsRequired / (monthlyIncome || 1)) * 100 ).toFixed(1)}% of your monthly income.`
    : `Overly ambitious. Saving represents ${( (monthlySavingsRequired / (monthlyIncome || 1)) * 100 ).toFixed(1)}% of income. Recommended is <= 20-30%.`;
  const timeBound = `Time scale is bound to exactly ${timeFrameMonths} months, concluding in approx. ${(timeFrameMonths / 12).toFixed(1)} years.`;

  return {
    monthlySavingsRequired: Number(monthlySavingsRequired.toFixed(2)),
    isFeasible,
    actualMonthlySavingsPot: Number(actualSurplus.toFixed(2)),
    difference: Number(difference.toFixed(2)),
    smartCheck: {
      specific,
      measurable,
      achievable,
      realistic,
      timeBound
    }
  };
}

// Life Insurance Premium
export const LIFE_PREMIUM_RATES: Record<number, {
  male: { smoker: number; 'non-smoker': number };
  female: { smoker: number; 'non-smoker': number };
}> = {
  35: {
    male: { 'non-smoker': 2.12, smoker: 2.72 },
    female: { 'non-smoker': 1.45, smoker: 1.78 }
  },
  36: {
    male: { 'non-smoker': 2.18, smoker: 2.80 },
    female: { 'non-smoker': 1.50, smoker: 1.84 }
  },
  37: {
    male: { 'non-smoker': 2.26, smoker: 2.91 },
    female: { 'non-smoker': 1.56, smoker: 1.93 }
  },
  38: {
    male: { 'non-smoker': 2.36, smoker: 3.05 },
    female: { 'non-smoker': 1.63, smoker: 2.03 }
  },
  39: {
    male: { 'non-smoker': 2.49, smoker: 3.23 },
    female: { 'non-smoker': 1.71, smoker: 2.14 }
  },
  40: {
    male: { 'non-smoker': 2.66, smoker: 3.47 },
    female: { 'non-smoker': 1.80, smoker: 2.26 }
  }
};

// Generates rate dynamically with basic formula if age is outside [35, 40]
export function getLifePremiumRate(age: number, gender: 'male'|'female', status: 'smoker'|'non-smoker'): number {
  if (LIFE_PREMIUM_RATES[age]) {
    return LIFE_PREMIUM_RATES[age][gender][status];
  }
  
  // Safe general formula to emulate increasing rate with age
  let base = gender === 'male' ? 1.80 : 1.20;
  // Increase rate by age
  const ageDiff = age - 30;
  base += ageDiff * 0.08;
  if (status === 'smoker') {
    base *= 1.3; // 30% higher for smokers
  }
  return Number(Math.max(0.5, base).toFixed(2));
}

export function calculateLifeInsurance(input: LifeInsuranceInput): LifeInsuranceResult {
  const { age, gender, status, faceValue, criticalIllnessRider, criticalIllnessPercentage } = input;
  
  const basicPremiumRatePer1000 = getLifePremiumRate(age, gender, status);
  const basicAnnualPremium = (faceValue / 1000) * basicPremiumRatePer1000;
  
  let criticalIllnessRiderPremium = 0;
  if (criticalIllnessRider) {
    // Critical illness rate: RM 1.77 per RM 1000
    const criticalCoverageVal = faceValue * (criticalIllnessPercentage / 100);
    criticalIllnessRiderPremium = (criticalCoverageVal / 1000) * 1.77;
  }

  return {
    basicPremiumRatePer1000,
    basicAnnualPremium: Number(basicAnnualPremium.toFixed(2)),
    criticalIllnessRiderPremium: Number(criticalIllnessRiderPremium.toFixed(2)),
    totalAnnualPremium: Number((basicAnnualPremium + criticalIllnessRiderPremium).toFixed(2))
  };
}

// Property Insurance (Co-insurance)
export function calculatePropertyInsurance(input: PropertyInsuranceInput): PropertyInsuranceResult {
  const { insurableValue, coInsurancePercentage = 80, insurancePurchased, lossAmount, deductible, isTotalLoss } = input;
  
  const requiredInsurance = insurableValue * (coInsurancePercentage / 100);
  const underInsured = insurancePurchased < requiredInsurance;
  
  let compensation = 0;
  let underInsuredPenalty = 0;

  if (isTotalLoss) {
    // Case 3 (Total loss): Compensation = insurancePurchased - deductible
    compensation = Math.max(0, insurancePurchased - deductible);
    underInsuredPenalty = 0; // Total loss doesn't co-insure calculate percentage; compensation capped at purchased anyway
  } else {
    if (!underInsured) {
      // Case 1: amount of insurance purchased >= required insurance
      // Compensation = loss amount - deductible
      compensation = Math.max(0, lossAmount - deductible);
    } else {
      // Case 2: scale down compensation
      const fractionalRate = insurancePurchased / requiredInsurance;
      compensation = (fractionalRate * lossAmount) - deductible;
      underInsuredPenalty = lossAmount - compensation - deductible;
      if (compensation < 0) {
        compensation = 0;
        underInsuredPenalty = lossAmount;
      }
    }
  }

  // Ensure compensation does not exceed the insurance purchased
  if (compensation > insurancePurchased) {
    compensation = insurancePurchased;
  }

  // Compensation cannot exceed positive bounds
  compensation = Number(Math.max(0, compensation).toFixed(2));
  underInsuredPenalty = Number(Math.max(0, underInsuredPenalty).toFixed(2));

  const totalLossBorneByOwner = Number(Math.max(0, lossAmount - compensation).toFixed(2));

  return {
    requiredInsurance: Number(requiredInsurance.toFixed(2)),
    underInsured,
    compensation,
    underInsuredPenalty,
    totalLossBorneByOwner
  };
}

// Medical Insurance Co-insurance (participation)
export function calculateMedicalInsurance(input: MedicalInsuranceInput): MedicalInsuranceResult {
  const { medicalCost, deductible, coInsuranceSplit } = input;
  
  if (medicalCost <= deductible) {
    return {
      insurancePayment: 0,
      policyholderPayment: Number(medicalCost.toFixed(2))
    };
  }

  const claimableAmount = medicalCost - deductible;
  const companyPercentageDecimal = coInsuranceSplit / 100;
  
  const insurancePayment = claimableAmount * companyPercentageDecimal;
  const policyholderShare = claimableAmount * (1 - companyPercentageDecimal);
  const policyholderPayment = deductible + policyholderShare;

  return {
    insurancePayment: Number(insurancePayment.toFixed(2)),
    policyholderPayment: Number(policyholderPayment.toFixed(2))
  };
}

// Sample Malaysian syllabus questions for student quizzes
export const SPM_QUIZ_QUESTIONS: Array<{
  id: number;
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}> = [
  {
    id: 1,
    chapter: "Form 3 Chapter 3: Savings",
    question: "Encik Ali deposited RM 8,000 in a fixed deposit account for 2 years with an interest rate of 4% per annum. What is the simple interest earned?",
    options: [
      "RM 320",
      "RM 640",
      "RM 8,640",
      "RM 160"
    ],
    correctIndex: 1,
    explanation: "Using I = Prt: I = 8000 * 0.04 * 2 = RM 640."
  },
  {
    id: 2,
    chapter: "Form 3 Chapter 3: Compound Interest",
    question: "Puan Lim saves RM 10,000 which is compounded quarterly (every 3 months) at a rate of 3% per annum. What is the matured value at the end of 1 year?",
    options: [
      "RM 10,300.00",
      "RM 10,303.39",
      "RM 10,075.00",
      "RM 10,304.16"
    ],
    correctIndex: 1,
    explanation: "Using MV = P(1 + r/n)^(nt) where P=10000, r=0.03, n=4 (compounded quarterly), t=1. MV = 10000 * (1 + 0.03/4)^(4*1) = 10000 * (1.0075)^4 = RM 10,303.39."
  },
  {
    id: 3,
    chapter: "Form 3 Chapter 3: Return on Investment",
    question: "Adam bought a property worth RM 200,000. He paid 10% down payment (RM 20,000). Two years later, he sold it for RM 240,000. During the 2 years, he earned RM 12,000 in rent, but spent RM 4,000 in maintenance. Calculate the ROI on his actual cash down payment.",
    options: [
      "24.0%",
      "40.0%",
      "240.0%",
      "20.0%"
    ],
    correctIndex: 2,
    explanation: "Total return = Capital Gain (RM 240k - RM 200k = RM 40k) + Rental (RM 12k) - Expenses (RM 4k) = RM 48,000. Initial investment (down payment) = RM 20,000. ROI = (RM 48,000 / RM 20,000) * 100 = 240%."
  },
  {
    id: 4,
    chapter: "Form 3 Chapter 3: Credit Card",
    question: "Which of the following is considered a DISADVANTAGE of using a credit card?",
    options: [
      "Point redemptions and cash rebate rewards on spending.",
      "Convenience of conducting online transactions safely without cash.",
      "Incurring finance charges, late fees, and high interest if unpaid.",
      "Postponement of payment facility for emergencies."
    ],
    correctIndex: 2,
    explanation: "Incurring high interest charges, potential overspending, and late penalties are major disadvantages of credit card debt."
  },
  {
    id: 5,
    chapter: "Form 4 Chapter 10: Financial Planning",
    question: "Under the SMART goals concept, what does the letter 'A' stand for?",
    options: [
      "Achievable / Affordable",
      "Accurate",
      "Action-oriented",
      "Accelerated"
    ],
    correctIndex: 0,
    explanation: "In standard consumer financial education, SMART represents Specific, Measurable, Achievable/Affordable, Realistic/Reliable, and Time-bound."
  },
  {
    id: 6,
    chapter: "Form 4 Chapter 10: Cash Flow Planning",
    question: "How is a negative surplus cash flow situation best resolved in a healthy financial plan?",
    options: [
      "Using a credit card to pay for all core utility expenses.",
      "Reducing variable expenses (like food delivery & entertainment).",
      "Stopping fixed savings goals completely to increase loose cash.",
      "Taking more personal loans to pay off monthly commitments."
    ],
    correctIndex: 1,
    explanation: "Reducing variable expenses is the fastest, safest way to restore a positive cash flow in a budget plan."
  },
  {
    id: 7,
    chapter: "Form 5 Chapter 3: Life Insurance",
    question: "A healthy 39-year-old male non-smoker buys a life insurance policy with a face value of RM 150,000. Given the premium rate is RM 2.49 per RM 1,000, calculate his annual basic premium.",
    options: [
      "RM 249.00",
      "RM 373.50",
      "RM 395.00",
      "RM 150.00"
    ],
    correctIndex: 1,
    explanation: "Premium = (Face Value / 1000) * Rate = (150,000 / 1000) * 2.49 = 150 * 2.49 = RM 373.50."
  },
  {
    id: 8,
    chapter: "Form 5 Chapter 3: Property Co-insurance",
    question: "A house has an insurable value of RM 250,000. The policy requires an 80% co-insurance. The owner bought RM 150,000 of insurance coverage. If the house suffers a partial loss of RM 50,000 with a RM 2,000 deductible, how much compensation will the owner receive?",
    options: [
      "RM 48,000",
      "RM 37,500",
      "RM 35,500",
      "RM 30,000"
    ],
    correctIndex: 2,
    explanation: "Required Insurance = 80% * 250,000 = RM 200,000. Current insurance (150,000) < Required (200,000), so Case 2 applies. Compensation = (Purchased / Required * Loss) - Deductible = (150k / 200k * 50k) - 2000 = (0.75 * 50k) - 2000 = 37,500 - 2,000 = RM 35,500."
  },
  {
    id: 9,
    chapter: "Form 5 Chapter 3: Health Insurance",
    question: "Puan Mary has progress medical insurance with a deductible of RM 500 and a co-insurance of 80/20 (company pays 80%). If her medical bill is RM 10,500, how much does Mary have to pay?",
    options: [
      "RM 2,000",
      "RM 2,500",
      "RM 500",
      "RM 10,500"
    ],
    correctIndex: 1,
    explanation: "Mary pays = Deductible + 20% of remaining balance. Remaining = 10,500 - 500 = RM 10,000. Co-share paid by Mary = 20% * 10,000 = RM 2,000. Total paid by Mary = 500 + 2000 = RM 2,500."
  },
  {
    id: 10,
    chapter: "Form 5 Chapter 3: Deductible Meaning",
    question: "What is the correct definition of a 'deductible' in insurance?",
    options: [
      "The amount of return an investor gets on premium payments.",
      "The penalty of co-insurance when not buying enough property cover.",
      "The pre-determined amount the policyholder must bear first before matching claims.",
      "The monthly fee paid directly to keep the insurance policy active."
    ],
    correctIndex: 2,
    explanation: "A deductible is an amount that must be borne by the policyholder first before they can make a claim from the insurance company."
  }
];
