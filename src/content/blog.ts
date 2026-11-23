import {
  BLOG_CATEGORIES,
  buildBlogCatalog,
  type BlogArticle,
  type BlogArticleSection,
  type BlogCategory,
} from './blogLoader';

export { BLOG_CATEGORIES, buildBlogCatalog, type BlogArticle, type BlogArticleSection, type BlogCategory };

// Static build-time Markdown import via Vite (zero runtime API calls)
const rawMarkdownModules = import.meta.glob('../assets/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const BLOG_ARTICLES: readonly BlogArticle[] = buildBlogCatalog(rawMarkdownModules);

export function getBlogArticleBySlug(slug: string | undefined): BlogArticle | undefined {
  if (!slug) return undefined;
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
