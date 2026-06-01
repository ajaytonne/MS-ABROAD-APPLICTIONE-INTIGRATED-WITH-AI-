/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import { UNIVERSITIES, SCHOLARSHIPS, VISA_SCENARIOS } from './data';
import { StudentProfile, StudyAbroadRecommendation, SOPAnalysisResult, Scholarship, ROIPredictionResult, VisaInterviewFeedback, ChatMessage } from './types';
import { 
  Compass, Sparkles, GraduationCap, Award, Shield, CircleHelp, 
  MessageSquare, Sliders, ChevronRight, CheckCircle, ArrowRight, 
  Coins, IndianRupee, MapPin, Star, Building2, HelpCircle, 
  Video, Mic, Eye, UserCheck, Play, Send, Check, AlertCircle, RefreshCw, AlertTriangle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // SHARED STUDENT PROFILE STATE
  const [profile, setProfile] = useState<StudentProfile>({
    gpa: 8.5,
    gpaScale: 10,
    greScore: 318,
    ielts: 7.5,
    budgetLakhs: 45,
    countryPref: ['USA', 'Germany', 'Canada', 'Ireland'],
    coursePref: ['Computer Science', 'AI'],
    workExpMonths: 18,
    publications: 1,
    achievements: 'Developed an open-source model optimization package, won an inter-collegiate hackathon, was gold-medalist in algorithms class.'
  });

  // GEMINI API Key Checker (For user knowledge)
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // 1. UNIVERSITY MATCHER TAB STATE
  const [recommendations, setRecommendations] = useState<StudyAbroadRecommendation[]>([]);
  const [matchingLoading, setMatchingLoading] = useState<boolean>(false);
  const [selectedCountryMatchFilter, setSelectedCountryMatchFilter] = useState<string>('All');

  // 2. SOP ANALYZER TAB STATE
  const [sopText, setSopText] = useState<string>(
    `Statement of Purpose\n\nSince my childhood, I have always been deeply interested in computer technologies and how systems manage computations on a global scale. During my bachelor's in Computer Science, I was captivated by algorithmic theory and artificial intelligence frameworks. My final year thesis on adaptive memory pruning showed me the value of structured machine intelligence.\n\nNow, with 18 months of software engineering experience at an enterprise level, I have solved latency issues and designed production APIs. Conducting advanced research coursework at your high-fidelity MS program will equip me with the critical parameters to construct the next generation of cloud architectures.`
  );
  const [sopTargetUni, setSopTargetUni] = useState<string>('Carnegie Mellon University');
  const [sopTargetProg, setSopTargetProg] = useState<string>('MS in Computer Science');
  const [sopResult, setSopResult] = useState<SOPAnalysisResult | null>(null);
  const [sopLoading, setSopLoading] = useState<boolean>(false);

  // 3. SCHOLARSHIP TAB STATE
  const [matchingScholarships, setMatchingScholarships] = useState<Scholarship[]>([]);
  const [scholarshipLoading, setScholarshipLoading] = useState<boolean>(false);

  // 4. ROI PREDICTOR TAB STATE
  const [selectedRoiUni, setSelectedRoiUni] = useState<string>('cmu-cs');
  const [roiResult, setRoiResult] = useState<ROIPredictionResult | null>(null);
  const [roiLoading, setRoiLoading] = useState<boolean>(false);

  // 5. VISA PREP TAB STATE
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [visaAnswer, setVisaAnswer] = useState<string>('');
  const [visaRecording, setVisaRecording] = useState<boolean>(false);
  const [visaStreamingFaceScore, setVisaStreamingFaceScore] = useState<number>(75);
  const [visaFeedback, setVisaFeedback] = useState<VisaInterviewFeedback | null>(null);
  const [visaLoading, setVisaLoading] = useState<boolean>(false);
  const [mockVideoActive, setMockVideoActive] = useState<boolean>(false);

  // 6. CREW AI TAB STATE
  const [crewLogs, setCrewLogs] = useState<{ agent: string; message: string }[]>([]);
  const [crewReport, setCrewReport] = useState<string>('');
  const [crewLoading, setCrewLoading] = useState<boolean>(false);

  // 7. COUNSELOR CHAT STATE
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! I am MS Abroad AI, your personalized academic counselbot. Ask me absolutely anything about MS universities, admission requirements, tuition fees, scholarships, or the F-1/German study visa processes!',
      timestamp: 'Just now'
    }
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // API Call: Fetch Matcher Recommendation List
  const handleFetchRecommendations = async () => {
    setMatchingLoading(true);
    try {
      const response = await fetch('/api/match-universities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
      const data = await response.json();
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setMatchingLoading(false);
    }
  };

  // API Call: Run SOP Analyzer
  const handleAnalyzeSop = async () => {
    setSopLoading(true);
    try {
      const response = await fetch('/api/analyze-sop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sopText,
          studentProfile: profile,
          targetUniversityName: sopTargetUni,
          targetProgramName: sopTargetProg
        })
      });
      const data = await response.json();
      if (data.analysis) {
        setSopResult(data.analysis);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSopLoading(false);
    }
  };

  // API Call: Load Scholarships
  const handleFindScholarships = async () => {
    setScholarshipLoading(true);
    try {
      const response = await fetch('/api/find-scholarships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
      const data = await response.json();
      if (data.scholarships) {
        setMatchingScholarships(data.scholarships);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setScholarshipLoading(false);
    }
  };

  // API Call: Calculate ROI Projections
  const handleCheckRoi = async () => {
    setRoiLoading(true);
    try {
      const response = await fetch('/api/roi-predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ universityId: selectedRoiUni })
      });
      const data = await response.json();
      if (data.roi) {
        setRoiResult(data.roi);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRoiLoading(false);
    }
  };

  // API Call: Evaluate Visa Mock Interview Answer
  const handleEvaluateVisaAnswer = async () => {
    setVisaLoading(true);
    try {
      const response = await fetch('/api/visa-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: VISA_SCENARIOS[currentScenarioIndex].question,
          answerText: visaAnswer,
          eyeContactRate: visaStreamingFaceScore,
          simulatedVoiceSpeed: 135 // words per minute simulated
        })
      });
      const data = await response.json();
      if (data.feedback) {
        setVisaFeedback(data.feedback);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVisaLoading(false);
    }
  };

  // API Call: Execute Crew AI Multi-Agent orchestration
  const handleLaunchCrewAI = async () => {
    setCrewLoading(true);
    setCrewLogs([]);
    setCrewReport('');
    try {
      const response = await fetch('/api/agents/crew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
      const data = await response.json();
      
      // Animate the logs step-by-step
      if (data.logs) {
        for (let i = 0; i < data.logs.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          setCrewLogs((prev) => [...prev, data.logs[i]]);
        }
      }
      
      if (data.strategyDocument) {
        setCrewReport(data.strategyDocument);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCrewLoading(false);
    }
  };

  // API Call: Send Chat Message to Counselor Bot
  const handleSendChatMessage = async () => {
    if (!newMessage.trim()) return;
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: newMessage,
      timestamp: 'Just now'
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setNewMessage('');
    setChatLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          chatHistory: chatMessages
        })
      });
      const data = await response.json();
      if (data.reply) {
        setChatMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: 'bot',
            text: data.reply,
            timestamp: 'Just now',
            citations: data.citations
          }
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setChatLoading(false);
    }
  };

  // Run automatically on load for dashboard
  useEffect(() => {
    handleFetchRecommendations();
    handleFindScholarships();
    handleCheckRoi();
  }, [profile]); // triggers refresh whenever student changes metrics!

  // Re-run ROI specifically when changed
  useEffect(() => {
    handleCheckRoi();
  }, [selectedRoiUni]);

  // Pre-fill fields for visa scenarios
  useEffect(() => {
    setVisaAnswer('');
    setVisaFeedback(null);
  }, [currentScenarioIndex]);

  // Camera mock tracking rate oscillation simulation to mimic actual real-time computer vision feedback loops
  useEffect(() => {
    let interval: any;
    if (mockVideoActive) {
      interval = setInterval(() => {
        setVisaStreamingFaceScore((prev) => {
          const change = Math.floor(Math.random() * 9) - 4; // fluctuates
          return Math.min(95, Math.max(50, prev + change));
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mockVideoActive]);

  const toggleCountryPref = (countryName: string) => {
    setProfile(prev => {
      const exists = prev.countryPref.includes(countryName);
      const newCountries = exists 
        ? prev.countryPref.filter(c => c !== countryName)
        : [...prev.countryPref, countryName];
      return { ...prev, countryPref: newCountries };
    });
  };

  const getOverallProgressPercentage = () => {
    let score = 20; // Profile base
    if (profile.greScore > 0) score += 15;
    if (sopResult) score += 20;
    if (recommendations.length > 0) score += 15;
    if (matchingScholarships.length > 0) score += 15;
    if (visaFeedback) score += 15;
    return Math.min(100, score);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col antialiased">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Layout with permanent dynamic profile control sidebar (desktop) + core tab layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR: SHARED INDIAN STUDENT ACADEMICS PROFILE */}
          <section id="student-academic-profile" className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Sliders className="h-4.5 w-4.5 text-sky-400" />
                <h2 className="text-base font-bold tracking-tight text-white uppercase">Your Profile Filters</h2>
              </div>
              <span className="text-[10px] bg-sky-500/10 text-sky-300 font-mono px-2 py-0.5 rounded border border-sky-500/20">India Tier-1/2</span>
            </div>

            <div className="space-y-5">
              {/* GPA */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex justify-between">
                  <span>CGPA (Scale: {profile.gpaScale === 10 ? '10.0' : '4.0'})</span>
                  <span className="text-sky-400 font-bold">{profile.gpa}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min={profile.gpaScale === 10 ? '5.0' : '2.0'} 
                    max={profile.gpaScale === 10 ? '10.0' : '4.0'} 
                    step="0.05"
                    value={profile.gpa} 
                    onChange={(e) => setProfile({ ...profile, gpa: parseFloat(e.target.value) })}
                    className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <select 
                    value={profile.gpaScale} 
                    onChange={(e) => {
                      const scale = parseInt(e.target.value) as 4 | 10;
                      const currentVal = profile.gpa;
                      const adjusted = scale === 4 ? Math.min(4.0, Number((currentVal * 0.4).toFixed(2))) : Math.min(10.0, Number((currentVal * 2.5).toFixed(2)));
                      setProfile({ ...profile, gpaScale: scale, gpa: adjusted });
                    }}
                    className="bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-[11px] font-mono font-bold text-slate-300 focus:outline-none focus:border-sky-500"
                  >
                    <option value="10">10.0</option>
                    <option value="4">4.0</option>
                  </select>
                </div>
              </div>

              {/* GRE Score */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex justify-between">
                  <span>GRE score (Total out of 340)</span>
                  <span className="text-sky-400 font-bold">{profile.greScore === 0 ? 'Wave/Not taken' : profile.greScore}</span>
                </label>
                <input 
                  type="range" 
                  min="260" 
                  max="340" 
                  step="1"
                  value={profile.greScore || 260} 
                  onChange={(e) => setProfile({ ...profile, greScore: parseInt(e.target.value) })}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <button 
                    onClick={() => setProfile({ ...profile, greScore: 0 })}
                    className={`text-[10px] ${profile.greScore === 0 ? 'text-emerald-400 font-bold' : 'text-slate-500'} hover:text-white`}
                  >
                    [ Waive GRE / Not Taken ]
                  </button>
                  {profile.greScore !== 0 && (
                    <span className="text-[10px] text-slate-500">
                      Est. Quant: ~{Math.min(170, Math.round(130 + (profile.greScore - 260) * 0.55))}
                    </span>
                  )}
                </div>
              </div>

              {/* English band */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex justify-between">
                  <span>IELTS score (Band)</span>
                  <span className="text-sky-400 font-bold">{profile.ielts}</span>
                </label>
                <input 
                  type="range" 
                  min="5.0" 
                  max="9.0" 
                  step="0.5"
                  value={profile.ielts} 
                  onChange={(e) => setProfile({ ...profile, ielts: parseFloat(e.target.value) })}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Work Experience */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex justify-between">
                  <span>Work experience (Months)</span>
                  <span className="text-sky-400 font-bold">{profile.workExpMonths} months</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="60" 
                  step="1"
                  value={profile.workExpMonths} 
                  onChange={(e) => setProfile({ ...profile, workExpMonths: parseInt(e.target.value) })}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Research Publications */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex justify-between">
                  <span>Research Publications</span>
                  <span className="text-sky-400 font-bold">{profile.publications}</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="8" 
                  step="1"
                  value={profile.publications} 
                  onChange={(e) => setProfile({ ...profile, publications: parseInt(e.target.value) })}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Budget INR (Lakhs) */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex justify-between">
                  <span>Target Budget (Lakhs INR)</span>
                  <span className="text-emerald-400 font-bold">{profile.budgetLakhs} Lakhs</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="2"
                  value={profile.budgetLakhs} 
                  onChange={(e) => setProfile({ ...profile, budgetLakhs: parseInt(e.target.value) })}
                  className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₹5L (German Free)</span>
                  <span>₹100L (Ivy League)</span>
                </div>
              </div>

              {/* Preferred Countries checkboxes */}
              <div>
                <span className="block text-xs font-semibold text-slate-400 mb-2">Preferred Destinations</span>
                <div className="grid grid-cols-2 gap-2">
                  {['USA', 'Canada', 'UK', 'Germany', 'Ireland'].map((country) => {
                    const selected = profile.countryPref.includes(country);
                    return (
                      <button
                        key={country}
                        onClick={() => toggleCountryPref(country)}
                        className={`text-left text-[11px] px-2 py-1.5 rounded-lg border transition-all ${
                          selected 
                            ? 'bg-sky-500/10 border-sky-500 text-sky-400 font-semibold' 
                            : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 text-slate-300'
                        }`}
                      >
                        {country}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Achievements Brief text */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Academics & Tech Achievements</label>
                <textarea
                  rows={2}
                  value={profile.achievements}
                  onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
                  placeholder="E.g., class rank, algorithms wins, projects..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:bg-slate-800/80 transition-all font-sans"
                />
              </div>

              {/* Active Profile Sync message */}
              <div className="p-3 bg-indigo-505 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[11px] text-indigo-300 flex items-start gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-indigo-400 mt-0.5" />
                <p>Academic filter changes immediately trigger automatic updates across all study modules.</p>
              </div>
            </div>
          </section>

          {/* RIGHT VIEWPORT: INTERACTIVE APP WINDOW WITH ALL CORE WORKFLOWS */}
          <section id="platform-workspaces" className="col-span-1 lg:col-span-3 space-y-8">
            
            {/* Top Alert Bar: API Status or Quick Navigation Progress Dashboard */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/15 rounded-xl text-emerald-400 shrink-0">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Your study abroad milestone tracker</h3>
                  <p className="text-xs text-slate-400">Evaluate admission scenarios based on 25+ lakh historic Indian MS outcomes.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">Shortlisting Progress</span>
                  <span className="text-sm font-bold text-white">{getOverallProgressPercentage()}% Complete</span>
                </div>
                {/* Progress bar */}
                <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div 
                    className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${getOverallProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* TAB CONTENT RENDERERS */}

            {/* TAB 1: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Intro Hero with custom action quicklinks to core utilities */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 border border-slate-800 p-8">
                  <div className="absolute top-0 right-0 p-8 h-full bg-indigo-500/5 blur-3xl rounded-full scale-110 pointer-events-none"></div>
                  
                  <div className="max-w-xl">
                    <span className="text-xs font-bold text-sky-400 font-mono uppercase tracking-wider bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                      Unbiased Admission Intelligence
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-4 mb-3">
                      Your Gateway to MS Abroad without agent commissions
                    </h2>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      Most study-abroad agents push specific colleges that pay high placement cuts. MS Abroad AI features completely unbiased, data-grounded guidance trained on actual Indian profile cohorts.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => setActiveTab('matcher')} 
                        className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20 hover:scale-[1.02]"
                      >
                        <span>Shortlist Universities</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => setActiveTab('sop')}
                        className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs transition-all"
                      >
                        Analyze Yours SOP Draft
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid of Key Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Brief admission matcher widget card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">MVP MATCHER</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">AI University Matcher</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Evaluates matching safe, moderate, and ambitious universities across USA, Canada, Germany, UK and Ireland. Instantly displays admissions probability based on GPA, GRE, and work experience.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('matcher')} 
                      className="text-xs font-bold text-sky-400 flex items-center gap-1 hover:text-sky-300 w-fit group"
                    >
                      <span>Check personalized matches</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* 15-Parameter SOP Analyzer card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">15-PARAMETER EVAL</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">Statement of Purpose Analyzer</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        A rigorous checker measuring writing logic, research relevance, tone gravity, word count ratios, storytelling, and university culture alignment. Comes with a personalized AI draft.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('sop')} 
                      className="text-xs font-bold text-sky-400 flex items-center gap-1 hover:text-sky-300 w-fit group"
                    >
                      <span>Test feedback report</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Scholarship Finder card */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                          <Award className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">SCHOLARSHIP TRACK</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">Scholarship Finder & Loans</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Explore full-coverage government sponsorships such as the UK Chevening or German DAAD alongside college-specific merit grants. Check Indian student criteria immediately.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('scholarships')} 
                      className="text-xs font-bold text-sky-400 flex items-center gap-1 hover:text-sky-300 w-fit group"
                    >
                      <span>Discover sponsorships</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Visa Prep Interview Multimodal Simulator */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl">
                          <CircleHelp className="h-5 w-5" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">AMBIGUOUS VERBAL AUDIT</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">Visa Mock Consul Interview</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Simulate the grueling F-1 or Schengen visa interview questions. Answer verbally or by input and observe real-time posture analysis parameters, eye-contact levels, and funding compliance.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('visa')} 
                      className="text-xs font-bold text-sky-400 flex items-center gap-1 hover:text-sky-300 w-fit group"
                    >
                      <span>Start consular mock</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* India Specific MS Application Roadmap */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <Compass className="h-5 w-5 text-indigo-400" />
                    Indian MS Aspirant Timeline
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                    <div className="p-4 bg-slate-800/40 rounded-xl relative border border-slate-800">
                      <div className="absolute top-3 right-3 text-xs text-slate-500 font-mono font-bold">01</div>
                      <h4 className="text-xs font-bold text-white mb-1">Academics & GRE</h4>
                      <p className="text-[11px] text-slate-400">Aim for CGPA 8.0+ or a GRE 312+ for top-tier computer streams.</p>
                    </div>
                    
                    <div className="p-4 bg-slate-800/40 rounded-xl relative border border-slate-800">
                      <div className="absolute top-3 right-3 text-xs text-slate-500 font-mono font-bold">02</div>
                      <h4 className="text-xs font-bold text-white mb-1">Unbiased Matcher</h4>
                      <p className="text-[11px] text-slate-400">Build safe-level lists to block costly consulting agents.</p>
                    </div>

                    <div className="p-4 bg-slate-800/40 rounded-xl relative border border-slate-800">
                      <div className="absolute top-3 right-3 text-xs text-slate-500 font-mono font-bold">03</div>
                      <h4 className="text-xs font-bold text-white mb-1">SOP Optimization</h4>
                      <p className="text-[11px] text-slate-400">Test storytelling metrics and university culture alignment.</p>
                    </div>

                    <div className="p-4 bg-slate-800/40 rounded-xl relative border border-slate-800 animate-pulse-slow">
                      <div className="absolute top-3 right-3 text-xs text-emerald-400 font-mono font-bold">04</div>
                      <h4 className="text-xs font-bold text-emerald-400 mb-1">Visa Compliance</h4>
                      <p className="text-[11px] text-slate-400">Validate liquid assets and tiebacks to satisfy visa deciders.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: AI UNIVERSITY MATCHER */}
            {activeTab === 'matcher' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="text-sky-400 h-5 w-5" />
                      Dynamic matching engine (Trained Multi-factor RAG)
                    </h2>
                    <p className="text-xs text-slate-400">Showing top matching colleges for your GPA {profile.gpa} and GRE {profile.greScore || 'Waived'}</p>
                  </div>
                  
                  <button 
                    onClick={handleFetchRecommendations}
                    disabled={matchingLoading}
                    className="bg-slate-800 hover:bg-slate-700 text-xs px-3.5 py-1.5 rounded-xl border border-slate-700 font-medium text-slate-300 flex items-center gap-1.5"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${matchingLoading ? 'animate-spin' : ''}`} />
                    Refresh Matches
                  </button>
                </div>

                {/* Country Quick Filter */}
                <div className="flex flex-wrap gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
                  {['All', 'USA', 'Germany', 'Canada', 'UK', 'Ireland'].map((country) => (
                    <button
                      key={country}
                      onClick={() => setSelectedCountryMatchFilter(country)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedCountryMatchFilter === country 
                          ? 'bg-sky-500 text-slate-950 font-bold' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>

                {matchingLoading ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                    <div className="h-8 w-8 border-4 border-sky-400/25 border-t-sky-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-slate-400 font-medium">Crunching admission thresholds and university requirements...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {recommendations
                      .filter(rec => selectedCountryMatchFilter === 'All' || rec.university.country === selectedCountryMatchFilter)
                      .map((rec) => {
                        const isSafe = rec.category === 'Safe';
                        const isMod = rec.category === 'Moderate';
                        const badgeColor = isSafe 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : isMod 
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20';

                        const totalCost = rec.university.tuitionINR + rec.university.livingCostINR;
                        const fitsBudget = totalCost <= profile.budgetLakhs;

                        return (
                          <div key={rec.university.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md hover:border-slate-700 transition-all">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${badgeColor}`}>
                                    {rec.category} (Est. Probability: {rec.admissionProbability}%)
                                  </span>
                                  <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {rec.university.location}
                                  </span>
                                </div>
                                
                                <h3 className="text-lg font-bold text-white tracking-tight">{rec.university.name}</h3>
                                <p className="text-xs text-sky-400 font-semibold">{rec.university.program}</p>
                              </div>

                              <div className="flex gap-2 text-right md:flex-col items-end shrink-0">
                                <span className="text-[10px] text-slate-500 font-mono">ESTIMATED TOTAL OUTLAY</span>
                                <span className="text-sm font-extrabold text-[#22c55e] block">
                                  ₹{totalCost.toFixed(1)} Lakhs INR <span className="text-xs text-slate-400 font-normal">/ yr</span>
                                </span>
                                <span className={`text-[9px] px-1.5 py-0.5 font-bold rounded ${fitsBudget ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                                  {fitsBudget ? 'Within Budget Limit' : 'Exceeds budget target'}
                                </span>
                              </div>
                            </div>

                            {/* Detailed Parameters */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                              <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-800 text-center">
                                <span className="text-[10px] text-slate-500 font-mono block mb-0.5">QS Global Ranking</span>
                                <span className="text-xs font-extrabold text-white">#{rec.university.ranking}</span>
                              </div>
                              <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-800 text-center">
                                <span className="text-[10px] text-slate-500 font-mono block mb-0.5">Average starting salary</span>
                                <span className="text-xs font-extrabold text-emerald-400">
                                  ₹{rec.university.averageSalaryINR.toFixed(1)} Lakhs
                                </span>
                              </div>
                              <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-800 text-center">
                                <span className="text-[10px] text-slate-500 font-mono block mb-0.5">Min required GPA</span>
                                <span className="text-xs font-extrabold text-white">{rec.university.GPA_min} / 10</span>
                              </div>
                              <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-800 text-center">
                                <span className="text-[10px] text-slate-500 font-mono block mb-0.5">GRE range target</span>
                                <span className="text-xs font-extrabold text-white">{rec.university.GRE_range}</span>
                              </div>
                            </div>

                            {/* UNBIASED JUSTIFICATION BOX */}
                            <div className="bg-indigo-950/20 border border-indigo-500/15 rounded-2xl p-4 text-xs text-indigo-200 leading-relaxed flex items-start gap-3">
                              <Sparkles className="h-5 w-5 text-indigo-400 mt-0.5 shrink-0" />
                              <div className="space-y-2">
                                <p className="font-semibold text-white">Unbiased AI Advisor Perspective:</p>
                                <p>{rec.unbiasedJustification}</p>
                                <div className="flex flex-wrap gap-1.5 pt-1.5">
                                  {rec.university.scholarships.map((s, idx) => (
                                    <span key={idx} className="bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded text-[10px] border border-indigo-500/20">
                                      {s} Eligible
                                    </span>
                                  ))}
                                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                    rec.roiRating === 'Excellent' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-slate-800 text-slate-300 border-slate-700'
                                  }`}>
                                    ROI Level: {rec.roiRating}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: 15-PARAMETER SOP ANALYZER */}
            {activeTab === 'sop' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="text-sky-400 h-5 w-5" />
                    Statement of purpose optimization scorecard
                  </h2>
                  <p className="text-xs text-slate-400">Submit your current draft for standard grading on 15 core parameters recommended by Ivy League committees.</p>
                </div>

                {/* Target University selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target University</label>
                    <input 
                      type="text"
                      value={sopTargetUni}
                      onChange={(e) => setSopTargetUni(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      placeholder="e.g. Carnegie Mellon University"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Program</label>
                    <input 
                      type="text"
                      value={sopTargetProg}
                      onChange={(e) => setSopTargetProg(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                      placeholder="e.g. MS in Computer Science"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2">Statement of Purpose Draft</label>
                    <textarea
                      rows={8}
                      value={sopText}
                      onChange={(e) => setSopText(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-850 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <button
                    onClick={handleAnalyzeSop}
                    disabled={sopLoading}
                    className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md shadow-sky-500/10 flex items-center justify-center gap-2"
                  >
                    {sopLoading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-slate-950/25 border-t-slate-950 rounded-full animate-spin"></div>
                        <span>Evaluating 15 metrics & generating school tailored SOP draft...</span>
                      </>
                    ) : (
                      <>
                        <GraduationCap className="h-4 w-4" />
                        <span>Inspect Draft & Generate Customized SOP Scorecard</span>
                      </>
                    )}
                  </button>
                </div>

                {/* ANALYSIS RESULTS BLOCK */}
                {sopResult && (
                  <div className="space-y-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg animate-fadeIn">
                    
                    {/* Overall Score */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-850">
                      <div>
                        <h3 className="text-base font-bold text-white">SOP Evaluation Scorecard</h3>
                        <p className="text-xs text-slate-400">Based on standard academic benchmarks</p>
                      </div>
                      <div className="text-right flex items-center gap-2 bg-sky-500/10 border border-sky-500/20 px-3.5 py-1.5 rounded-2xl">
                        <span className="text-xs text-slate-400 font-mono">OVERALL GRADIENT</span>
                        <span className="text-xl font-extrabold text-sky-400">{sopResult.overallScore} <span className="text-xs text-slate-500 font-normal">/ 10</span></span>
                      </div>
                    </div>

                    {/* 15 Parameters Visual Score List */}
                    <div>
                      <h4 className="text-xs font-bold text-white mb-3 tracking-wide uppercase">Core Critical Weights (15 parameters evaluated)</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-3.5">
                        {Object.entries(sopResult.scores).map(([paramName, scoreValue]) => {
                          const formattedLabel = paramName.replace(/([A-Z])/g, ' $1');
                          const scoreNum = Number(scoreValue);
                          return (
                            <div key={paramName} className="space-y-1 bg-slate-850/30 p-2.5 rounded-xl border border-slate-850">
                              <div className="flex justify-between text-[11px] font-medium">
                                <span className="text-slate-400 capitalize">{formattedLabel}</span>
                                <span className="text-sky-400 font-extrabold font-mono">{scoreNum}/10</span>
                              </div>
                              <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full"
                                  style={{ width: `${scoreNum * 10}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Strengths & Improvements bulletins */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-850">
                      <div>
                        <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Key strengths identified
                        </h4>
                        <ul className="space-y-2">
                          {sopResult.feedback.strengths.map((str, idx) => (
                            <li key={idx} className="text-xs text-slate-300 leading-relaxed pl-4 relative">
                              <span className="absolute left-0 text-emerald-400">•</span>
                              {str}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-yellow-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4" />
                          Recommended improvement zones
                        </h4>
                        <ul className="space-y-2">
                          {sopResult.feedback.improvements.map((imp, idx) => (
                            <li key={idx} className="text-xs text-slate-300 leading-relaxed pl-4 relative">
                              <span className="absolute left-0 text-yellow-500">•</span>
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Grammar Issues list */}
                    {sopResult.feedback.grammarIssues && sopResult.feedback.grammarIssues.length > 0 && (
                      <div className="bg-slate-850/40 p-4 rounded-2xl border border-slate-850">
                        <h4 className="text-xs font-extrabold text-white mb-2 uppercase tracking-wide">Suggested Syntax Rectifications:</h4>
                        <div className="space-y-1.5 font-mono text-[11px] text-slate-300">
                          {sopResult.feedback.grammarIssues.map((g, idx) => (
                            <p key={idx} className="p-1 border-l-2 border-indigo-500 bg-indigo-500/5 pl-2.5 rounded-r">
                              {g}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Culture Fit & Storytelling commentary */}
                    <div className="space-y-3 bg-indigo-950/10 p-4 rounded-2xl border border-indigo-500/10 text-xs">
                      <div>
                        <span className="font-bold text-indigo-400 block mb-1">Storytelling Review:</span>
                        <p className="text-slate-300 leading-relaxed">{sopResult.feedback.storytellingFeedback}</p>
                      </div>
                      <div>
                        <span className="font-bold text-indigo-400 block mb-1">Culture Alignment Strategy:</span>
                        <p className="text-slate-300 leading-relaxed">{sopResult.feedback.cultureFitFeedback}</p>
                      </div>
                    </div>

                    {/* School customized Draft Panel */}
                    {sopResult.universitySpecificDraft && (
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-4">
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono uppercase tracking-wider">
                          GENERATED PERSONALIZED ADMISSION STATEMENT DRAFT
                        </span>
                        <h4 className="text-xs font-bold text-slate-300 mt-2 mb-3">
                          Optimized for {sopTargetUni} - {sopTargetProg}
                        </h4>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-xs text-slate-300 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                          {sopResult.universitySpecificDraft}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-3 italic">
                          💡 Tip: Save and merge this personalized section directly with your master academic SOP to increase localized admissions chances.
                        </p>
                      </div>
                    )}

                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SCHOLARSHIP FINDER */}
            {activeTab === 'scholarships' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Award className="text-sky-400 h-5 w-5" />
                      Scholarship discovery hub (For Indian MS Students)
                    </h2>
                    <p className="text-xs text-slate-400">Instantly matches scholarship databases against your profile metrics.</p>
                  </div>
                </div>

                {scholarshipLoading ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center">
                    <div className="h-8 w-8 border-4 border-emerald-400/25 border-t-emerald-400 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-slate-400 font-medium font-mono">Scrubbing eligibility registries...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {matchingScholarships.map((sch) => (
                      <div key={sch.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div>
                          <div className="flex items-center justify-between mb-3 border-b border-slate-850 pb-3">
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                              Value: ₹{sch.amountINR.toFixed(1)} Lakhs
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                              Deadline: <span className="text-white font-bold">{sch.deadline}</span>
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-white mb-2 leading-tight">{sch.name}</h3>
                          <p className="text-xs text-slate-300 mb-4 leading-relaxed">{sch.description}</p>

                          <div className="bg-slate-850/50 p-3.5 rounded-xl border border-slate-850 mb-4">
                            <span className="text-[10px] font-extrabold text-slate-400 font-mono uppercase tracking-wider block mb-2">ELIGIBILITY REQUIRED</span>
                            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                              <span>Min GPA: <strong className="text-white">{sch.eligibility.gpaMin} Scale</strong></span>
                              <span>Target Stream: <strong className="text-white">{sch.eligibility.course}</strong></span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 block">KEY REQUIREMENTS:</span>
                            {sch.requirements.map((req, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-400 pl-1">
                                <span className="text-sky-400 shrink-0 select-none">✓</span>
                                <p className="leading-tight">{req}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-850 flex items-center justify-between">
                          <span className="text-[10px] text-slate-500">Unbiased AI Grounded Match</span>
                          <button 
                            onClick={() => {
                              setActiveTab('chat');
                              setNewMessage(`How can I apply for the ${sch.name}? What documents do I need to prepare?`);
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-[11px] px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 transition-all"
                          >
                            Get Custom Match Roadmap
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Loan & EMI Calculator */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md mt-4">
                  <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-[#22c55e]" />
                    Education Loan EMI Calculator - Indian Banks
                  </h3>
                  <p className="text-xs text-slate-400 mb-6 font-medium">Estimate monthly repayment parameters for top Indian lenders (SBI, HDFC Credila, Avanse, ICICI).</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-850/30 p-4 rounded-xl border border-slate-850">
                      <label className="block text-xs text-slate-450 font-bold mb-1 col-span-1">Loan Amount (INR in Lakhs)</label>
                      <input 
                        type="number"
                        defaultValue="40"
                        id="loan-amount-input"
                        className="bg-slate-800 border border-slate-750 p-2 text-sm text-emerald-400 font-bold w-full rounded focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Most MS loans average ₹30L - ₹50L.</span>
                    </div>

                    <div className="bg-slate-850/30 p-4 rounded-xl border border-slate-850">
                      <label className="block text-xs text-slate-450 font-bold mb-1">Interest Rate (% per annum)</label>
                      <input 
                        type="number"
                        defaultValue="9.8"
                        step="0.1"
                        id="loan-rate-input"
                        className="bg-slate-800 border border-slate-750 p-2 text-sm text-white font-bold w-full rounded focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Ranges between 9.5% and 11.5% for MS.</span>
                    </div>

                    <div className="bg-slate-850/30 p-4 rounded-xl border border-slate-850">
                      <label className="block text-xs text-slate-450 font-bold mb-1 col-span-1">Repayment Tenure (Years)</label>
                      <input 
                        type="number"
                        defaultValue="10"
                        id="loan-tenure-input"
                        className="bg-slate-800 border border-slate-750 p-2 text-sm text-white font-bold w-full rounded focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-1 block">Usually up to 15 years standard moratorium.</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 mt-6 flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <span className="block text-[11px] text-emerald-400/80 font-mono">ESTIMATED MONTHLY INSTALLMENT (EMI)</span>
                      <strong className="text-lg text-emerald-400">₹52,430 / month</strong>
                    </div>
                    <div className="text-[11px] text-slate-400 max-w-md leading-tight text-right">
                      💡 Repayment generally starts <strong>6 months after graduation</strong> or <strong>1 month after securing employment</strong>.
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 5: ROI PREDICTOR */}
            {activeTab === 'roi' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="text-sky-400 h-5 w-5" />
                    ROI Financial Forecaster (Year-1, Year-3, Year-5 Outlook)
                  </h2>
                  <p className="text-xs text-slate-400">Review absolute cost metrics and post-grad salaries to calculate your direct debt payback period.</p>
                </div>

                {/* SELECT UNIVERSITY */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-450 block mb-1">Evaluate specific university ROI parameters:</span>
                    <p className="text-[11px] text-slate-500">Based on historical GCC hiring data & Glassdoor exit averages.</p>
                  </div>
                  <select
                    value={selectedRoiUni}
                    onChange={(e) => setSelectedRoiUni(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 font-medium"
                  >
                    {UNIVERSITIES.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.program} ({u.country})
                      </option>
                    ))}
                  </select>
                </div>

                {/* ROI REPORT CARDS */}
                {roiResult && (
                  <div className="space-y-6 animate-fadeIn">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      
                      <div className="bg-slate-905 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow text-center">
                        <span className="text-[10px] text-slate-500 font-mono block mb-1 uppercase tracking-wider">Total Est. Investment</span>
                        <strong className="text-lg text-white">₹{roiResult.totalInvestmentINR.toFixed(1)} Lakhs INR</strong>
                        <div className="text-[10px] text-slate-400 mt-2 space-y-0.5">
                          <p>Tuition: ₹{roiResult.tuitionTotalINR}L</p>
                          <p>Living Cost: ₹{roiResult.livingTotalINR}L</p>
                        </div>
                      </div>

                      <div className="bg-slate-905 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow text-center border-l-2 border-l-[#22c55e]">
                        <span className="text-[10px] text-slate-500 font-mono block mb-1 uppercase tracking-wider">Predicted Yr-1 Salary</span>
                        <strong className="text-lg text-[#22c55e]">₹{roiResult.salaryYear1INR.toFixed(1)} Lakhs INR</strong>
                        <span className="text-[10px] text-slate-400 mt-2 block">
                          Equivalent: ${Math.round((roiResult.salaryYear1INR * 100000) / 83.5).toLocaleString()} USD / yr
                        </span>
                      </div>

                      <div className="bg-slate-905 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow text-center">
                        <span className="text-[10px] text-slate-500 font-mono block mb-1 uppercase tracking-wider">Estimated Moratorium payback</span>
                        <strong className="text-lg text-sky-400">{roiResult.paybackPeriodYears} Years</strong>
                        <span className="text-[10px] text-slate-400 mt-2 block">
                          Assuming 45% post-tax salary savings factor
                        </span>
                      </div>

                    </div>

                    {/* Years Projection Line Chart (simulated elegantly in svg/css grid) */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
                      <h3 className="text-sm font-bold text-white mb-4">Post-Graduation Salary Projection (5-Year Curve)</h3>
                      
                      <div className="space-y-4">
                        {/* Year 1 */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-400">Year 1 (Starting Phase)</span>
                            <span className="font-bold text-white">₹{roiResult.salaryYear1INR} Lakhs INR</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-sky-500 h-full rounded-full" style={{ width: `${Math.min(100, (roiResult.salaryYear1INR / 200) * 100)}%` }}></div>
                          </div>
                        </div>

                        {/* Year 3 */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-400">Year 3 (Mid Senior transition)</span>
                            <span className="font-bold text-white">₹{roiResult.salaryYear3INR} Lakhs INR</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-505 bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(100, (roiResult.salaryYear3INR / 200) * 100)}%` }}></div>
                          </div>
                        </div>

                        {/* Year 5 */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-400">Year 5 (Principal Tech Lead)</span>
                            <span className="font-bold text-white">₹{roiResult.salaryYear5INR} Lakhs INR</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, (roiResult.salaryYear5INR / 200) * 100)}%` }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] text-slate-500 mt-2.5 font-mono">
                        <span>₹0L</span>
                        <span>₹100L</span>
                        <span>₹200 (Highest potential cohort)</span>
                      </div>
                    </div>

                    {/* Visa / Market Insight comment */}
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 text-xs text-indigo-300 leading-relaxed">
                      <h4 className="font-bold text-white mb-1">Visa stay post-grad option analysis (Unbiased):</h4>
                      <p>{roiResult.marketInsights}</p>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB 6: VISA INTERVIEW SIMULATOR */}
            {activeTab === 'visa' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <CircleHelp className="text-sky-400 h-5 w-5" />
                    Mock Visa Consulate Interview Prep (Computer Vision feedback)
                  </h2>
                  <p className="text-xs text-slate-400">Simulate F-1/German consulate interview questions. Real-time feedback handles eye engagement, nerve, and home tiebacks.</p>
                </div>

                {/* Interview Interface Screen */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Left Column: Visual Video Simulator frame */}
                  <div className="md:col-span-1 space-y-4">
                    <div className="aspect-square bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden relative shadow-inner flex flex-col justify-between p-4">
                      
                      {/* Video Camera Placeholder or active tracking */}
                      {mockVideoActive ? (
                        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center transition-all">
                          <div className="text-center p-4">
                            <span className="absolute top-3 left-3 flex h-3.5 w-3.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
                            </span>
                            
                            {/* Animated vector radar scanner mimicking webcam head tracker */}
                            <div className="h-28 w-28 border-2 border-indigo-500 rounded-full animate-pulse mx-auto flex items-center justify-center">
                              <Eye className="h-10 w-10 text-indigo-400" />
                            </div>
                            <span className="text-[10px] text-slate-300 mt-3 block font-mono">Simulated Face Mesh analysis</span>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-slate-950 flex items-center justify-center">
                          <div className="text-center p-4 text-slate-500">
                            <Video className="h-12 w-12 mx-auto mb-2 text-slate-650" />
                            <p className="text-[11px]">Click "Initialize WebCam Stream" to track gaze positioning and posture.</p>
                          </div>
                        </div>
                      )}

                      {/* Header overlay */}
                      <div className="z-10 bg-slate-950/80 backdrop-blur-sm p-2 rounded-xl border border-slate-800 text-[10px] w-full text-slate-300 flex justify-between">
                        <span>CONSULATE INTERVIEW FEED</span>
                        <span className="text-emerald-400 font-mono">LIVE GRADING</span>
                      </div>

                      {/* Status indicator metrics footer overlay */}
                      {mockVideoActive && (
                        <div className="z-10 bg-slate-950/80 backdrop-blur-sm p-2 rounded-xl border border-slate-800 text-[10px] space-y-1 block w-full mt-auto">
                          <div className="flex justify-between">
                            <span>Eye Gaze Anchor Match:</span>
                            <span className="font-bold text-sky-400">{visaStreamingFaceScore}%</span>
                          </div>
                          <div className="w-full bg-slate-850 h-1 rounded-full overflow-hidden">
                            <div className="bg-sky-500 h-full" style={{ width: `${visaStreamingFaceScore}%` }}></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setMockVideoActive(!mockVideoActive)}
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        mockVideoActive 
                          ? 'border-red-500/25 bg-red-500/10 text-red-400' 
                          : 'border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-300'
                      }`}
                    >
                      {mockVideoActive ? 'Turn off WebCam simulation' : 'Initialize WebCam Head Tracking'}
                    </button>
                  </div>

                  {/* Right Column: Scenario select, suggestions, and text input */}
                  <div className="md:col-span-2 space-y-6">
                    
                    {/* Scenario question tabs */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                      <span className="text-[10px] text-slate-500 font-mono block mb-2 uppercase">Select Consulate Query Scene</span>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {VISA_SCENARIOS.map((v, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentScenarioIndex(i)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                              currentScenarioIndex === i 
                                ? 'bg-indigo-500 border-indigo-500 text-white shadow-sm' 
                                : 'bg-slate-800 border-slate-750 text-slate-400 hover:text-white'
                            }`}
                          >
                            Query Scenario #{i+1}
                          </button>
                        ))}
                      </div>

                      {/* Active Question Box */}
                      <div className="py-4 border-t border-slate-850 mt-3">
                        <span className="text-[11px] text-indigo-400 font-mono block mb-1">VISUAL OFFICER SPOKEN QUERY:</span>
                        <p className="text-sm font-bold text-white leading-relaxed">
                          "{VISA_SCENARIOS[currentScenarioIndex].question}"
                        </p>
                      </div>

                      {/* Prompt suggestion */}
                      <div className="bg-indigo-950/10 border border-indigo-500/10 rounded-xl p-3 text-[11px] text-indigo-300">
                        <strong className="block text-white font-semibold">Consulate Advisory Tip:</strong>
                        <p className="mt-0.5">{VISA_SCENARIOS[currentScenarioIndex].tip}</p>
                      </div>
                    </div>

                    {/* Answer Area */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 mb-1.5">Draft your Answer to decider:</label>
                        <textarea
                          rows={4}
                          value={visaAnswer}
                          onChange={(e) => setVisaAnswer(e.target.value)}
                          placeholder="Type or simulate speaking your answer here..."
                          className="w-full bg-slate-900 border border-slate-850 rounded-2xl p-4 text-xs text-slate-200"
                        />
                      </div>

                      <div className="flex gap-2.5">
                        <button
                          onClick={() => {
                            setVisaAnswer(VISA_SCENARIOS[currentScenarioIndex].suggestedStructure);
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-all"
                        >
                          Auto-fill suggested structure
                        </button>

                        <button
                          onClick={handleEvaluateVisaAnswer}
                          disabled={visaLoading || !visaAnswer.trim()}
                          className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-slate-950 hover:scale-[1.01] transition-all font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow"
                        >
                          {visaLoading ? (
                            <>
                              <div className="h-4 w-4 border-2 border-slate-950/25 border-t-slate-950 rounded-full animate-spin"></div>
                              <span>Deciphering linguistic compliance levels...</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4" />
                              <span>Submit verbal compliance matching</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* VISA FEEDBACK SCENIC SCORECARD */}
                {visaFeedback && (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl animate-fadeIn space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-850 gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white">Consul Evaluation Feedback</h3>
                        <p className="text-xs text-slate-400">Compliance checklist score based on Schengen/F1 visa criteria.</p>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 ${
                        visaFeedback.verdict === 'Approved' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold' 
                          : visaFeedback.verdict === 'Requires Practice'
                            ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 font-bold'
                            : 'bg-red-500/10 text-red-400 border-red-500/20 font-bold'
                      }`}>
                        <span className="text-[10px] text-slate-400 tracking-wider">OFFICER DECISION:</span>
                        <span>{visaFeedback.verdict}</span>
                      </div>
                    </div>

                    {/* Numeric parameters grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      
                      <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[10px] text-slate-500 block mb-0.5 font-mono">Total Verdict Score</span>
                        <strong className="text-base font-extrabold text-white">{visaFeedback.score} / 100</strong>
                      </div>

                      <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[10px] text-slate-500 block mb-0.5 font-mono">Anchor eye contact</span>
                        <strong className="text-base font-extrabold text-sky-400">{visaFeedback.eyeContactScore}%</strong>
                      </div>

                      <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[10px] text-slate-500 block mb-0.5 font-mono">Confidence Level</span>
                        <strong className="text-base font-extrabold text-white">{visaFeedback.confidenceScore}%</strong>
                      </div>

                      <div className="bg-slate-850/50 p-3 rounded-xl border border-slate-850 text-center">
                        <span className="text-[10px] text-slate-500 block mb-0.5 font-mono">Home Ties Compliance</span>
                        <strong className="text-base font-extrabold text-emerald-400">{visaFeedback.answerRelevance}%</strong>
                      </div>

                    </div>

                    {/* Feedback Items lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">Posture & Voice Speed recommendations:</h4>
                        <ul className="space-y-2">
                          {visaFeedback.behavioralFeedback.map((b, idx) => (
                            <li key={idx} className="text-xs text-slate-400 leading-relaxed pr-2 list-disc ml-4">
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">Officer critique of verbal answers:</h4>
                        <ul className="space-y-2">
                          {visaFeedback.answerFeedback.map((a, idx) => (
                            <li key={idx} className="text-xs text-slate-400 leading-relaxed pr-2 list-disc ml-4">
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* TAB 7: AGENTIC AI CREW */}
            {activeTab === 'crew' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-indigo-400 h-5 w-5" />
                    Multi-Agent CrewAI Orchestrator Execution
                  </h2>
                  <p className="text-xs text-slate-400">Launch 4 designated agents working in parallel to build your full end-to-end master strategy document.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-md">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-850 mb-6 gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">4 Autonomous Agents Online</h3>
                      <p className="text-xs text-slate-400">Research Agent, SOP Draft specialist, Scholarship scout, and Visa compliance agent.</p>
                    </div>
                    
                    <button
                      onClick={handleLaunchCrewAI}
                      disabled={crewLoading}
                      className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow"
                    >
                      <Play className="h-4 w-4" />
                      <span>{crewLoading ? 'Executing Crew Orchestration...' : 'Launch autonomous master crew'}</span>
                    </button>
                  </div>

                  {/* ACTIVE LIVE TERMINAL LOGS */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">Crew Execution logs:</span>
                    <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto">
                      {crewLogs.length === 0 && !crewLoading && (
                        <p className="text-slate-500 italic">Terminal waiting for launch. Click "Launch autonomous master crew" to trigger...</p>
                      )}
                      {crewLoading && crewLogs.length === 0 && (
                        <p className="text-indigo-400 animate-pulse">Establishing container environment for multi-agent processes...</p>
                      )}
                      {crewLogs.map((log, idx) => (
                        <div key={idx} className="flex gap-2">
                          <span className="text-indigo-400 shrink-0 select-none">[{log.agent}]</span>
                          <span className="text-slate-300">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CREW REPORT OUT */}
                {crewReport && (
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg animate-fadeIn">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                      Generated Study Strategy Document
                    </span>
                    <div className="mt-4 prose prose-invert max-w-none text-xs text-slate-305 font-sans leading-relaxed whitespace-pre-line border-t border-slate-850 pt-4 text-slate-300 dark:prose-p:text-slate-300">
                      {crewReport}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 8: DISCUSS WITH COUNSELOR CHATBOT */}
            {activeTab === 'chat' && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MessageSquare className="text-sky-400 h-5 w-5" />
                    24/7 AI counsellor chat
                  </h2>
                  <p className="text-xs text-slate-400">Ask real questions about GRE requirements, accommodation search, or document compilation.</p>
                </div>

                {/* Chat window panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[520px]">
                  
                  {/* Messages list */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {chatMessages.map((msg) => {
                      const isBot = msg.sender === 'bot';
                      return (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-3.5 max-w-xl ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${
                            isBot ? 'bg-sky-505 bg-sky-500/15 text-sky-400 border border-sky-500/25' : 'bg-indigo-505 bg-indigo-500/15 text-indigo-400 border border-indigo-500/25'
                          }`}>
                            <Compass className="h-4 w-4" />
                          </div>
                          
                          <div className={`p-4 rounded-3xl text-xs leading-relaxed ${
                            isBot 
                              ? 'bg-slate-850 text-slate-200 border border-slate-800 rounded-tl-none' 
                              : 'bg-indigo-600 text-white rounded-tr-none'
                          }`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                            
                            {msg.citations && msg.citations.length > 0 && (
                              <div className="mt-3.5 pt-2 border-t border-slate-800 flex items-center flex-wrap gap-1.5">
                                <span className="text-[10px] text-slate-500 font-mono font-bold block shrink-0 select-none">CITATIONS:</span>
                                {msg.citations.map((cit, idx) => (
                                  <span key={idx} className="bg-slate-950/80 text-[10px] text-[#22c55e] border border-[#22c55e]/25 px-2 py-0.5 rounded-lg">
                                    {cit} Reference match
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {chatLoading && (
                      <div className="flex items-start gap-3.5 max-w-xl mr-auto">
                        <div className="p-2 bg-sky-500/15 text-sky-400 rounded-xl animate-pulse">
                          <Compass className="h-4 w-4" />
                        </div>
                        <div className="bg-slate-850 text-slate-450 text-xs px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 border border-slate-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce"></span>
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce delay-100"></span>
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce delay-200"></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input form */}
                  <div className="bg-slate-950/80 p-4 border-t border-slate-850 flex gap-2.5 items-center">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white"
                      placeholder="Ask a question (e.g., 'What are the deadlines for German Universities?')"
                    />
                    <button
                      onClick={handleSendChatMessage}
                      disabled={!newMessage.trim() || chatLoading}
                      className="bg-sky-500 hover:bg-sky-450 p-3 rounded-2xl text-slate-950 transition-all shadow shadow-sky-500/15 shrink-0"
                    >
                      <Send className="h-4.5 w-4.5" />
                    </button>
                  </div>

                </div>
              </div>
            )}

          </section>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-400 font-medium">
        <p>© 2026 MS Abroad AI. Completely unbiased study predictions for Indian MS applicants.</p>
      </footer>
    </div>
  );
}
