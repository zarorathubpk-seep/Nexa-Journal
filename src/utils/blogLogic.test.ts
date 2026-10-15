import test from 'node:test';
import assert from 'node:assert/strict';
import {
  searchArticles,
  calculateReadingTime,
  generateSitemapXml,
  generateRobotsTxt,
  generateAdsTxt,
  generateArticleJsonLd,
  generateBreadcrumbJsonLd,
} from './blogLogic.ts';
import type { Article } from '../types/blog.ts';

const mockArticle: Article = {
  id: 'art-1',
  slug: 'test-article-productivity',
  title: 'Mastering Remote Productivity',
  metaTitle: 'Mastering Remote Productivity — NexaJournal',
  metaDescription: 'Learn how remote professionals maximize efficiency with focused routines.',
  primaryKeyword: 'remote productivity',
  secondaryKeywords: ['time blocking', 'deep work'],
  excerpt: 'A comprehensive study on asynchronous remote productivity techniques.',
  category: 'Productivity',
  featuredImage: '/assets/sample.jpg',
  featuredImageAlt: 'Laptop on wooden desk',
  author: {
    id: 'auth-1',
    name: 'Elena Rostova',
    role: 'Editor-in-Chief',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    bio: 'Tech journalist.',
  },
  publishDate: '2026-10-10',
  readTimeMinutes: 5,
  tableOfContents: [
    { id: 'section-1', title: 'The Core Principle', level: 2 },
  ],
  content: [
    {
      type: 'paragraph',
      value: 'One two three four five six seven eight nine ten '.repeat(44), // 440 words -> 2 mins
    },
    {
      type: 'list',
      items: ['Point A with several words', 'Point B with additional explanations'],
    },
  ],
  faqs: [
    { question: 'What is deep work?', answer: 'Uninterrupted cognitive focus.' },
  ],
};

test('searchArticles matches title, keyword, and category', () => {
  const articles = [mockArticle];

  const matchedByKeyword = searchArticles(articles, 'remote productivity', 'All');
  assert.equal(matchedByKeyword.length, 1);

  const matchedByCategory = searchArticles(articles, '', 'Productivity');
  assert.equal(matchedByCategory.length, 1);

  const mismatchedCategory = searchArticles(articles, '', 'Online Privacy');
  assert.equal(mismatchedCategory.length, 0);

  const mismatchedQuery = searchArticles(articles, 'Quantum computing', 'All');
  assert.equal(mismatchedQuery.length, 0);
});

test('calculateReadingTime calculates approximate read time from content blocks', () => {
  const time = calculateReadingTime(mockArticle.content);
  assert.ok(time >= 2, `Expected time >= 2, got ${time}`);
});

test('generateSitemapXml creates valid XML with urls and article slug', () => {
  const xml = generateSitemapXml([mockArticle], 'https://nexajournal.com');
  assert.ok(xml.includes('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('https://nexajournal.com/article/test-article-productivity'));
  assert.ok(xml.includes('<changefreq>daily</changefreq>'));
});

test('generateRobotsTxt provides crawler rules and sitemap location', () => {
  const robots = generateRobotsTxt('https://nexajournal.com');
  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Sitemap: https://nexajournal.com/sitemap.xml'));
});

test('generateAdsTxt outputs IAB compliant lines for RevBid and direct sellers', () => {
  const ads = generateAdsTxt('pub-1234567890');
  assert.ok(ads.includes('google.com, pub-1234567890, DIRECT'));
  assert.ok(ads.includes('revbid.com, rev-77382, DIRECT'));
});

test('generateArticleJsonLd builds correct schema.org NewsArticle representation', () => {
  const jsonLd = generateArticleJsonLd(mockArticle, 'https://nexajournal.com');
  assert.equal(jsonLd['@type'], 'NewsArticle');
  assert.equal(jsonLd.headline, 'Mastering Remote Productivity');
  assert.equal(jsonLd.author.name, 'Elena Rostova');
});

test('generateBreadcrumbJsonLd produces valid BreadcrumbList', () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Productivity', url: '/category/productivity' },
  ];
  const jsonLd = generateBreadcrumbJsonLd(breadcrumbs, 'https://nexajournal.com');
  assert.equal(jsonLd['@type'], 'BreadcrumbList');
  assert.equal(jsonLd.itemListElement.length, 2);
  assert.equal(jsonLd.itemListElement[0].position, 1);
});
