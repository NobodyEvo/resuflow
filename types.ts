export type SectionType = 'profile' | 'custom' | 'list' | 'skills' | 'education' | 'projects';

export interface SectionBase {
  id: string;
  title: string;
  type: SectionType;
  isVisible: boolean;
}

export interface ProfileSection extends SectionBase {
  type: 'profile';
  name: string;
  email: string;
  phone: string;
  url: string;
  summary?: string;
}

export interface ListItem {
  id: string;
  title: string; // e.g., Company or Project Name
  subtitle: string; // e.g., Role or Tech Stack
  date: string; // e.g., Mar 2021 - Present
  description: string; // Bullet points separated by newlines
  url?: string;
}

export interface ListSection extends SectionBase {
  type: 'list' | 'education' | 'projects';
  items: ListItem[];
}

export interface SkillItem {
  id: string;
  category: string; // e.g., Languages
  items: string; // e.g., Java, Python (comma separated)
}

export interface SkillsSection extends SectionBase {
  type: 'skills';
  items: SkillItem[];
}

// Custom Section with Blocks
export type CustomBlockType = 'heading' | 'subtitle' | 'text' | 'list';

export interface CustomBlock {
  id: string;
  type: CustomBlockType;
  content: string;
  date?: string;
}

export interface CustomSection extends SectionBase {
  type: 'custom';
  items: CustomBlock[];
}

export type ResumeSection = ProfileSection | ListSection | SkillsSection | CustomSection;

export interface ResumeState {
  sections: ResumeSection[];
  activeSectionId: string;
  setActiveSection: (id: string) => void;
  updateSection: (id: string, data: Partial<ResumeSection>) => void;
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  reorderSections: (dragIndex: number, hoverIndex: number) => void;
  
  // List Item Helpers (Work, Edu, Projects)
  addListItem: (sectionId: string) => void;
  updateListItem: (sectionId: string, itemId: string, data: Partial<ListItem>) => void;
  removeListItem: (sectionId: string, itemId: string) => void;
  
  // Skill Item Helpers
  addSkillItem: (sectionId: string) => void;
  updateSkillItem: (sectionId: string, itemId: string, data: Partial<SkillItem>) => void;
  removeSkillItem: (sectionId: string, itemId: string) => void;

  // Custom Block Helpers
  addCustomBlock: (sectionId: string, type: CustomBlockType) => void;
  updateCustomBlock: (sectionId: string, blockId: string, data: Partial<CustomBlock>) => void;
  removeCustomBlock: (sectionId: string, blockId: string) => void;
  reorderCustomBlock: (sectionId: string, dragIndex: number, hoverIndex: number) => void;
}