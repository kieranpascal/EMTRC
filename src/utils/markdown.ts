export interface MarkdownFrontmatter {
  slug: string;
  category: string;
  shortTag: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  author: string;
  image: string;
  imageAlt: string;
  relatedGuideId: string;
  relatedServiceSlug: string;
  keywords: string[];
  keyTakeaways: string[];
}

export type MarkdownBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'chart'; chartId: string };

export interface ParsedMarkdownDocument {
  frontmatter: MarkdownFrontmatter;
  blocks: MarkdownBlock[];
  rawBody: string;
}

/**
 * Pure client/build-time YAML frontmatter + Markdown parser for static blog posts.
 * Supports headings, lists, blockquotes, pipe tables, captioned editorial images,
 * and interactive chart directives (`:::chart <id>`). Zero runtime dependencies.
 */
export function parseMarkdownDocument(raw: string): ParsedMarkdownDocument {
  const normalized = raw.replace(/\r\n/g, '\n').trim();
  let frontmatterRaw = '';
  let body = normalized;

  if (normalized.startsWith('---\n')) {
    const endIdx = normalized.indexOf('\n---\n', 4);
    if (endIdx !== -1) {
      frontmatterRaw = normalized.slice(4, endIdx);
      body = normalized.slice(endIdx + 5).trim();
    }
  }

  const meta: Record<string, string | string[]> = {};
  let activeListKey: string | null = null;

  for (const rawLine of frontmatterRaw.split('\n')) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('- ') && activeListKey) {
      const val = stripQuotes(trimmed.slice(2).trim());
      const existing = meta[activeListKey];
      if (Array.isArray(existing)) {
        existing.push(val);
      } else {
        meta[activeListKey] = [val];
      }
      continue;
    }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx !== -1) {
      const key = trimmed.slice(0, colonIdx).trim();
      const value = trimmed.slice(colonIdx + 1).trim();
      if (!value) {
        meta[key] = [];
        activeListKey = key;
      } else {
        meta[key] = stripQuotes(value);
        activeListKey = null;
      }
    }
  }

  const str = (key: string): string => {
    const v = meta[key];
    return typeof v === 'string' ? v : '';
  };

  const list = (key: string): string[] => {
    const v = meta[key];
    if (Array.isArray(v)) return v;
    if (typeof v === 'string' && v.trim()) {
      return v.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  const frontmatter: MarkdownFrontmatter = {
    slug: str('slug'),
    category: str('category'),
    shortTag: str('shortTag'),
    title: str('title'),
    excerpt: str('excerpt'),
    publishedDate: str('publishedDate'),
    readTime: str('readTime'),
    author: str('author'),
    image: str('image'),
    imageAlt: str('imageAlt'),
    relatedGuideId: str('relatedGuideId'),
    relatedServiceSlug: str('relatedServiceSlug'),
    keywords: list('keywords'),
    keyTakeaways: list('keyTakeaways'),
  };

  const blocks = parseMarkdownBlocks(body);
  return { frontmatter, blocks, rawBody: body };
}

function stripQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseTableRow(line: string): string[] {
  return line
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  return /^\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(trimmed);
}

const IMAGE_LINE_RE = /^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)$/;
const CHART_LINE_RE = /^:::chart\s+([a-z0-9-]+)$/i;

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }

    const chartMatch = CHART_LINE_RE.exec(line);
    if (chartMatch) {
      blocks.push({ type: 'chart', chartId: chartMatch[1].toLowerCase() });
      i++;
      continue;
    }

    const imgMatch = IMAGE_LINE_RE.exec(line);
    if (imgMatch) {
      blocks.push({
        type: 'image',
        alt: imgMatch[1].trim(),
        src: imgMatch[2].trim(),
        caption: imgMatch[3]?.trim(),
      });
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      i++;
      continue;
    }

    if (
      line.includes('|') &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const headers = parseTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().includes('|')) {
        rows.push(parseTableRow(lines[i].trim()));
        i++;
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('> ')) {
        quoteLines.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: 'blockquote', text: quoteLines.join(' ') });
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
        items.push(lines[i].trim().slice(2).trim());
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Collect contiguous paragraph lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !CHART_LINE_RE.test(lines[i].trim()) &&
      !IMAGE_LINE_RE.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('> ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !(lines[i].trim().includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1]))
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'p', text: paraLines.join(' ') });
    }
  }

  return blocks;
}

export interface SearchableTextItem {
  title: string;
  excerpt?: string;
  category?: string;
  keywords?: readonly string[];
  rawBody?: string;
}

/**
 * Case-insensitive multi-term keyword matcher for Blog and Resources search bars.
 */
export function matchesSearchQuery<T extends SearchableTextItem>(item: T, query: string): boolean {
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return true;
  const terms = cleaned.split(/\s+/).filter(Boolean);
  const haystack = [
    item.title,
    item.excerpt ?? '',
    item.category ?? '',
    ...(item.keywords ?? []),
    item.rawBody ?? '',
  ]
    .join(' ')
    .toLowerCase();

  return terms.every((term) => haystack.includes(term));
}
