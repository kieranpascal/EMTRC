import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { matchesSearchQuery, parseMarkdownBlocks, parseMarkdownDocument } from './markdown';
import { buildBlogCatalog } from '../content/blogLoader';

describe('static markdown parser & search utilities', () => {
  it('parses YAML frontmatter scalars, arrays, and markdown block types', () => {
    const sample = `---
slug: sample-post
category: Websites & Speed
shortTag: Fast
title: "Fast London Sites"
excerpt: "Speed matters on 4G."
publishedDate: "November 2026"
readTime: "4 min read"
author: "emtrc Editorial"
image: "/src/assets/images/emtrc_london_barber_craft_1795422463841.jpg"
imageAlt: "Barber shop"
relatedGuideId: website-checklist
relatedServiceSlug: websites
keywords:
  - London
  - Speed
keyTakeaways:
  - Keep pages under 1 second
  - Publish prices clearly
---

## First Heading

Paragraph with **bold** and \`inline code\`.

> Important callout quote line.

### Subheading

- Bullet one
- Bullet two

1. Step one
2. Step two
`;

    const parsed = parseMarkdownDocument(sample);
    assert.equal(parsed.frontmatter.slug, 'sample-post');
    assert.equal(parsed.frontmatter.title, 'Fast London Sites');
    assert.deepEqual(parsed.frontmatter.keywords, ['London', 'Speed']);
    assert.deepEqual(parsed.frontmatter.keyTakeaways, [
      'Keep pages under 1 second',
      'Publish prices clearly',
    ]);

    const types = parsed.blocks.map((b) => b.type);
    assert.deepEqual(types, ['h2', 'p', 'blockquote', 'h3', 'ul', 'ol']);
  });

  it('handles unordered and ordered lists accurately in parseMarkdownBlocks', () => {
    const blocks = parseMarkdownBlocks('- Alpha\n- Beta\n\n1. First\n2. Second');
    assert.equal(blocks.length, 2);
    assert.equal(blocks[0].type, 'ul');
    assert.equal(blocks[1].type, 'ol');
    if (blocks[0].type === 'ul') assert.deepEqual(blocks[0].items, ['Alpha', 'Beta']);
    if (blocks[1].type === 'ol') assert.deepEqual(blocks[1].items, ['First', 'Second']);
  });

  it('filters blog/resource items using case-insensitive multi-term search', () => {
    const dir = path.join(process.cwd(), 'src/assets/blog');
    const rawMap: Record<string, string> = {};
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.md')) {
        rawMap[file] = fs.readFileSync(path.join(dir, file), 'utf-8');
      }
    }

    const catalog = buildBlogCatalog(rawMap);
    assert.equal(catalog.length, 6);

    const pstnMatches = catalog.filter((a) => matchesSearchQuery(a, 'pstn 020'));
    assert.equal(pstnMatches.length, 1);
    assert.equal(pstnMatches[0].slug, 'uk-pstn-switch-off-31-january-2027-london-guide');

    const chatgptMatches = catalog.filter((a) =>
      matchesSearchQuery(a, 'Perplexity Apple Intelligence')
    );
    assert.equal(chatgptMatches.length, 1);
    assert.equal(chatgptMatches[0].slug, 'chatgpt-apple-maps-ai-search-local-businesses');

    const emptyMatches = catalog.filter((a) => matchesSearchQuery(a, '   '));
    assert.equal(emptyMatches.length, 6);

    const noMatches = catalog.filter((a) => matchesSearchQuery(a, 'nonexistentxyz123'));
    assert.equal(noMatches.length, 0);
  });

  it('parses markdown pipe tables accurately and confirms all 6 blog posts are long-form editorial guides', () => {
    const tableBlocks = parseMarkdownBlocks(
      '| Feature | Starter | Business |\n| :--- | :--- | :--- |\n| Pages | 1 | 5 |\n| Domain | Extra | Included |'
    );
    assert.equal(tableBlocks.length, 1);
    assert.equal(tableBlocks[0].type, 'table');
    if (tableBlocks[0].type === 'table') {
      assert.deepEqual(tableBlocks[0].headers, ['Feature', 'Starter', 'Business']);
      assert.equal(tableBlocks[0].rows.length, 2);
      assert.deepEqual(tableBlocks[0].rows[1], ['Domain', 'Extra', 'Included']);
    }

    const dir = path.join(process.cwd(), 'src/assets/blog');
    const rawMap: Record<string, string> = {};
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.md')) {
        rawMap[file] = fs.readFileSync(path.join(dir, file), 'utf-8');
      }
    }
    const catalog = buildBlogCatalog(rawMap);
    for (const article of catalog) {
      const wordCount = article.rawBody.split(/\s+/).filter(Boolean).length;
      assert.ok(
        wordCount >= 850,
        `Expected long-form article "${article.slug}" to have >=850 words, got ${wordCount}`
      );
      assert.ok(
        article.blocks.some((b) => b.type === 'table'),
        `Expected article "${article.slug}" to include at least one comparison table`
      );
      assert.ok(
        article.blocks.some((b) => b.type === 'blockquote'),
        `Expected article "${article.slug}" to include a pull quote`
      );
      const imgPath = path.join(process.cwd(), article.image.replace(/^\//, ''));
      assert.ok(fs.existsSync(imgPath), `Missing blog hero image on disk: ${article.image}`);
    }
  });
});
