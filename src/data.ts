/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { University, Scholarship } from './types';

export const UNIVERSITIES: University[] = [
  {
    id: 'cmu-cs',
    name: 'Carnegie Mellon University',
    country: 'USA',
    program: 'MS in Computer Science',
    tuition: 54000,
    tuitionINR: 45.0,
    livingCost: 18000,
    livingCostINR: 15.0,
    deadline: 'Dec 15',
    GRE_range: '320 - 335',
    GPA_min: 8.8,
    scholarships: ['CMU Merit Scholarship', 'Gelfand fellowship'],
    acceptance_rate: 0.08,
    ranking: 5,
    averageSalary: 135000,
    averageSalaryINR: 112.5,
    courses: ['Computer Science', 'Data Science', 'AI'],
    description: 'CMU is universally ranked as one of the best for Computing and AI. Highly prestigious and highly competitive.',
    location: 'Pittsburgh, Pennsylvania'
  },
  {
    id: 'stanford-cs',
    name: 'Stanford University',
    country: 'USA',
    program: 'MS in Computer Science (AI Track)',
    tuition: 58000,
    tuitionINR: 48.0,
    livingCost: 24000,
    livingCostINR: 20.0,
    deadline: 'Dec 05',
    GRE_range: '325 - 338',
    GPA_min: 9.2,
    scholarships: ['Knight-Hennessy Scholars Program'],
    acceptance_rate: 0.05,
    ranking: 2,
    averageSalary: 160000,
    averageSalaryINR: 133.0,
    courses: ['Computer Science', 'AI'],
    description: 'Located in Silicon Valley, Stanford offers unmatched industry connections, venture capabilities, and elite research.',
    location: 'Stanford, California'
  },
  {
    id: 'usc-cs',
    name: 'University of Southern California',
    country: 'USA',
    program: 'MS in Computer Science',
    tuition: 48000,
    tuitionINR: 40.0,
    livingCost: 18000,
    livingCostINR: 15.0,
    deadline: 'Dec 15',
    GRE_range: '312 - 324',
    GPA_min: 8.2,
    scholarships: ['USC Viterbi Dean Fellowship'],
    acceptance_rate: 0.22,
    ranking: 116,
    averageSalary: 105000,
    averageSalaryINR: 87.5,
    courses: ['Computer Science', 'Data Science'],
    description: 'A very popular choice for Indian MS aspirants due to moderate entry requirements and fantastic alumni network on the US west coast.',
    location: 'Los Angeles, California'
  },
  {
    id: 'neu-cs',
    name: 'Northeastern University',
    country: 'USA',
    program: 'MS in Computer Science',
    tuition: 38000,
    tuitionINR: 31.5,
    livingCost: 16000,
    livingCostINR: 13.3,
    deadline: 'Jan 15',
    GRE_range: '308 - 322',
    GPA_min: 7.8,
    scholarships: ['NEU Khoury Merit Scholarship'],
    acceptance_rate: 0.28,
    ranking: 310,
    averageSalary: 95000,
    averageSalaryINR: 79.0,
    courses: ['Computer Science', 'Data Science', 'AI'],
    description: 'Highly acclaimed for its Cooperative Education (Co-op) program, letting students alternate semesters of study with full-time professional employment.',
    location: 'Boston, Massachusetts'
  },
  {
    id: 'nyu-cs',
    name: 'New York University',
    country: 'USA',
    program: 'MS in Computer Science',
    tuition: 46000,
    tuitionINR: 38.3,
    livingCost: 22000,
    livingCostINR: 18.3,
    deadline: 'Feb 15',
    GRE_range: '312 - 325',
    GPA_min: 8.0,
    scholarships: ['NYU Tandon Scholarship'],
    acceptance_rate: 0.20,
    ranking: 43,
    averageSalary: 110000,
    averageSalaryINR: 91.6,
    courses: ['Computer Science', 'AI'],
    description: 'The Courant Institute of Mathematical Sciences and NYU Tandon offer high-ranking computing programs with vibrant NYC access.',
    location: 'New York City, New York'
  },
  {
    id: 'asu-cs',
    name: 'Arizona State University',
    country: 'USA',
    program: 'MS in Computer Science',
    tuition: 33000,
    tuitionINR: 27.5,
    livingCost: 12000,
    livingCostINR: 10.0,
    deadline: 'Jan 15',
    GRE_range: '305 - 318',
    GPA_min: 7.5,
    scholarships: ['ASU Fulton Schools Fellowship'],
    acceptance_rate: 0.48,
    ranking: 200,
    averageSalary: 88000,
    averageSalaryINR: 73.3,
    courses: ['Computer Science', 'Cybersecurity', 'Web Dev'],
    description: 'Extremely popular for safe-moderate student profiles. ASU boasts high innovation rates and a massive community.',
    location: 'Tempe, Arizona'
  },
  {
    id: 'utd-cs',
    name: 'University of Texas at Dallas',
    country: 'USA',
    program: 'MS in Computer Science',
    tuition: 31000,
    tuitionINR: 25.8,
    livingCost: 11000,
    livingCostINR: 9.1,
    deadline: 'Jan 15',
    GRE_range: '306 - 320',
    GPA_min: 7.6,
    scholarships: ['UTD Dean Excellence Scholarship'],
    acceptance_rate: 0.45,
    ranking: 450,
    averageSalary: 85000,
    averageSalaryINR: 70.8,
    courses: ['Computer Science', 'AI', 'Data Science'],
    description: 'Located in the Telecom Corridor of Dallas, UT Dallas provides rich recruitment resources and affordable tuition options.',
    location: 'Richardson, Texas'
  },
  {
    id: 'tum-cse',
    name: 'Technical University of Munich',
    country: 'Germany',
    program: 'MS in Informatics',
    tuition: 4000, // Minimal public fee
    tuitionINR: 3.3,
    livingCost: 13000,
    livingCostINR: 10.8,
    deadline: 'May 31',
    GRE_range: '315 - 330', // standard GRE helps significantly for credits
    GPA_min: 8.2,
    scholarships: ['DAAD Study Scholarships', 'Deutschlandstipendium'],
    acceptance_rate: 0.12,
    ranking: 37,
    averageSalary: 68000, // in Euros, converted to typical USD $73k equivalent
    averageSalaryINR: 60.8,
    courses: ['Computer Science', 'AI', 'Data Science'],
    description: 'No or ultra-low tuition college with elite global standing. Requires strong mathematical background and verified module credits.',
    location: 'Munich, Bavaria'
  },
  {
    id: 'rwth-cs',
    name: 'RWTH Aachen University',
    country: 'Germany',
    program: 'MS in Software Systems Engineering',
    tuition: 1000, // typical semester dues
    tuitionINR: 0.8,
    livingCost: 10000,
    livingCostINR: 8.3,
    deadline: 'Mar 01',
    GRE_range: 'Waived',
    GPA_min: 8.0,
    scholarships: ['DAAD Scholars', 'EPOS Scholarships'],
    acceptance_rate: 0.15,
    ranking: 106,
    averageSalary: 62000,
    averageSalaryINR: 51.6,
    courses: ['Software Engineering', 'Computer Science'],
    description: 'One of Germanys largest engineering hubs, highly valued in the European industrial automotive and automated system fields.',
    location: 'Aachen, North Rhine-Westphalia'
  },
  {
    id: 'utoronto-cs',
    name: 'University of Toronto',
    country: 'Canada',
    program: 'MS in Applied Computing (MScAC)',
    tuition: 36000,
    tuitionINR: 30.0,
    livingCost: 16000,
    livingCostINR: 13.3,
    deadline: 'Dec 10',
    GRE_range: '315 - 328',
    GPA_min: 8.5,
    scholarships: ['Ontario Graduate Scholarship', 'UofT Entrance Award'],
    acceptance_rate: 0.09,
    ranking: 21,
    averageSalary: 95000, // Canadian Dollars, converted to USD 70k or relative local
    averageSalaryINR: 75.0,
    courses: ['Computer Science', 'AI', 'Data Science'],
    description: 'A top research powerhouse. The MScAC features a built-in 8-month paid industrial internship in Canada, boosting post-grad avenues.',
    location: 'Toronto, Ontario'
  },
  {
    id: 'waterloo-ece',
    name: 'University of Waterloo',
    country: 'Canada',
    program: 'MS in Electrical and Computer Engineering (Co-op)',
    tuition: 32000,
    tuitionINR: 26.6,
    livingCost: 14000,
    livingCostINR: 11.6,
    deadline: 'Jan 15',
    GRE_range: '310 - 325',
    GPA_min: 8.3,
    scholarships: ['Waterloo Engineering Merit Scholarship'],
    acceptance_rate: 0.14,
    ranking: 112,
    averageSalary: 88000,
    averageSalaryINR: 69.5,
    courses: ['Software Engineering', 'Data Science'],
    description: 'Waterloo is famous for its cooperative education (Co-op) integration, boasting some of the highest tech-employment rates in Canada.',
    location: 'Waterloo, Ontario'
  },
  {
    id: 'ubc-cs',
    name: 'University of British Columbia',
    country: 'Canada',
    program: 'MS in Computer Science',
    tuition: 34000,
    tuitionINR: 28.3,
    livingCost: 15000,
    livingCostINR: 12.5,
    deadline: 'Dec 15',
    GRE_range: '315 - 328',
    GPA_min: 8.4,
    scholarships: ['UBC Graduate Fellowship'],
    acceptance_rate: 0.11,
    ranking: 34,
    averageSalary: 90000,
    averageSalaryINR: 75.0,
    courses: ['Computer Science', 'AI'],
    description: 'UBC is a top research institution with a gorgeous campus in Vancouver and rich collaborative industry projects.',
    location: 'Vancouver, British Columbia'
  },
  {
    id: 'imperial-cs',
    name: 'Imperial College London',
    country: 'UK',
    program: 'MSc in Computing (Artificial Intelligence)',
    tuition: 41000,
    tuitionINR: 34.0,
    livingCost: 20000,
    livingCostINR: 16.6,
    deadline: 'Jan 31',
    GRE_range: 'Optional',
    GPA_min: 8.5,
    scholarships: ['Imperial College Commonwealth Scholarship', 'Chevening Scholarship'],
    acceptance_rate: 0.10,
    ranking: 6,
    averageSalary: 75000, // In GBP, approx 95000 USD
    averageSalaryINR: 85.0,
    courses: ['AI', 'Computer Science'],
    description: 'A global top-10 science and engineering heavyweight. Intensive 1-year degrees focused on advanced AI development, deep math, and research.',
    location: 'London, England'
  },
  {
    id: 'oxford-cs',
    name: 'University of Oxford',
    country: 'UK',
    program: 'MSc in Advanced Computer Science',
    tuition: 45000,
    tuitionINR: 37.5,
    livingCost: 22000,
    livingCostINR: 18.3,
    deadline: 'Jan 08',
    GRE_range: 'Optional',
    GPA_min: 9.0,
    scholarships: ['Clarendon Fund', 'Rhodes Scholarship'],
    acceptance_rate: 0.06,
    ranking: 3,
    averageSalary: 110000,
    averageSalaryINR: 91.6,
    courses: ['Computer Science', 'AI'],
    description: 'One of the oldest and most selective colleges in the world. Exceptional tutorial structure and prestige.',
    location: 'Oxford, Oxfordshire'
  },
  {
    id: 'manchester-ds',
    name: 'University of Manchester',
    country: 'UK',
    program: 'MSc in Data Science',
    tuition: 32000,
    tuitionINR: 26.6,
    livingCost: 14000,
    livingCostINR: 11.6,
    deadline: 'Mar 15',
    GRE_range: 'Waived',
    GPA_min: 8.0,
    scholarships: ['Great Scholarship', 'UoM Postgrad Merit'],
    acceptance_rate: 0.20,
    ranking: 32,
    averageSalary: 62000,
    averageSalaryINR: 51.6,
    courses: ['Data Science', 'Computer Science'],
    description: 'Highly research-active in the Russell Group, containing modern computing modules and broad corporate connectivity.',
    location: 'Manchester, England'
  },
  {
    id: 'tcd-cs',
    name: 'Trinity College Dublin',
    country: 'Ireland',
    program: 'MSc in Computer Science (Intelligent Systems)',
    tuition: 26000,
    tuitionINR: 21.6,
    livingCost: 13000,
    livingCostINR: 10.8,
    deadline: 'Apr 30',
    GRE_range: 'Optional',
    GPA_min: 7.8,
    scholarships: ['TCD Global Excellence Postgraduate Scholarship'],
    acceptance_rate: 0.25,
    ranking: 81,
    averageSalary: 72000, // Irish Tech is robust (Google, Meta, Stripe EU HQs)
    averageSalaryINR: 60.0,
    courses: ['AI', 'Computer Science', 'Data Science'],
    description: 'Irelands premier university. Dublin is the European Silicon Valley, offering amazing post-graduate employment options under 2-year back-to-back work visas.',
    location: 'Dublin, Leinster'
  },
  {
    id: 'ucd-cs',
    name: 'University College Dublin',
    country: 'Ireland',
    program: 'MSc in Computer Science (Negotiated Learning)',
    tuition: 22000,
    tuitionINR: 18.3,
    livingCost: 12000,
    livingCostINR: 10.0,
    deadline: 'May 31',
    GRE_range: 'Optional',
    GPA_min: 7.5,
    scholarships: ['UCD Government of Ireland Scholarship'],
    acceptance_rate: 0.35,
    ranking: 171,
    averageSalary: 65000,
    averageSalaryINR: 54.0,
    courses: ['Computer Science', 'Data Science', 'Cybersecurity'],
    description: 'Extremely flexible tailored learning module allowing students to design their own computing specialization based on industrial interest.',
    location: 'Dublin, Leinster'
  }
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: 'chevening',
    name: 'Chevening Scholarships (UK Government)',
    amount: 55000, // Full coverage
    amountINR: 45.8,
    eligibility: {
      gpaMin: 8.0,
      country: 'India',
      course: 'All courses'
    },
    deadline: 'Nov 05',
    requirements: [
      'Minimum 2 years of work experience (2800 hours)',
      'Return to home country for at least 2 years after study',
      'Apply to 3 eligible UK courses'
    ],
    description: 'Fully funded scholarship awarded by the UK Government to outstanding leaders, covering entire tuition, travel, and stipend.'
  },
  {
    id: 'daad-scholarship',
    name: 'DAAD Study Scholarships for Masters (Germany)',
    amount: 14000, // Converted travel + stipend, tuition is already free
    amountINR: 11.6,
    eligibility: {
      gpaMin: 8.2,
      country: 'India',
      course: 'Engineering, Computer Science, IT'
    },
    deadline: 'Oct 31',
    requirements: [
      'Bachelors degree completed no more than 6 years ago',
      'Highly research/practical oriented SOP',
      'Academic reference letters from previous college'
    ],
    description: ' DAAD supports Indian postgraduate engineering students studying at public German universities with monthly stipends of €934, health insurance, and flight allowances.'
  },
  {
    id: 'knight-hennessy',
    name: 'Knight-Hennessy Scholars Program (Stanford)',
    amount: 80000, // Covers absolute everything
    amountINR: 66.5,
    eligibility: {
      gpaMin: 9.0,
      country: 'India',
      course: 'Computer Science, AI, Engineering'
    },
    deadline: 'Oct 09',
    requirements: [
      'Admitted to an eligible Stanford MS program',
      'Strong leadership qualities and analytical poise',
      'Two letters of recommendation and specific essays'
    ],
    description: 'An elite global leadership fellowship providing full funding (tuition, living, flight, research books) to Stanford Masters students.'
  },
  {
    id: 'tcd-global-exc',
    name: 'TCD Global Excellence Postgraduate Scholarship',
    amount: 6000, // tuition partial waiver
    amountINR: 5.0,
    eligibility: {
      gpaMin: 7.8,
      country: 'India',
      course: 'MSc in Computer Science'
    },
    deadline: 'Mar 31',
    requirements: [
      'Offer letter from Trinity College Dublin',
      '200-word personal statement on how you will contribute to the TCD community'
    ],
    description: 'Partial tuition waiver scholarships awarded to Indian high achievers displaying academic merit and potential contribution.'
  },
  {
    id: 'rotary-global',
    name: 'Rotary Foundation Global Grants',
    amount: 30000,
    amountINR: 25.0,
    eligibility: {
      gpaMin: 7.5,
      country: 'India',
      course: 'Water Sanitation, Economy, STEM, Education'
    },
    deadline: 'Apr 15',
    requirements: [
      'Study must focus on localized humanitarian development',
      'Sponsorship from a Rotary club in India and host country'
    ],
    description: 'Provides substantial funding for graduate-level study abroad with strong community development or health/safety impact.'
  }
];

export const VISA_SCENARIOS = [
  {
    question: 'Why did you choose this university specifically over other options?',
    tip: 'Highlight core faculty research, specific course components that match your aspirations, and avoid sounding scripted. Mention specific professors or labs if possible.',
    suggestedStructure: 'I chose [University] because of its highly structured [Program] which features courses like [Course1] and [Course2]. Furthermore, Professor [Name] is conducting research in [Field], which aligns perfectly with my previous project on...'
  },
  {
    question: 'How do you plan to fund your education and living expenses abroad?',
    tip: 'Be absolutely precise about numbers. State your financial components clearly: education loans, family savings, liquid funds, and collateral references. Show clear backup reserves.',
    suggestedStructure: 'The total cost is [Amount]. I have secured an education loan from [Bank] of [Amount INR], and my parents are sponsoring the remaining amount, backed by liquid savings of [Savings INR].'
  },
  {
    question: 'What are your plans after completing your MS? Will you stay in the host country?',
    tip: 'Always declare clear, strong ties to India (family business, specific Indian hiring hubs like Bangalore/Hyderabad, or industry boom in India). The visa officer must be convinced you will return.',
    suggestedStructure: 'Post-graduation, I intend to return to India and apply for roles like AI Research Engineer in Indian tech hubs like Bangalore. With the exponential boom in Indias GCCs and AI setups, firms like Flipkart, TCS Research, and early startups are highly appealing...'
  }
];
