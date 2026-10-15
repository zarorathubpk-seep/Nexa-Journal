export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export type CategoryType = 
  | 'Artificial Intelligence'
  | 'Online Privacy'
  | 'Productivity'
  | 'How-To Guides'
  | 'Hardware & Tech';

export interface TableOfContentItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleContentBlock {
  type: 'paragraph' | 'h2' | 'h3' | 'callout' | 'quote' | 'image' | 'list' | 'keyTakeaways' | 'internalLink' | 'code' | 'table';
  value?: string;
  items?: string[];
  caption?: string;
  src?: string;
  alt?: string;
  linkSlug?: string;
  linkText?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  excerpt: string;
  category: CategoryType;
  featuredImage: string;
  featuredImageAlt: string;
  author: Author;
  publishDate: string;
  updatedDate?: string;
  readTimeMinutes: number;
  tableOfContents: TableOfContentItem[];
  content: ArticleContentBlock[];
  faqs: FAQItem[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isEditorPick?: boolean;
  isGuide?: boolean;
}

export interface CategoryInfo {
  name: CategoryType;
  slug: string;
  description: string;
  accentColor: string;
}
