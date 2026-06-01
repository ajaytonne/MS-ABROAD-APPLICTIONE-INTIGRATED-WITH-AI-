/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, Sparkles, MessageSquare, Compass, Award, CircleHelp, Shield } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'matcher', label: 'AI Matcher', icon: Sparkles },
    { id: 'sop', label: 'SOP Analyzer', icon: GraduationCap },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'roi', label: 'ROI Predictor', icon: Shield },
    { id: 'visa', label: 'Visa Interview', icon: CircleHelp },
    { id: 'crew', label: 'Agentic Crew', icon: Sparkles },
    { id: 'chat', label: 'Ask Counselor', icon: MessageSquare }
  ];

  return (
    <header id="main-header" className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-xl text-white shadow-lg shadow-sky-500/10">
              <GraduationCap className="h-6 w-6" id="logo-icon" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                MS Abroad <span className="text-xs bg-sky-500/10 text-sky-400 font-medium px-2 py-0.5 rounded-full border border-sky-500/20">AI</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">UNBIASED INDIA-SPECIFIC PORTAL</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/15'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* User Info / Banner */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-xs font-semibold text-slate-300">ajaytonnenew2005@gmail.com</span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE PRO ACCOUNT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Rail */}
      <div className="lg:hidden border-t border-slate-800 bg-slate-900/95 overflow-x-auto whitespace-nowrap scrollbar-none py-2 px-4 shadow-inner">
        <div className="flex items-center gap-1.5">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`mobile-nav-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-sky-500 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
