import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';
import { AutoResizeTextarea } from '../forms/AutoResizeTextarea';
import { Plus, Trash, ArrowUp, ArrowDown, Type, List, Heading, Italic } from 'lucide-react';
import { CustomBlockType } from '../../types';

export const FormWorkspace: React.FC = () => {
  const { 
    sections, 
    activeSectionId, 
    updateSection, 
    addListItem, 
    updateListItem, 
    removeListItem,
    addSkillItem,
    updateSkillItem,
    removeSkillItem,
    addCustomBlock,
    updateCustomBlock,
    removeCustomBlock,
    reorderCustomBlock
  } = useResumeStore();

  const activeSection = sections.find(s => s.id === activeSectionId);

  if (!activeSection) return <div className="p-8 text-center text-gray-500">Select a section to edit</div>;

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (activeSection.type !== 'custom') return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < activeSection.items.length) {
      reorderCustomBlock(activeSection.id, index, newIndex);
    }
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar bg-gray-50">
      <div className="max-w-3xl mx-auto p-8 pb-32">
        <div className="mb-6 flex justify-between items-center">
          <div className="flex-1 mr-4">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Section Title</label>
            <input
              type="text"
              value={activeSection.title}
              onChange={(e) => updateSection(activeSection.id, { title: e.target.value })}
              className="text-2xl font-bold bg-transparent border-none focus:ring-0 p-0 text-gray-800 placeholder-gray-300 w-full focus:outline-none"
              placeholder="e.g. Experience"
            />
          </div>
          <div className="flex gap-2">
            {/* We could add global section moving here if needed */}
          </div>
        </div>

        {/* --- Profile Form --- */}
        {activeSection.type === 'profile' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Full Name</label>
              <input
                className="input-field text-lg font-bold"
                value={activeSection.name}
                onChange={(e) => updateSection(activeSection.id, { name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                className="input-field"
                value={activeSection.email}
                onChange={(e) => updateSection(activeSection.id, { email: e.target.value })}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="label">Phone</label>
              <input
                className="input-field"
                value={activeSection.phone}
                onChange={(e) => updateSection(activeSection.id, { phone: e.target.value })}
                placeholder="+1 234 567 890"
              />
            </div>
            <div className="col-span-2">
              <label className="label">Links (Website / LinkedIn / Github)</label>
              <input
                className="input-field"
                value={activeSection.url}
                onChange={(e) => updateSection(activeSection.id, { url: e.target.value })}
                placeholder="linkedin.com/in/johndoe | github.com/johndoe"
              />
              <p className="text-xs text-gray-400 mt-1">Separate multiple links with |</p>
            </div>
          </div>
        )}

        {/* --- List Form (Experience / Education / Projects) --- */}
        {(activeSection.type === 'list' || activeSection.type === 'education' || activeSection.type === 'projects') && (
          <div className="space-y-6">
            {activeSection.items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 group relative">
                <button 
                  onClick={() => removeListItem(activeSection.id, item.id)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash size={16} />
                </button>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  {/* Title Field */}
                  <div className="col-span-2 md:col-span-1">
                    <label className="label">
                      {activeSection.type === 'projects' ? 'Project Name' : 
                       activeSection.type === 'education' ? 'Institution' : 'Organization'}
                    </label>
                    <input
                      className="input-field font-semibold"
                      value={item.title}
                      onChange={(e) => updateListItem(activeSection.id, item.id, { title: e.target.value })}
                      placeholder={activeSection.type === 'projects' ? "e.g. Personal Portfolio" : "e.g. Google"}
                    />
                  </div>
                  
                  {/* Date Field (Hidden for Projects) */}
                  {activeSection.type !== 'projects' && (
                    <div className="col-span-2 md:col-span-1">
                      <label className="label">Date Range</label>
                      <input
                        className="input-field text-right"
                        value={item.date}
                        onChange={(e) => updateListItem(activeSection.id, item.id, { date: e.target.value })}
                        placeholder="Jan 2020 - Present"
                      />
                    </div>
                  )}

                  {/* Subtitle Field */}
                  <div className="col-span-2">
                    <label className="label">
                      {activeSection.type === 'projects' ? 'Languages / Technologies Used' : 
                       activeSection.type === 'education' ? 'Degree / Field of Study' : 'Role'}
                    </label>
                    <input
                      className="input-field"
                      value={item.subtitle}
                      onChange={(e) => updateListItem(activeSection.id, item.id, { subtitle: e.target.value })}
                      placeholder={activeSection.type === 'projects' ? "React, Node.js, MongoDB" : "Senior Software Engineer"}
                    />
                  </div>
                </div>
                <div>
                  <label className="label">Description</label>
                  <AutoResizeTextarea
                    className="input-field min-h-[80px] text-sm leading-relaxed"
                    value={item.description}
                    onChange={(e) => updateListItem(activeSection.id, item.id, { description: e.target.value })}
                    placeholder="• Achieved X by doing Y..."
                  />
                  <p className="text-xs text-gray-400 mt-1">Each line becomes a bullet point.</p>
                </div>
              </div>
            ))}
            <button
              onClick={() => addListItem(activeSection.id)}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add Entry
            </button>
          </div>
        )}

        {/* --- Skills Form --- */}
        {activeSection.type === 'skills' && (
          <div className="space-y-4">
             {activeSection.items.map((item) => (
              <div key={item.id} className="flex gap-3 items-start bg-white p-3 rounded border border-gray-200">
                 <div className="w-1/3">
                    <label className="label">Category</label>
                    <input
                      className="input-field font-semibold"
                      value={item.category}
                      onChange={(e) => updateSkillItem(activeSection.id, item.id, { category: e.target.value })}
                      placeholder="Languages"
                    />
                 </div>
                 <div className="flex-1">
                    <label className="label">Skills List</label>
                    <AutoResizeTextarea
                      className="input-field"
                      value={item.items}
                      onChange={(e) => updateSkillItem(activeSection.id, item.id, { items: e.target.value })}
                      placeholder="Java, Python, C++"
                    />
                 </div>
                 <button 
                  onClick={() => removeSkillItem(activeSection.id, item.id)}
                  className="mt-6 text-gray-400 hover:text-red-500"
                >
                  <Trash size={16} />
                </button>
              </div>
             ))}
             <button
              onClick={() => addSkillItem(activeSection.id)}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              + Add Skill Category
            </button>
          </div>
        )}

        {/* --- Custom Block Builder --- */}
        {activeSection.type === 'custom' && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
               <p className="text-sm text-blue-800 font-medium mb-3">Add a generic block:</p>
               <div className="grid grid-cols-4 gap-2">
                 <button onClick={() => addCustomBlock(activeSection.id, 'heading')} className="block-btn">
                   <Heading size={16} /> Heading
                 </button>
                 <button onClick={() => addCustomBlock(activeSection.id, 'subtitle')} className="block-btn">
                   <Italic size={16} /> Subtitle
                 </button>
                 <button onClick={() => addCustomBlock(activeSection.id, 'list')} className="block-btn">
                   <List size={16} /> List
                 </button>
                 <button onClick={() => addCustomBlock(activeSection.id, 'text')} className="block-btn">
                   <Type size={16} /> Text
                 </button>
               </div>
            </div>

            {activeSection.items.map((block, index) => (
              <div key={block.id} className="relative group bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveBlock(index, 'up')} className="p-1 text-gray-400 hover:text-gray-600"><ArrowUp size={14} /></button>
                  <button onClick={() => moveBlock(index, 'down')} className="p-1 text-gray-400 hover:text-gray-600"><ArrowDown size={14} /></button>
                  <button onClick={() => removeCustomBlock(activeSection.id, block.id)} className="p-1 text-gray-400 hover:text-red-500"><Trash size={14} /></button>
                </div>
                
                <div className="mb-1">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                     {block.type}
                   </span>
                </div>

                <div className="flex gap-2">
                  <AutoResizeTextarea
                    className={`w-full bg-transparent border-none focus:ring-0 p-0 resize-none ${
                      block.type === 'heading' ? 'font-bold text-lg' : 
                      block.type === 'subtitle' ? 'font-semibold italic text-gray-600' :
                      block.type === 'list' ? 'text-sm' : 'text-sm'
                    }`}
                    value={block.content}
                    onChange={(e) => updateCustomBlock(activeSection.id, block.id, { content: e.target.value })}
                    placeholder={
                      block.type === 'heading' ? "Enter Heading..." :
                      block.type === 'subtitle' ? "Enter Subtitle..." :
                      block.type === 'list' ? "• Item 1\n• Item 2" : "Enter text..."
                    }
                  />
                  {block.type === 'subtitle' && (
                    <input 
                      type="text"
                      className="w-1/3 border-b border-gray-300 text-sm text-right focus:outline-none focus:border-blue-500 placeholder-gray-300"
                      placeholder="Date (Optional)"
                      value={block.date || ''}
                      onChange={(e) => updateCustomBlock(activeSection.id, block.id, { date: e.target.value })}
                    />
                  )}
                </div>
              </div>
            ))}
            
            {activeSection.items.length === 0 && (
              <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                Add blocks above to build your custom section
              </div>
            )}
          </div>
        )}

      </div>
      
      {/* Styles for this component's inputs */}
      <style>{`
        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
        }
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          color: #1e293b;
          transition: all 0.2s;
        }
        .input-field:focus {
          outline: none;
          background-color: #fff;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .block-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem;
          background-color: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          color: #475569;
          transition: all 0.2s;
        }
        .block-btn:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }
      `}</style>
    </div>
  );
};