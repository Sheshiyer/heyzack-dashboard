'use client';

import MarkdownRenderer from './MarkdownRenderer';

export default function ClientMarkdownRenderer({ content }: { content: string }) {
  return <MarkdownRenderer content={content} />;
}
