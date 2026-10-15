import type { Article, CategoryType } from '../types/blog.ts';

/**
 * Filter and search articles by text query, category, and tags
 */
export function searchArticles(
  articles: Article[],
  query: string = '',
  categoryFilter: string = 'All'
): Article[] {
  const normalizedQuery = query.trim().toLowerCase();

  return articles.filter((article) => {
    // Category match
    const matchesCategory =
      categoryFilter === 'All' || article.category === categoryFilter;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    // Search matching: title, excerpt, primaryKeyword, secondaryKeywords, author name
    const titleMatch = article.title.toLowerCase().includes(normalizedQuery);
    const excerptMatch = article.excerpt.toLowerCase().includes(normalizedQuery);
    const keywordMatch = article.primaryKeyword.toLowerCase().includes(normalizedQuery);
    const secondaryMatch = article.secondaryKeywords.some((k) =>
      k.toLowerCase().includes(normalizedQuery)
    );
    const authorMatch = article.author.name.toLowerCase().includes(normalizedQuery);

    return titleMatch || excerptMatch || keywordMatch || secondaryMatch || authorMatch;
  });
}

/**
 * Calculate estimated reading time in minutes based on 220 words per minute
 */
export function calculateReadingTime(contentBlocks: Article['content']): number {
  let wordCount = 0;
  for (const block of contentBlocks) {
    if (block.value) {
      wordCount += block.value.split(/\s+/).filter(Boolean).length;
    }
    if (block.items) {
      for (const item of block.items) {
        wordCount += item.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  const minutes = Math.ceil(wordCount / 220);
  return Math.max(1, minutes);
}

/**
 * Generate XML Sitemap string compliant with sitemaps.org schema
 */
export function generateSitemapXml(articles: Article[], baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const staticPages = [
    { loc: `${cleanBase}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${cleanBase}/#about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${cleanBase}/#contact`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${cleanBase}/#privacy`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${cleanBase}/#terms`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${cleanBase}/#disclaimer`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${cleanBase}/#cookies`, priority: '0.5', changefreq: 'monthly' },
  ];

  const articleEntries = articles.map((article) => {
    return `  <url>
    <loc>${cleanBase}/article/${article.slug}</loc>
    <lastmod>${article.updatedDate || article.publishDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  const staticEntries = staticPages.map((page) => {
    return `  <url>
    <loc>${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.join('\n')}
${articleEntries.join('\n')}
</urlset>`;
}

/**
 * Generate robots.txt content with crawler directives and sitemap reference
 */
export function generateRobotsTxt(baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/$/, '');
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${cleanBase}/sitemap.xml
`;
}

/**
 * Generate ads.txt content conforming to IAB standard for RevBid / Google AdSense
 */
export function generateAdsTxt(publisherId: string = 'pub-98421094821034', network: string = 'google.com'): string {
  return `# NexaJournal Authorized Digital Sellers (ads.txt)
# Specification: IAB Tech Lab Ads.txt v1.1
# RevBid & Ad Exchange Integration

google.com, ${publisherId}, DIRECT, f08c47fec0942fa0
revbid.com, rev-77382, DIRECT, 84ba92f03c1
appnexus.com, 10294, RESELLER, f5ab7911911e2222
openx.com, 537142981, RESELLER, 6a698e2687a04504
rubiconproject.com, 18924, RESELLER, 0bfd66d529a55803
`;
}

/**
 * Generate Schema.org JSON-LD for an Article
 */
export function generateArticleJsonLd(article: Article, baseUrl: string) {
  const cleanBase = baseUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${cleanBase}/article/${article.slug}`,
    },
    headline: article.title,
    description: article.metaDescription,
    image: [article.featuredImage.startsWith('http') ? article.featuredImage : `${cleanBase}${article.featuredImage}`],
    datePublished: article.publishDate,
    dateModified: article.updatedDate || article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NexaJournal',
      logo: {
        '@type': 'ImageObject',
        url: `${cleanBase}/logo.png`,
      },
    },
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
  };
}

/**
 * Generate BreadcrumbList Schema.org JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[],
  baseUrl: string
) {
  const cleanBase = baseUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${cleanBase}${item.url}`,
    })),
  };
}
