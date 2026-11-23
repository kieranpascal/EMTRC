import { parseMarkdownDocument, type MarkdownBlock } from '../utils/markdown';

export type BlogCategory =
  | 'Websites & Speed'
  | 'Google Maps & AI Search'
  | 'UK Phones & PSTN 2027'
  | 'Reviews & Lead Capture';

export interface BlogArticleSection {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
}

export interface BlogArticle {
  slug: string;
  category: BlogCategory;
  shortTag: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  keywords: readonly string[];
  keyTakeaways: readonly string[];
  blocks: readonly MarkdownBlock[];
  rawBody: string;
  sections: readonly BlogArticleSection[];
  relatedGuideId: string;
  relatedServiceSlug: string;
}

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  'Websites & Speed',
  'Google Maps & AI Search',
  'UK Phones & PSTN 2027',
  'Reviews & Lead Capture',
] as const;

const ARTICLE_ORDER: readonly string[] = [
  'uk-pstn-switch-off-31-january-2027-london-guide',
  'why-1-in-3-london-shops-lose-google-maps-calls',
  'how-to-rank-top-3-google-maps-london-borough',
  'chatgpt-apple-maps-ai-search-local-businesses',
  'missed-call-text-back-maths-london-trades',
  'domain-ownership-trap-uk-small-business',
];

function blocksToSections(blocks: readonly MarkdownBlock[]): BlogArticleSection[] {
  const sections: BlogArticleSection[] = [];
  let current: { heading: string; paragraphs: string[]; bullets: string[] } | null = null;

  for (const block of blocks) {
    if (block.type === 'h2') {
      if (current) {
        sections.push({
          heading: current.heading,
          paragraphs: current.paragraphs,
          ...(current.bullets.length > 0 ? { bullets: current.bullets } : {}),
        });
      }
      current = { heading: block.text, paragraphs: [], bullets: [] };
    } else if (block.type === 'p' || block.type === 'blockquote') {
      if (!current) current = { heading: 'Overview', paragraphs: [], bullets: [] };
      current.paragraphs.push(block.text);
    } else if (block.type === 'ul' || block.type === 'ol') {
      if (!current) current = { heading: 'Overview', paragraphs: [], bullets: [] };
      current.bullets.push(...block.items);
    }
  }

  if (current) {
    sections.push({
      heading: current.heading,
      paragraphs: current.paragraphs,
      ...(current.bullets.length > 0 ? { bullets: current.bullets } : {}),
    });
  }

  return sections;
}

/**
 * Pure static Markdown-to-BlogArticle catalog builder.
 * Works identically with Vite's import.meta.glob and Node unit tests.
 */
export function buildBlogCatalog(rawFiles: Record<string, string>): BlogArticle[] {
  const articles: BlogArticle[] = [];

  for (const raw of Object.values(rawFiles)) {
    const parsed = parseMarkdownDocument(raw);
    const fm = parsed.frontmatter;
    if (!fm.slug || !fm.title) continue;

    articles.push({
      slug: fm.slug,
      category: (BLOG_CATEGORIES.includes(fm.category as BlogCategory)
        ? fm.category
        : 'Websites & Speed') as BlogCategory,
      shortTag: fm.shortTag,
      title: fm.title,
      excerpt: fm.excerpt,
      publishedDate: fm.publishedDate,
      readTime: fm.readTime,
      author: fm.author,
      image: fm.image,
      imageAlt: fm.imageAlt,
      keywords: fm.keywords,
      keyTakeaways: fm.keyTakeaways,
      blocks: parsed.blocks,
      rawBody: parsed.rawBody,
      sections: blocksToSections(parsed.blocks),
      relatedGuideId: fm.relatedGuideId,
      relatedServiceSlug: fm.relatedServiceSlug,
    });
  }

  return articles.sort((a, b) => {
    const idxA = ARTICLE_ORDER.indexOf(a.slug);
    const idxB = ARTICLE_ORDER.indexOf(b.slug);
    const rankA = idxA === -1 ? 999 : idxA;
    const rankB = idxB === -1 ? 999 : idxB;
    return rankA - rankB;
  });
}
