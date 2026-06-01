/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface University {
  id: string;
  name: string;
  country: 'USA' | 'Canada' | 'UK' | 'Germany' | 'Ireland' | 'Australia' | 'Singapore';
  program: string;
  tuition: number; // in USD per year
  tuitionINR: number; // in Lakhs INR
  livingCost: number; // in USD per year
  livingCostINR: number; // in Lakhs INR
  deadline: string; // e.g. Dec 15, Jan 15
  GRE_range: string; // e.g. "310 - 325"
  GPA_min: number; // e.g. 7.5 (on 10.0 scale) or 3.0 (on 4.0 scale)
  scholarships: string[];
  acceptance_rate: number; // e.g. 0.15 (15%)
  ranking: number; // Global or Country QS Ranking
  averageSalary: number; // average starting salary in USD
  averageSalaryINR: number; // in Lakhs INR
  courses: string[];
  description: string;
  location: string;
}

export interface StudentProfile {
  gpa: number; // on a scale of 10.0 or 4.0
  gpaScale: 4 | 10;
  greScore: number; // Out of 340 (0 if waived)
  greQuant?: number;
  greVerbal?: number;
  ielts: number; // IELTS Band (or TOEFL converted, e.g., 7.5)
  budgetLakhs: number; // Budget in Lakhs INR
  countryPref: string[];
  coursePref: string[]; // e.g., ["Computer Science", "Data Science", "AI"]
  workExpMonths: number;
  publications: number; // Number of research papers
  achievements: string;
}

export interface StudyAbroadRecommendation {
  university: University;
  matchScore: number; // e.g., 85
  category: 'Safe' | 'Moderate' | 'Ambitious';
  admissionProbability: number; // in %
  unbiasedJustification: string;
  roiRating: 'Excellent' | 'Good' | 'Average' | 'Poor';
}

export interface SOPAnalysisResult {
  overallScore: number; // 1-10 scale
  scores: {
    selfMotivation: number;
    academicRelevance: number;
    workExperience: number;
    programChoice: number;
    careerGoals: number;
    writingQuality: number;
    grammar: number;
    tone: number;
    originality: number;
    wordCount: number;
    keywords: number;
    storytelling: number;
    emotionalImpact: number;
    convincingPower: number;
    universityCultureFit: number;
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    grammarIssues: string[];
    storytellingFeedback: string;
    cultureFitFeedback: string;
  };
  universitySpecificDraft?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number; // in USD (or positive value for total package)
  amountINR: number; // in Lakhs or actual rupees
  eligibility: {
    gpaMin: number;
    greMin?: number;
    country: string;
    course: string;
  };
  deadline: string;
  requirements: string[];
  description: string;
}

export interface ROIPredictionResult {
  tuitionTotalINR: number;
  livingTotalINR: number;
  totalInvestmentINR: number;
  salaryYear1INR: number;
  salaryYear3INR: number;
  salaryYear5INR: number;
  paybackPeriodYears: number;
  roiPercentage5Years: number;
  marketInsights: string;
}

export interface VisaInterviewFeedback {
  score: number; // 0-100
  eyeContactScore: number; // percentage
  confidenceScore: number; // percentage
  answerRelevance: number; // percentage
  voiceToneScore: number; // percentage
  pacingReview: string; // "Good" | "Too Fast" | "Too Slow"
  behavioralFeedback: string[];
  answerFeedback: string[];
  verdict: 'Approved' | 'Requires Practice' | 'High Risk of Rejection';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  citations?: string[];
}
