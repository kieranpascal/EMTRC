import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getServiceBySlug, SERVICE_DETAILS } from '../content/services';
import { BLOG_CATEGORIES, buildBlogCatalog } from '../content/blogLoader';
import { CASE_STUDIES, getCaseStudyBySlug } from '../content/caseStudies';
import { TRAINING_TRACKS } from '../content/training';
import { ALL_FAQS, FAQ_CATEGORIES } from '../content/faqs';

function loadDiskMarkdownArticles() {
  const dir = path.join(process.cwd(), 'src/assets/blog');
  const rawMap: Record<string, string> = {};
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith('.md')) {
      rawMap[file] = fs.readFileSync(path.join(dir, file), 'utf-8');
    }
  }
  return buildBlogCatalog(rawMap);
}

describe('dedicated service pages catalog', () => {
  it('defines 8 unique standalone services with full editorial depth', () => {
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

      for (const related of service.relatedSlugs) {
        assert.ok(getServiceBySlug(related), `Invalid related slug ${related} on ${service.slug}`);
      }

      for (const imgPath of [service.heroImage, service.secondaryImage]) {
        const diskPath = path.join(process.cwd(), imgPath.replace(/^\//, ''));
        assert.ok(fs.existsSync(diskPath), `Missing service image on disk: ${imgPath}`);
      }
    }
  });
});

describe('static markdown blog catalog', () => {
  it('loads 6 valid Markdown articles from src/assets/blog covering all categories', () => {
    const articles = loadDiskMarkdownArticles();
    assert.equal(articles.length, 6);
    const slugs = new Set(articles.map((a) => a.slug));
    assert.equal(slugs.size, 6);

    const usedCategories = new Set(articles.map((a) => a.category));
    for (const cat of BLOG_CATEGORIES) {
      assert.ok(usedCategories.has(cat), `Category ${cat} should have at least 1 article`);
    }

    for (const article of articles) {
      assert.ok(article.keyTakeaways.length >= 3, `${article.slug} needs >= 3 key takeaways`);
      assert.ok(article.blocks.length >= 5, `${article.slug} needs >= 5 markdown blocks`);
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

describe('case studies, training centre & FAQ hub catalogs', () => {
  it('validates all 5 London case studies with on-disk photography and valid demo links', () => {
    assert.equal(CASE_STUDIES.length, 5);
    for (const cs of CASE_STUDIES) {
      assert.equal(getCaseStudyBySlug(cs.slug)?.slug, cs.slug);
      const presetPath = path.join(process.cwd(), 'examples', `${cs.demoPresetId}.json`);
      assert.ok(fs.existsSync(presetPath), `Missing demo preset JSON: ${cs.demoPresetId}`);
      assert.ok(cs.metrics.length >= 4, `${cs.slug} needs >= 4 before/after metrics`);
      const diskPath = path.join(process.cwd(), cs.image.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `Missing case study image on disk: ${cs.image}`);
    }
  });

  it('validates all 4 training tracks and 12 lessons with unique IDs', () => {
    assert.equal(TRAINING_TRACKS.length, 4);
    const lessonIds = new Set<string>();
    for (const track of TRAINING_TRACKS) {
      assert.ok(getServiceBySlug(track.relatedServiceSlug), `Invalid service slug ${track.relatedServiceSlug}`);
      assert.ok(track.lessons.length >= 3);
      for (const lesson of track.lessons) {
        assert.ok(!lessonIds.has(lesson.id), `Duplicate training lesson ID ${lesson.id}`);
        lessonIds.add(lesson.id);
        assert.ok(lesson.steps.length >= 3);
      }
    }
  });

  it('validates all 24 FAQs across all 6 categories', () => {
    assert.equal(ALL_FAQS.length, 24);
    const seenCats = new Set(ALL_FAQS.map((f) => f.category));
    for (const cat of FAQ_CATEGORIES) {
      assert.ok(seenCats.has(cat), `FAQ category ${cat} should have entries`);
    }
  });
});
