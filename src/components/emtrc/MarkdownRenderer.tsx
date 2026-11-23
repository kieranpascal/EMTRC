import { Fragment, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import type { MarkdownBlock } from '../../utils/markdown';

interface MarkdownRendererProps {
  blocks: readonly MarkdownBlock[];
}

/**
 * Safely parses inline **bold**, *italic* and `code` tokens without dangerouslySetInnerHTML.
 */
function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);
  return tokens.map((token, idx) => {
    if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-[var(--emtrc-ink)]">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
      return (
        <code
          key={idx}
          className="rounded border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] px-1.5 py-0.5 font-mono-data text-[0.88em] font-medium text-[var(--emtrc-ink)]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
      return (
        <em key={idx} className="italic text-[var(--emtrc-ink)]">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={idx}>{token}</Fragment>;
  });
}

export function MarkdownRenderer({ blocks }: MarkdownRendererProps) {
  return (
    <div data-testid="markdown-article-body" className="space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={idx}
                className="pt-4 font-editorial text-2xl font-bold tracking-tight text-[var(--emtrc-ink)] sm:text-[1.75rem]"
              >
                {renderInline(block.text)}
              </h2>
            );

          case 'h3':
            return (
              <h3
                key={idx}
                className="pt-2 font-editorial text-lg font-bold tracking-tight text-[var(--emtrc-ink)] sm:text-xl"
              >
                {renderInline(block.text)}
              </h3>
            );

          case 'p':
            return (
              <p
                key={idx}
                className="text-base leading-[1.82] text-[var(--emtrc-muted)]"
              >
                {renderInline(block.text)}
              </p>
            );

          case 'blockquote':
            return (
              <blockquote
                key={idx}
                className="my-6 rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-sand)] p-6 sm:p-7"
              >
                <p className="font-editorial text-lg font-semibold leading-snug text-[var(--emtrc-ink)] sm:text-xl">
                  “{renderInline(block.text)}”
                </p>
              </blockquote>
            );

          case 'ul':
            return (
              <ul key={idx} className="space-y-3 text-base leading-relaxed text-[var(--emtrc-ink)]">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <span className="mt-1.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[var(--emtrc-accent)]/12 text-[var(--emtrc-accent)]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-[var(--emtrc-muted)]">{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={idx} className="space-y-3.5 text-base leading-relaxed">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3.5">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--emtrc-navy)] font-mono-data text-xs font-semibold text-white dark:bg-[var(--emtrc-accent)]">
                      {String(itemIdx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[var(--emtrc-muted)]">{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case 'table':
            return (
              <div
                key={idx}
                className="my-6 overflow-x-auto rounded-xl border border-[var(--emtrc-border)] bg-[var(--emtrc-surface)]"
              >
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--emtrc-border)] bg-[var(--emtrc-sand)]">
                      {block.headers.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 py-3 font-mono-data text-[11px] font-semibold uppercase tracking-wider text-[var(--emtrc-ink)]"
                        >
                          {renderInline(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--emtrc-border)]">
                    {block.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[var(--emtrc-sand)]/50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-3 text-sm leading-snug ${
                              cIdx === 0
                                ? 'font-semibold text-[var(--emtrc-ink)]'
                                : 'text-[var(--emtrc-muted)] tabular-nums'
                            }`}
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
