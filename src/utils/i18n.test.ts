import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getDictionary,
  isRtlLocale,
  resolveLocale,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
} from '../content/i18n';

describe('i18n multilingual dictionary', () => {
  it('supports all top 10 London and global locales including Mandarin and Arabic', () => {
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    assert.deepEqual(codes, ['en', 'zh', 'ar', 'es', 'fr', 'pt', 'hi', 'bn', 'pl', 'tr']);
    assert.equal(isRtlLocale('ar'), true);
    assert.equal(isRtlLocale('zh'), false);
    assert.equal(isRtlLocale('en'), false);
  });

  it('resolves unknown or regional locale inputs safely', () => {
    assert.equal(resolveLocale(undefined), 'en');
    assert.equal(resolveLocale(''), 'en');
    assert.equal(resolveLocale('de-DE'), 'en');
    assert.equal(resolveLocale('zh-CN'), 'zh');
    assert.equal(resolveLocale('ar-SA'), 'ar');
    assert.equal(resolveLocale('pt-BR'), 'pt');
    assert.equal(resolveLocale('hi-IN'), 'hi');
    assert.equal(resolveLocale('bn-BD'), 'bn');
    assert.equal(resolveLocale('es-ES'), 'es');
    assert.equal(resolveLocale('TR'), 'tr');
    assert.equal(resolveLocale('pl-PL'), 'pl');
    assert.equal(resolveLocale('fr-FR'), 'fr');
  });

  it('provides non-empty translated strings for every key across all 10 locales', () => {
    const enDict = TRANSLATIONS.en;

    const verifyObject = (ref: Record<string, unknown>, target: Record<string, unknown>, path: string) => {
      for (const key of Object.keys(ref)) {
        const fullPath = `${path}.${key}`;
        const refVal = ref[key];
        const targetVal = target[key];
        if (typeof refVal === 'string') {
          assert.equal(typeof targetVal, 'string', `Missing string at ${fullPath}`);
          assert.ok((targetVal as string).trim().length > 0, `Empty string at ${fullPath}`);
        } else if (refVal && typeof refVal === 'object') {
          assert.ok(targetVal && typeof targetVal === 'object', `Missing object at ${fullPath}`);
          verifyObject(refVal as Record<string, unknown>, targetVal as Record<string, unknown>, fullPath);
        }
      }
    };

    for (const lang of SUPPORTED_LANGUAGES) {
      const dict = getDictionary(lang.code);
      verifyObject(
        enDict as unknown as Record<string, unknown>,
        dict as unknown as Record<string, unknown>,
        lang.code
      );
    }
  });
});
