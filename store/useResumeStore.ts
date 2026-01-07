import { create } from 'zustand';
import { ResumeState, ResumeSection, SectionType, CustomBlockType, CustomBlock } from '../types';

const INITIAL_DATA: ResumeSection[] = [
  {
    id: 'sec_profile',
    type: 'profile',
    title: 'Personal Info',
    isVisible: true,
    name: 'Ashish Pratap Singh',
    email: 'xxx@gmail.com',
    phone: 'XXX-XXX-XXX',
    url: 'github.com/ashishps1 | linkedin.com/in/ashishps1',
    summary: ''
  },
  {
    id: 'sec_skills',
    type: 'skills',
    title: 'Skills',
    isVisible: true,
    items: [
      { id: 'sk_1', category: 'Languages', items: 'C/C++, Java, Python, JavaScript, C#, SQL' }
    ]
  },
  {
    id: 'sec_exp',
    type: 'list',
    title: 'Work Experience',
    isVisible: true,
    items: [
      {
        id: 'exp_1',
        title: 'Talktek Technologies',
        subtitle: 'Business Development Executive (Internship)',
        date: 'Apr 2024 - Jul 2024',
        description: 'Engineered complex Boolean search strings on LinkedIn to pinpoint niche talent and potential clients, increasing the relevant profile discovery rate by 30% and ensuring high candidate quality.\nStreamlined the sourcing pipeline by utilizing social media platforms to cross-reference data and filter high-relevance profiles, reducing manual screening time for senior executives by 15 hours monthly.\nTech/Skills: LinkedIn Recruiter, Sales Navigator, Social Media Mining, Market Research, Talent Sourcing, Cold Outreach, MS Excel.'
      }
    ]
  },
  {
    id: 'sec_edu',
    type: 'education',
    title: 'Education',
    isVisible: true,
    items: [
      {
        id: 'edu_1',
        title: 'Shivaji University',
        subtitle: 'Bachelor’s in Computer Science',
        date: 'Jun 2023 - May 2026',
        description: 'Relevant Coursework: Object Oriented Programming, Databases, Discrete Maths, Data Structures and Algorithms, Operating Systems, Computer Networks, Software Engineering, Software Project Management.'
      }
    ]
  },
  {
    id: 'sec_proj',
    type: 'projects',
    title: 'Projects',
    isVisible: true,
    items: [
      {
        id: 'proj_1',
        title: 'Grocify (Smart Grocery Web Application)',
        subtitle: 'C#, ASP.NET Web Forms, Microsoft SQL Server',
        date: '',
        description: 'Developed a full-stack e-commerce application for online grocery shopping with separate Admin and Customer modules.\nDesigned a normalized relational database to manage complex inventory hierarchies (Categories, Subcategories, and Specifications).\nImplemented a "Recipe-Aware" product catalog that maps ingredients to specific cuisines (Indian, International) for smarter shopping.\nIntegrated secure role-based authentication using ASP.NET Session state and created dynamic, data-driven user interfaces using DataLists and GridViews.'
      }
    ]
  }
];

export const useResumeStore = create<ResumeState>((set) => ({
  sections: INITIAL_DATA,
  activeSectionId: 'sec_profile',

  setActiveSection: (id) => set({ activeSectionId: id }),

  updateSection: (id, data) => set((state) => ({
    sections: state.sections.map((sec) => (sec.id === id ? { ...sec, ...data } : sec))
  })),

  addSection: (type) => set((state) => {
    const newId = `sec_${Math.random().toString(36).substr(2, 9)}`;
    const base = { id: newId, title: 'New Section', isVisible: true, type };
    let newSection: ResumeSection;

    switch (type) {
      case 'profile': newSection = { ...base, type, name: '', email: '', phone: '', url: '' }; break;
      case 'skills': newSection = { ...base, type, items: [] }; break;
      case 'list': 
      case 'education':
      case 'projects':
        newSection = { ...base, type, items: [] }; break;
      case 'custom':
        newSection = { ...base, type, items: [] }; break;
      default: newSection = { ...base, type: 'custom', items: [] }; // Fallback
    }

    return {
      sections: [...state.sections, newSection],
      activeSectionId: newId
    };
  }),

  removeSection: (id) => set((state) => ({
    sections: state.sections.filter((sec) => sec.id !== id),
    activeSectionId: state.sections[0]?.id || ''
  })),

  reorderSections: (dragIndex, hoverIndex) => set((state) => {
    const newSections = [...state.sections];
    const [removed] = newSections.splice(dragIndex, 1);
    newSections.splice(hoverIndex, 0, removed);
    return { sections: newSections };
  }),

  addListItem: (sectionId) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && (sec.type === 'list' || sec.type === 'education' || sec.type === 'projects')) {
        return {
          ...sec,
          items: [...sec.items, { id: Date.now().toString(), title: '', subtitle: '', date: '', description: '' }]
        };
      }
      return sec;
    })
  })),

  updateListItem: (sectionId, itemId, data) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && (sec.type === 'list' || sec.type === 'education' || sec.type === 'projects')) {
        return {
          ...sec,
          items: sec.items.map((item) => (item.id === itemId ? { ...item, ...data } : item))
        };
      }
      return sec;
    })
  })),

  removeListItem: (sectionId, itemId) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && (sec.type === 'list' || sec.type === 'education' || sec.type === 'projects')) {
        return { ...sec, items: sec.items.filter((item) => item.id !== itemId) };
      }
      return sec;
    })
  })),

  addSkillItem: (sectionId) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && sec.type === 'skills') {
        return {
          ...sec,
          items: [...sec.items, { id: Date.now().toString(), category: '', items: '' }]
        };
      }
      return sec;
    })
  })),

  updateSkillItem: (sectionId, itemId, data) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && sec.type === 'skills') {
        return {
          ...sec,
          items: sec.items.map((item) => (item.id === itemId ? { ...item, ...data } : item))
        };
      }
      return sec;
    })
  })),

  removeSkillItem: (sectionId, itemId) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && sec.type === 'skills') {
        return { ...sec, items: sec.items.filter((item) => item.id !== itemId) };
      }
      return sec;
    })
  })),

  addCustomBlock: (sectionId, type) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && sec.type === 'custom') {
        return {
          ...sec,
          items: [...sec.items, { id: Date.now().toString(), type, content: '' }]
        };
      }
      return sec;
    })
  })),

  updateCustomBlock: (sectionId, blockId, data) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && sec.type === 'custom') {
        return {
          ...sec,
          items: sec.items.map((item) => (item.id === blockId ? { ...item, ...data } : item))
        };
      }
      return sec;
    })
  })),

  removeCustomBlock: (sectionId, blockId) => set((state) => ({
    sections: state.sections.map((sec) => {
      if (sec.id === sectionId && sec.type === 'custom') {
        return {
          ...sec,
          items: sec.items.filter((item) => item.id !== blockId)
        };
      }
      return sec;
    })
  })),

  reorderCustomBlock: (sectionId, dragIndex, hoverIndex) => set((state) => {
    return {
      sections: state.sections.map((sec) => {
        if (sec.id === sectionId && sec.type === 'custom') {
           const newItems = [...sec.items];
           const [removed] = newItems.splice(dragIndex, 1);
           newItems.splice(hoverIndex, 0, removed);
           return { ...sec, items: newItems };
        }
        return sec;
      })
    };
  })

}));