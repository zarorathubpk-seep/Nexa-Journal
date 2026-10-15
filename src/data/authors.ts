import { Author, CategoryInfo } from '../types/blog.ts';

export const AUTHORS: Record<string, Author> = {
  elena: {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Editorial Director & Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    bio: 'Technology writer and researcher with over a decade analyzing personal computing, privacy-enhancing technologies, and software ergonomics.',
  },
  marcus: {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Senior Information Security Analyst',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bio: 'Specialist in threat intelligence, credential hygiene, and practical digital privacy protocols for everyday web users.',
  },
  sarah: {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Digital Workflows & Education Lead',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    bio: 'Educator and productivity consultant dedicated to cognitive ergonomics, study schedule design, and workspace optimization.',
  },
  david: {
    id: 'david-okonkwo',
    name: 'David Okonkwo',
    role: 'Hardware & Cloud Infrastructure Editor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bio: 'Systems engineer writing about thermal management, file architectures, distributed cloud storage, and client computing.',
  },
};

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    description: 'Practical evaluations, student workflows, and ethical productivity enhancements powered by modern machine intelligence.',
    accentColor: 'indigo',
    image: '/images/categories/artificial-intelligence.jpg',
  },
  {
    name: 'Online Privacy',
    slug: 'online-privacy',
    description: 'Actionable blueprints for browser sanitization, tracker blocking, metadata minimization, and digital rights.',
    accentColor: 'purple',
    image: '/images/categories/online-privacy.jpg',
  },
  {
    name: 'Productivity',
    slug: 'productivity',
    description: 'Empirical methods for asynchronous workflow design, calendar management, and focus architecture.',
    accentColor: 'blue',
    image: '/images/categories/productivity.jpg',
  },
  {
    name: 'How-To Guides',
    slug: 'how-to-guides',
    description: 'Step-by-step instructional walk-throughs solving concrete computing bottlenecks and file disorganization.',
    accentColor: 'emerald',
    image: '/images/categories/how-to-guides.jpg',
  },
  {
    name: 'Hardware & Tech',
    slug: 'hardware-tech',
    description: 'Device performance tuning, thermal maintenance, operating system hygiene, and storage fundamentals.',
    accentColor: 'amber',
    image: '/images/categories/hardware-tech.jpg',
  },
];
