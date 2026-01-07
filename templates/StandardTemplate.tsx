import React from 'react';
import { ResumeState } from '../types';

export const StandardTemplate: React.FC<{ data: ResumeState['sections'] }> = ({ data }) => {
  const profile = data.find(s => s.type === 'profile') as any;

  // Render text with newlines as bullet points if it looks like a list
  const renderDescription = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    // If only one line, return as text
    if (lines.length === 1 && !lines[0].startsWith('•') && !lines[0].startsWith('-')) {
       return <p className="text-sm mt-1 text-gray-800 leading-snug">{lines[0]}</p>;
    }

    return (
      <ul className="list-disc ml-4 mt-1 space-y-0.5">
        {lines.map((line, idx) => (
          <li key={idx} className="text-[13px] text-gray-800 leading-snug pl-1">
            {line.replace(/^[•-]\s*/, '')}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-8 max-w-[210mm] mx-auto bg-white min-h-[297mm] font-serif text-gray-900" id="resume-document">
      {/* --- Header --- */}
      {profile && (
        <header className="text-center mb-6">
          <h1 className="text-3xl font-normal text-gray-900 mb-1">{profile.name}</h1>
          <div className="text-sm text-gray-600 flex justify-center gap-3 flex-wrap">
            {profile.email && <span>{profile.email}</span>}
            {profile.email && profile.phone && <span>|</span>}
            {profile.phone && <span>{profile.phone}</span>}
          </div>
          {profile.url && (
            <div className="text-sm text-blue-800 mt-1">
              {profile.url}
            </div>
          )}
          {profile.summary && (
             <p className="mt-3 text-sm text-left">{profile.summary}</p>
          )}
        </header>
      )}

      {/* --- Sections --- */}
      <div className="space-y-5">
        {data.filter(s => s.type !== 'profile').map((section) => {
          if (!section.isVisible) return null;

          return (
            <section key={section.id}>
              {/* Section Header */}
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-400 pb-1 mb-3 uppercase tracking-wide">
                {section.title}
              </h2>

              {/* Skills Layout */}
              {section.type === 'skills' && (
                <div className="space-y-1">
                  {section.items.map(skill => (
                    <div key={skill.id} className="text-sm">
                      <span className="font-bold">{skill.category}: </span>
                      <span className="text-gray-800">{skill.items}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience / Education / Projects Layout */}
              {(section.type === 'list' || section.type === 'education' || section.type === 'projects') && (
                <div className="space-y-4">
                  {section.items.map(item => (
                    <div key={item.id}>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-md font-bold text-gray-900">{item.title}</h3>
                        {/* Only show date if it's not a Project section (or if date exists) */}
                        {section.type !== 'projects' && item.date && (
                          <span className="text-sm text-gray-600 font-medium italic min-w-fit pl-4">{item.date}</span>
                        )}
                      </div>
                      {item.subtitle && (
                         <div className="text-sm font-semibold italic text-blue-900 mb-0.5">{item.subtitle}</div>
                      )}
                      {renderDescription(item.description)}
                    </div>
                  ))}
                </div>
              )}

              {/* Custom Block Layout */}
              {section.type === 'custom' && (
                <div className="space-y-2">
                  {section.items.map(block => (
                    <div key={block.id}>
                      {block.type === 'heading' && (
                        <h3 className="text-md font-bold text-gray-900 mt-2">{block.content}</h3>
                      )}
                      {block.type === 'subtitle' && (
                         <div className="flex justify-between items-baseline mb-0.5">
                            <div className="text-sm font-semibold italic text-blue-900">{block.content}</div>
                            {block.date && <span className="text-sm text-gray-600 font-medium italic min-w-fit pl-4">{block.date}</span>}
                         </div>
                      )}
                      {block.type === 'text' && (
                         <div className="text-sm whitespace-pre-wrap leading-relaxed">{block.content}</div>
                      )}
                      {block.type === 'list' && (
                         renderDescription(block.content)
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
};