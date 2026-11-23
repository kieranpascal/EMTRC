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

      const inlineImages = article.blocks.filter((b) => b.type === 'image');
      assert.ok(
        inlineImages.length >= 2,
        `Expected article "${article.slug}" to have >=2 inline images (3+ total with hero), got ${inlineImages.length}`
      );
      for (const imgBlock of inlineImages) {
        if (imgBlock.type === 'image') {
          const inlinePath = path.join(process.cwd(), imgBlock.src.replace(/^\//, ''));
          assert.ok(fs.existsSync(inlinePath), `Missing inline blog image on disk: ${imgBlock.src}`);
        }
      }

      const charts = article.blocks.filter((b) => b.type === 'chart');
      assert.ok(
        charts.length >= 1,
        `Expected article "${article.slug}" to include at least one interactive chart directive`
      );
    }
  });

  it('parses captioned inline images and :::chart directives accurately', () => {
    const sample = [
      '![London barber fade](/src/assets/images/barber_fade_editorial_1795426201374.jpg "Clean precision work in Dalston.")',
      '',
      ':::chart pstn-cost-timeline',
    ].join('\n');

    const blocks = parseMarkdownBlocks(sample);
    assert.equal(blocks.length, 2);
    assert.equal(blocks[0].type, 'image');
    if (blocks[0].type === 'image') {
      assert.equal(blocks[0].alt, 'London barber fade');
      assert.equal(blocks[0].src, '/src/assets/images/barber_fade_editorial_1795426201374.jpg');
      assert.equal(blocks[0].caption, 'Clean precision work in Dalston.');
    }
    assert.equal(blocks[1].type, 'chart');
    if (blocks[1].type === 'chart') {
      assert.equal(blocks[1].chartId, 'pstn-cost-timeline');
    }
  });

  it('confirms every /src/assets/images/ path referenced across Work, Services, Blog, Training, and Case Studies exists on disk', () => {
    const filesToAudit = [
      'src/pages/emtrc/EmtrcWorkPage.tsx',
      'src/pages/emtrc/EmtrcBlogArticlePage.tsx',
      'src/pages/emtrc/EmtrcServiceDetailPage.tsx',
      'src/content/services.ts',
      'src/content/caseStudies.ts',
      'src/content/training.ts',
      'src/content/site.ts',
    ];

    const imgRegex = /\/src\/assets\/images\/[A-Za-z0-9._-]+\.(?:jpg|jpeg|png|webp|svg)/g;
    let totalRefs = 0;

    for (const relFile of filesToAudit) {
      const content = fs.readFileSync(path.join(process.cwd(), relFile), 'utf-8');
      const matches = content.match(imgRegex) ?? [];
      assert.ok(matches.length > 0, `Expected image references in ${relFile}`);
      for (const ref of matches) {
        totalRefs += 1;
        const absPath = path.join(process.cwd(), ref.replace(/^\//, ''));
        assert.ok(fs.existsSync(absPath), `Broken image reference in ${relFile}: ${ref}`);
      }
    }

    assert.ok(totalRefs >= 35, `Expected at least 35 verified image references, checked ${totalRefs}`);
  });
});
