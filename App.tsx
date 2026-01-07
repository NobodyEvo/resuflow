import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { FormWorkspace } from './components/layout/FormWorkspace';
import { LivePreview } from './components/layout/LivePreview';
import { LandingPage } from './components/LandingPage';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'builder'>('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('builder')} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-slate-900 font-sans relative" id="app-root">
      
      {/* --- Mobile Header --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-slate-900 border-b border-slate-700 z-30 flex items-center px-4 justify-between shrink-0">
        <div className="text-lg font-bold text-white flex items-center gap-2">
           <span className="text-blue-500">Resu</span>Flow
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="p-2 text-slate-300 hover:text-white transition-colors"
        >
            <Menu size={24} />
        </button>
      </div>

      {/* --- Sidebar (Drawer on Mobile, Fixed on Desktop) --- */}
      {/* Overlay Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-700 shadow-xl transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:shadow-none md:z-20
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Close Button (Inside Sidebar) */}
        <div className="md:hidden absolute top-3 right-3 z-50">
           <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white">
             <X size={20} />
           </button>
        </div>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* --- Middle Pane: Workspace --- */}
      <div className="flex-1 flex flex-col min-w-0 z-10 shadow-lg relative pt-14 md:pt-0 bg-gray-50">
        <FormWorkspace />
      </div>

      {/* --- Right Pane: Preview (Desktop Only) --- */}
      <div className="flex-1 min-w-[400px] bg-gray-800 hidden xl:block border-l border-gray-600">
        <LivePreview />
      </div>

      {/* --- Mobile Floating Action Button (Preview PDF) --- */}
      <div className="xl:hidden fixed bottom-6 right-6 z-30">
         <button 
           onClick={() => window.print()}
           className="bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center"
           title="Preview/Export PDF"
         >
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
         </button>
      </div>
    </div>
  );
};

export default App;