import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getServiceBySlug, SERVICE_DETAILS } from '../content/services';
import { BLOG_CATEGORIES, buildBlogCatalog } from '../content/blogLoader';
import { CASE_STUDIES, getCaseStudyBySlug } from '../content/caseStudies';
import {
  LONDON_MARKETING_CALENDAR,
  OWNER_SCRIPTS_VAULT,
  TRAINING_TRACKS,
} from '../content/training';
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
  it('defines 12 unique standalone services with full editorial depth across 3 balanced categories', () => {
    assert.equal(SERVICE_DETAILS.length, 12);
    const slugs = new Set(SERVICE_DETAILS.map((s) => s.slug));
    assert.equal(slugs.size, 12);

    const categoryCounts = new Map<string, number>();
    for (const s of SERVICE_DETAILS) {
      categoryCounts.set(s.category, (categoryCounts.get(s.category) ?? 0) + 1);
    }
    assert.equal(categoryCounts.size, 3, 'Should define 3 balanced service categories');
    for (const [cat, count] of categoryCounts.entries()) {
      assert.equal(count, 4, `Category "${cat}" should have exactly 4 services for even 2x2 rows`);
    }

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
  it('validates all 6 London case studies with on-disk photography and valid demo links', () => {
    assert.equal(CASE_STUDIES.length, 6);
    for (const cs of CASE_STUDIES) {
      assert.equal(getCaseStudyBySlug(cs.slug)?.slug, cs.slug);
      const presetPath = path.join(process.cwd(), 'examples', `${cs.demoPresetId}.json`);
      assert.ok(fs.existsSync(presetPath), `Missing demo preset JSON: ${cs.demoPresetId}`);
      assert.ok(cs.metrics.length >= 4, `${cs.slug} needs >= 4 before/after metrics`);
      const diskPath = path.join(process.cwd(), cs.image.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `Missing case study image on disk: ${cs.image}`);
    }
  });

  it('validates all 6 training tracks (18 deep lessons), owner scripts vault, and 12-month calendar', () => {
    assert.equal(TRAINING_TRACKS.length, 6);
    const lessonIds = new Set<string>();
    for (const track of TRAINING_TRACKS) {
      assert.ok(getServiceBySlug(track.relatedServiceSlug), `Invalid service slug ${track.relatedServiceSlug}`);
      const coverPath = path.join(process.cwd(), track.coverImage.replace(/^\//, ''));
      assert.ok(fs.existsSync(coverPath), `Missing training track cover image on disk: ${track.coverImage}`);
      assert.ok(track.lessons.length >= 3);
      for (const lesson of track.lessons) {
        assert.ok(!lessonIds.has(lesson.id), `Duplicate training lesson ID ${lesson.id}`);
        lessonIds.add(lesson.id);
        assert.ok(lesson.steps.length >= 4, `Lesson ${lesson.id} should have >= 4 actionable steps`);
        assert.ok(lesson.whyItMatters.length >= 80, `Lesson ${lesson.id} needs rich whyItMatters copy`);
        assert.ok(lesson.commonMistake.length >= 40, `Lesson ${lesson.id} needs commonMistake guidance`);
      }
    }
    assert.equal(lessonIds.size, 18);
    assert.ok(OWNER_SCRIPTS_VAULT.length >= 6);
    assert.equal(LONDON_MARKETING_CALENDAR.length, 4);
    const totalCalendarMonths = LONDON_MARKETING_CALENDAR.reduce((sum, q) => sum + q.tasks.length, 0);
    assert.equal(totalCalendarMonths, 12);
  });

  it('validates all 30 comprehensive FAQs across all 6 categories', () => {
    assert.equal(ALL_FAQS.length, 30);
    const seenCats = new Set(ALL_FAQS.map((f) => f.category));
    for (const cat of FAQ_CATEGORIES) {
      assert.ok(seenCats.has(cat), `FAQ category ${cat} should have entries`);
      const countInCat = ALL_FAQS.filter((f) => f.category === cat).length;
      assert.ok(countInCat >= 5, `FAQ category ${cat} should have >= 5 entries, got ${countInCat}`);
    }
    for (const faq of ALL_FAQS) {
      assert.ok(faq.answer.length >= 160, `FAQ ${faq.id} answer should be thorough`);
      assert.ok(faq.deepDive.length >= 160, `FAQ ${faq.id} deepDive should be thorough`);
      assert.equal(faq.keyPoints.length, 3, `FAQ ${faq.id} should have 3 keyPoints`);
    }
  });

  it('ships bespoke London minimalist architectural SVG logo and valid Cloudflare Workers SPA config without conflicting _redirects', () => {
    const logoPath = path.join(process.cwd(), 'src/assets/logo.svg');
    assert.ok(fs.existsSync(logoPath), 'src/assets/logo.svg must exist');
    const logoSvg = fs.readFileSync(logoPath, 'utf-8');
    assert.ok(logoSvg.includes('<svg') && logoSvg.includes('</svg>'), 'logo.svg must be valid SVG');
    assert.ok(logoSvg.includes('viewBox="0 0 48 48"'), 'logo.svg must define an explicit square viewBox');
    assert.ok(!logoSvg.includes('<text'), 'logo.svg must be bespoke architectural paths, not a plain text letter');

    const wranglerPath = path.join(process.cwd(), 'wrangler.jsonc');
    assert.ok(fs.existsSync(wranglerPath), 'wrangler.jsonc must exist for Cloudflare Workers deploy');
    const wranglerConfig = JSON.parse(fs.readFileSync(wranglerPath, 'utf-8'));
    assert.equal(wranglerConfig.assets?.directory, './dist');
    assert.equal(wranglerConfig.assets?.not_found_handling, 'single-page-application');

    const redirectsPath = path.join(process.cwd(), 'public/_redirects');
    assert.ok(
      !fs.existsSync(redirectsPath),
      'public/_redirects must not exist when deploying via wrangler single-page-application (causes Cloudflare error 100324)'
    );
  });
});

