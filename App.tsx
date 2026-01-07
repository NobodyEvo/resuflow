import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { FormWorkspace } from './components/layout/FormWorkspace';
import { LivePreview } from './components/layout/LivePreview';
import { LandingPage } from './components/LandingPage';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'builder'>('landing');

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('builder')} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-slate-900 font-sans" id="app-root">
      {/* Left Pane: Sidebar (Fixed Width) */}
      <div className="w-64 flex-shrink-0 z-20 border-r border-slate-700">
        <Sidebar />
      </div>

      {/* Middle Pane: Workspace (Flexible) */}
      <div className="flex-1 flex flex-col min-w-[350px] z-10 shadow-lg relative">
        <FormWorkspace />
      </div>

      {/* Right Pane: Preview (Flexible, adjusts to screen) */}
      <div className="flex-1 min-w-[400px] bg-gray-800 hidden xl:block">
        <LivePreview />
      </div>

      {/* Mobile/Tablet Helper: Show a button to view preview if hidden */}
      <div className="xl:hidden fixed bottom-4 right-4 z-50">
         <button 
           onClick={() => window.print()}
           className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
           title="Preview PDF"
         >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
         </button>
      </div>
    </div>
  );
};

export default App;