import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Type, 
  Code,
  Trash2, 
  GripVertical 
} from 'lucide-react';
import { SectionType } from '../../types';

interface Props {
  onClose?: () => void;
}

export const Sidebar: React.FC<Props> = ({ onClose }) => {
  const { sections, activeSectionId, setActiveSection, addSection, removeSection } = useResumeStore();

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    if (onClose) onClose();
  };

  const handleAddSection = (type: SectionType) => {
    addSection(type);
    if (onClose) onClose();
  };

  const getIcon = (type: SectionType) => {
    switch (type) {
      case 'profile': return <User size={16} />;
      case 'list': return <Briefcase size={16} />;
      case 'education': return <GraduationCap size={16} />;
      case 'skills': return <Wrench size={16} />;
      case 'projects': return <Code size={16} />;
      default: return <Type size={16} />;
    }
  };

  return (
    <div className="w-full h-full bg-slate-900 text-slate-300 flex flex-col">
      <div className="p-4 border-b border-slate-700 shrink-0">
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-blue-500">Resu</span>Flow
        </h1>
        <p className="text-xs text-slate-500 mt-1">Visual Architect</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`
              group flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all
              ${activeSectionId === section.id ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800'}
            `}
          >
            <GripVertical size={14} className="text-slate-600 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className={activeSectionId === section.id ? 'text-blue-200' : 'text-slate-500'}>
              {getIcon(section.type)}
            </span>
            <span className="flex-1 font-medium text-sm truncate">{section.title}</span>
            {sections.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSection(section.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-900 shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => handleAddSection('list')} className="flex items-center justify-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded text-xs transition-colors">
            <Briefcase size={14} /> Work
          </button>
          <button onClick={() => handleAddSection('education')} className="flex items-center justify-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded text-xs transition-colors">
            <GraduationCap size={14} /> Edu
          </button>
          <button onClick={() => handleAddSection('projects')} className="flex items-center justify-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded text-xs transition-colors">
            <Code size={14} /> Project
          </button>
          <button onClick={() => handleAddSection('skills')} className="flex items-center justify-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded text-xs transition-colors">
            <Wrench size={14} /> Skills
          </button>
          <button onClick={() => handleAddSection('custom')} className="col-span-2 flex items-center justify-center gap-2 p-2 bg-slate-800 hover:bg-slate-700 rounded text-xs transition-colors">
            <Type size={14} /> Custom
          </button>
        </div>
      </div>
    </div>
  );
};