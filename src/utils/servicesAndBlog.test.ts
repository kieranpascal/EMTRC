import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getServiceBySlug, SERVICE_DETAILS } from '../content/services';
import { BLOG_ARTICLES, BLOG_CATEGORIES, getBlogArticleBySlug } from '../content/blog';

describe('dedicated service pages catalog', () => {
  it('defines 8 unique standalone services with full Klyara-grade depth', () => {
    assert.equal(SERVICE_DETAILS.length, 8);
    const slugs = new Set(SERVICE_DETAILS.map((s) => s.slug));
    assert.equal(slugs.size, 8);

    for (const service of SERVICE_DETAILS) {
      assert.equal(getServiceBySlug(service.slug)?.slug, service.slug);
      assert.equal(service.pains.length, 4, `${service.slug} should have 4 pains`);
      assert.equal(service.steps.length, 3, `${service.slug} should have 3 workflow steps`);
      assert.equal(service.previewTabs.length, 4, `${service.slug} should have 4 phone preview tabs`);
      assert.equal(service.personas.length, 3, `${service.slug} should have 3 personas`);
      assert.ok(service.whyUsPoints.length >= 4, `${service.slug} should have >= 4 proof points`);
      assert.ok(service.faqGroups.length >= 2, `${service.slug} should have grouped FAQs`);

      // Verify all related slugs resolve
      for (const related of service.relatedSlugs) {
        assert.ok(getServiceBySlug(related), `Invalid related slug ${related} on ${service.slug}`);
      }

      // Verify referenced local images exist on disk
      for (const imgPath of [service.heroImage, service.secondaryImage]) {
        const diskPath = path.join(process.cwd(), imgPath.replace(/^\//, ''));
        assert.ok(fs.existsSync(diskPath), `Missing service image on disk: ${imgPath}`);
      }
    }
  });
});

describe('editorial blog catalog', () => {
  it('defines 6 complete plain-English articles covering all categories', () => {
    assert.equal(BLOG_ARTICLES.length, 6);
    const slugs = new Set(BLOG_ARTICLES.map((a) => a.slug));
    assert.equal(slugs.size, 6);

    const usedCategories = new Set(BLOG_ARTICLES.map((a) => a.category));
    for (const cat of BLOG_CATEGORIES) {
      assert.ok(usedCategories.has(cat), `Category ${cat} should have at least 1 article`);
    }

    for (const article of BLOG_ARTICLES) {
      assert.equal(getBlogArticleBySlug(article.slug)?.slug, article.slug);
      assert.ok(article.keyTakeaways.length >= 3, `${article.slug} needs >= 3 key takeaways`);
      assert.ok(article.sections.length >= 3, `${article.slug} needs >= 3 sections`);
      assert.ok(
        getServiceBySlug(article.relatedServiceSlug),
        `Invalid relatedServiceSlug ${article.relatedServiceSlug} on ${article.slug}`
      );
      const diskPath = path.join(process.cwd(), article.image.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `Missing blog image on disk: ${article.image}`);
    }
  });
});
