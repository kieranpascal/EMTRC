import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BarChart3, CheckCircle2, Layers, Sparkles, TrendingUp } from 'lucide-react';
import type { BlogArticle } from '../../content/blog';
import { BlogDataChart } from './BlogDataChart';

interface PostVisualizerProps {
  article: BlogArticle;
}

const EASE_STUDIO: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SLUG_TO_CHART_ID: Record<string, string> = {
  'uk-pstn-switch-off-31-january-2027-london-guide': 'pstn-cost-timeline',
  'how-to-rank-top-3-google-maps-london-borough': 'maps-ranking-weights',
  'missed-call-text-back-maths-london-trades': 'missed-call-roi',
  'why-1-in-3-london-shops-lose-google-maps-calls': 'speed-conversion',
  'chatgpt-apple-maps-ai-search-local-businesses': 'ai-search-share',
  'domain-ownership-trap-uk-small-business': 'agency-ownership',
};

/**
 * PostVisualizer automatically renders an interactive Framer Motion-animated data chart
 * AND a stylized Key Takeaway Blueprint infographic view on every emtrc Signals article,
 * ensuring every post contains a dynamic, non-text visual proof element.
 */
export function PostVisualizer({ article }: PostVisualizerProps) {
  const [mode, setMode] = useState<'chart' | 'blueprint'>('chart');
  const prefersReduced = useReducedMotion();

  const blockChart = article.blocks.find((b) => b.type === 'chart');
  const chartId =
    (blockChart && blockChart.type === 'chart' ? blockChart.chartId : undefined) ??
    SLUG_TO_CHART_ID[article.slug] ??
    'speed-conversion';

  return (
    <section
      data-testid="post-visualizer"
      aria-label="Interactive article data visualiser and key takeaway blueprint"
      className="my-7 overflow-hidden rounded-2xl border border-[#232B3A] bg-[#0B0D12] text-[#F5F6F8] shadow-xl"
    >
      {/* Top Studio Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#111520] px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#E03528]/15 text-[#FF8C73]">
            {mode === 'chart' ? (
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Layers className="h-4 w-4" aria-hidden="true" />
            )}
          </span>
          <div>
            <p className="font-mono-data text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FF8C73]">
              SIGNALS DATA VISUALISER · {article.category.toUpperCase()}
            </p>
            <h2 className="font-editorial text-lg font-bold leading-snug text-white sm:text-xl">
              {mode === 'chart' ? 'Interactive London Field Data' : 'Executive Action Blueprint'}
            </h2>
          </div>
        </div>

        {/* Mode Switcher */}
        <div
          role="tablist"
          aria-label="Post visualiser view mode"
          className="inline-flex items-center rounded-lg border border-white/12 bg-[#0B0D12] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'chart'}
            data-testid="post-visualizer-tab-chart"
            onClick={() => setMode('chart')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono-data text-[11px] font-semibold transition-colors ${
              mode === 'chart'
                ? 'bg-[#E03528] text-white'
                : 'text-[#9BA6BC] hover:text-white'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Live Chart</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'blueprint'}
            data-testid="post-visualizer-tab-blueprint"
            onClick={() => setMode('blueprint')}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono-data text-[11px] font-semibold transition-colors ${
              mode === 'blueprint'
                ? 'bg-[#E03528] text-white'
                : 'text-[#9BA6BC] hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Key Takeaways</span>
          </button>
        </div>
      </div>

      {/* Dynamic Body */}
      <div className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {mode === 'chart' ? (
            <motion.div
              key="chart-view"
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_STUDIO }}
              className="[&>figure]:my-0 [&>figure]:border-0 [&>figure]:bg-transparent [&>figure]:p-1 [&>figure]:shadow-none"
            >
              <BlogDataChart chartId={chartId} />
            </motion.div>
          ) : (
            <motion.div
              key="blueprint-view"
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_STUDIO }}
              className="p-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3.5">
                <p className="inline-flex items-center gap-2 font-mono-data text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF8C73]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{article.keyTakeaways.length} priority moves for London owners</span>
                </p>
                <span className="font-mono-data text-[11px] text-[#94A3B8]">
                  {article.readTime} · {article.publishedDate}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {article.keyTakeaways.slice(0, 4).map((point, idx) => (
                  <motion.div
                    key={point}
                    initial={prefersReduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.06, ease: EASE_STUDIO }}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#131825] p-4"
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#E03528]/20 font-mono-data text-xs font-bold text-[#FF8C73]">
                      0{idx + 1}
                    </span>
                    <p className="text-xs leading-relaxed text-[#E2E8F0] sm:text-sm">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-[#94A3B8]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#34D399]" aria-hidden="true" />
                <span>
                  Every emtrc Business &amp; Growth build ships with these standards configured before launch day.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
