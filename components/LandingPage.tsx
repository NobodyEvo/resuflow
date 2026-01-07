import React from 'react';
import { FileText, CheckCircle, Zap, ArrowRight } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
       {/* Navigation */}
       <nav className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
          <div className="text-2xl font-bold flex items-center gap-2">
            <span className="text-blue-600">Resu</span>Flow
          </div>
          <button 
            onClick={onStart}
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            Go to Editor
          </button>
       </nav>

       {/* Hero Section */}
       <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-20">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
                <Zap size={14} /> Intelligent Resume Architect
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-900">
               Build your resume <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                 in real-time.
               </span>
             </h1>
             
             <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
               Stop wrestling with Word documents. Use our split-screen editor to write content on the left and see the formatted result on the right instantly.
             </p>
             
             <button 
               onClick={onStart}
               className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
             >
               Build Your Resume
               <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </button>

             {/* Minimal Features */}
             <div className="grid md:grid-cols-3 gap-6 mt-20 text-left">
                <FeatureCard 
                  icon={<FileText size={20} />}
                  title="Live Preview"
                  desc="See changes instantly. No guesswork."
                />
                <FeatureCard 
                  icon={<CheckCircle size={20} />}
                  title="ATS Ready"
                  desc="Standard formatting that passes filters."
                />
                <FeatureCard 
                  icon={<Zap size={20} />}
                  title="Instant PDF"
                  desc="Export high-quality PDFs in one click."
                />
             </div>
          </div>
       </main>
       
       <footer className="py-6 text-center text-slate-400 text-sm">
         © {new Date().getFullYear()} ResuFlow. All rights reserved.
       </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-md font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);